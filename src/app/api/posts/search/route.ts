import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || null;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "5");
    const offset = parseInt(searchParams.get("offset") || "0");

    const supabase = createServerSupabaseClient();
    
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file." },
        { status: 500 }
      );
    }
    
    let query = supabase
      .from("posts")
      .select("id, slug, title, excerpt, published_at, author_name, author_picture_url, cover_image_url, category")
      .eq("is_published", true);

    // Apply category filter
    if (category) {
      if (category === 'general') {
        query = query.eq("category", 'general');
      } else {
        // For news and case-study, include both the category and 'general'
        query = query.in("category", [category, 'general']);
      }
    }

    // Apply search filter
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(`title.ilike.${searchPattern},excerpt.ilike.${searchPattern}`);
    }

    // Apply ordering, limit, and offset
    query = query
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: posts, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch posts" },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);

    if (category) {
      if (category === 'general') {
        countQuery = countQuery.eq("category", 'general');
      } else {
        countQuery = countQuery.in("category", [category, 'general']);
      }
    }

    if (search) {
      const searchPattern = `%${search}%`;
      countQuery = countQuery.or(`title.ilike.${searchPattern},excerpt.ilike.${searchPattern}`);
    }

    const { count } = await countQuery;

    // Transform data to match expected format
    const postsData = posts?.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.published_at,
      author: {
        name: post.author_name,
        picture: post.author_picture_url || "/assets/blog/authors/tim.jpeg",
      },
      coverImage: post.cover_image_url || "/assets/blog/hello-world/cover.jpg",
      category: post.category || 'news',
    })) || [];

    return NextResponse.json({ 
      posts: postsData,
      total: count || 0,
      hasMore: (count || 0) > offset + limit
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch posts",
      },
      { status: 500 }
    );
  }
}

