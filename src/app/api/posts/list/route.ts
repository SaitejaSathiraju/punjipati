import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file." },
        { status: 500 }
      );
    }
    
    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, slug, title, excerpt, published_at, author_name, author_picture_url, cover_image_url")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch posts" },
        { status: 500 }
      );
    }

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
    })) || [];

    return NextResponse.json({ posts: postsData });
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
