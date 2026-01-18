import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 
    process.env.SUPABASE_URL
  );
}

// Fallback to file system if Supabase is not configured
async function getPostsFromFilesystem(): Promise<Post[]> {
  const postsDirectory = join(process.cwd(), "_posts");
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((slug) => {
      const realSlug = slug.replace(/\.md$/, "");
      const fullPath = join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return { ...data, slug: realSlug, content } as Post;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  return posts;
}

// Get posts from Supabase
async function getPostsFromSupabase(limit?: number): Promise<Post[]> {
  try {
    const { createServerSupabaseClient } = await import("./supabase-server");
    const supabase = createServerSupabaseClient();
    
    // If Supabase is not configured, return null to trigger fallback
    if (!supabase) {
      return getPostsFromFilesystem();
    }
    
    let query = supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }

    const { data: posts, error } = await query;

    if (error) {
      // Silently fallback to file system - no error logging
      return getPostsFromFilesystem();
    }

    // Transform Supabase posts to Post interface
    return (posts || []).map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.published_at,
      coverImage: post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
      author: {
        name: post.author_name,
        picture: post.author_picture_url || "/assets/blog/authors/tim.jpeg",
      },
      excerpt: post.excerpt,
      ogImage: {
        url: post.og_image_url || post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
      },
      content: post.content,
      preview: !post.is_published,
      category: post.category || 'news',
    }));
  } catch (error) {
    // Silently fall back to file system if Supabase is not configured
    return getPostsFromFilesystem();
  }
}

export function getPostSlugs(): string[] {
  const postsDirectory = join(process.cwd(), "_posts");
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter((slug) => slug.endsWith(".md"))
    .map((slug) => slug.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (isSupabaseConfigured()) {
    try {
      const { createServerSupabaseClient } = await import("./supabase-server");
      const supabase = createServerSupabaseClient();
      
      // If Supabase is not configured, skip to file system
      if (supabase) {
        const { data: post, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (!error && post) {
          return {
            slug: post.slug,
            title: post.title,
            date: post.published_at,
            coverImage: post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
            author: {
              name: post.author_name,
              picture: post.author_picture_url || "/assets/blog/authors/tim.jpeg",
            },
            excerpt: post.excerpt,
            ogImage: {
              url: post.og_image_url || post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
            },
            content: post.content,
            preview: !post.is_published,
            category: post.category || 'news',
          };
        }
      }
    } catch (error) {
      // Silently fall back to file system - no error logging
    }
  }

  // Fallback to file system
  const postsDirectory = join(process.cwd(), "_posts");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, slug: realSlug, content } as Post;
}

export async function getAllPosts(limit?: number): Promise<Post[]> {
  if (isSupabaseConfigured()) {
    return getPostsFromSupabase(limit);
  }
  
  // Fallback to file system
  const posts = await getPostsFromFilesystem();
  return limit ? posts.slice(0, limit) : posts;
}

// Get posts by category
// For 'news' and 'case-study', also includes 'general' category posts
export async function getPostsByCategory(category: 'news' | 'case-study' | 'general', limit?: number): Promise<Post[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createServerSupabaseClient } = await import("./supabase-server");
      const supabase = createServerSupabaseClient();
      
      if (!supabase) {
        // Fallback to file system and filter by category if available
        const allPosts = await getPostsFromFilesystem();
        let filteredPosts;
        if (category === 'general') {
          filteredPosts = allPosts.filter(post => post.category === 'general' || !post.category);
        } else {
          // For news and case-study, include general posts too
          filteredPosts = allPosts.filter(post => 
            post.category === category || post.category === 'general' || (!post.category && category === 'news')
          );
        }
        return limit ? filteredPosts.slice(0, limit) : filteredPosts;
      }
      
      // Build query: include the specific category and 'general' category (except when querying for 'general' itself)
      let query = supabase
        .from("posts")
        .select("*")
        .eq("is_published", true);
      
      if (category === 'general') {
        query = query.eq("category", 'general');
      } else {
        // For news and case-study, include both the category and 'general'
        query = query.in("category", [category, 'general']);
      }
      
      query = query.order("published_at", { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data: posts, error } = await query;

      if (error) {
        const allPosts = await getPostsFromFilesystem();
        let filteredPosts;
        if (category === 'general') {
          filteredPosts = allPosts.filter(post => post.category === 'general' || !post.category);
        } else {
          filteredPosts = allPosts.filter(post => 
            post.category === category || post.category === 'general' || (!post.category && category === 'news')
          );
        }
        return limit ? filteredPosts.slice(0, limit) : filteredPosts;
      }

      // Transform Supabase posts to Post interface
      return (posts || []).map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.published_at,
        coverImage: post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
        author: {
          name: post.author_name,
          picture: post.author_picture_url || "/assets/blog/authors/tim.jpeg",
        },
        excerpt: post.excerpt,
        ogImage: {
          url: post.og_image_url || post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
        },
        content: post.content,
        preview: !post.is_published,
        category: post.category || 'news',
      }));
    } catch (error) {
      const allPosts = await getPostsFromFilesystem();
      let filteredPosts;
      if (category === 'general') {
        filteredPosts = allPosts.filter(post => post.category === 'general' || !post.category);
      } else {
        filteredPosts = allPosts.filter(post => 
          post.category === category || post.category === 'general' || (!post.category && category === 'news')
        );
      }
      return limit ? filteredPosts.slice(0, limit) : filteredPosts;
    }
  }
  
  // Fallback to file system
  const allPosts = await getPostsFromFilesystem();
  let filteredPosts;
  if (category === 'general') {
    filteredPosts = allPosts.filter(post => post.category === 'general' || !post.category);
  } else {
    filteredPosts = allPosts.filter(post => 
      post.category === category || post.category === 'general' || (!post.category && category === 'news')
    );
  }
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}
