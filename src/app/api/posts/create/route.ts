import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { submitUrlToIndexNow } from "@/lib/indexnow";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      coverImage,
      authorName,
      authorPicture,
      ogImage,
      category,
    } = body;

    // Validate required fields
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    // Max length: 100 characters to prevent URL truncation
    // This ensures URLs are crawlable and indexable
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Truncate to max 100 characters while preserving word boundaries
    if (slug.length > 100) {
      slug = slug.substring(0, 100);
      // Remove trailing hyphen if present
      slug = slug.replace(/-+$/, '');
    }

    const supabase = createServerSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file." },
        { status: 500 }
      );
    }

    // Check if post with same slug already exists
    const { data: existingPost } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 409 }
      );
    }

    // Validate category
    const validCategories = [
      'news-national', 
      'news-international', 
      'market-national', 
      'market-international', 
      'case-study-national', 
      'case-study-international'
    ];
    const postCategory = category && validCategories.includes(category) 
      ? category 
      : 'news-national';

    // Insert post into Supabase
    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        slug,
        title,
        excerpt,
        content,
        cover_image_url: coverImage || null,
        og_image_url: ogImage || coverImage || null,
        author_name: authorName || "Finance Team",
        author_picture_url: authorPicture || null,
        published_at: new Date().toISOString(),
        is_published: true,
        category: postCategory,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create post" },
        { status: 500 }
      );
    }

    // Revalidate pages to show new content immediately
    revalidatePath("/");
    revalidatePath("/news/national");
    revalidatePath("/news/international");
    revalidatePath("/market/national");
    revalidatePath("/market/international");
    revalidatePath("/case-study/national");
    revalidatePath("/case-study/international");
    revalidatePath("/sitemap.xml");
    revalidatePath(`/posts/${slug}`);

    // Submit to IndexNow for automatic indexing (non-blocking)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';
    const postUrl = `${baseUrl}/posts/${slug}`;
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    
    // Submit post URL and sitemap URL to IndexNow (fire and forget)
    Promise.all([
      submitUrlToIndexNow(postUrl),
      submitUrlToIndexNow(sitemapUrl),
    ]).catch((error) => {
      // Silently fail - IndexNow is optional
      console.warn('IndexNow submission failed (non-critical):', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        slug: post.slug,
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create post",
      },
      { status: 500 }
    );
  }
}
