import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file." },
        { status: 500 }
      );
    }

    // Delete the post from Supabase
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete post" },
        { status: 500 }
      );
    }

    // Revalidate pages to reflect deletion
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/case-study");
    revalidatePath("/sitemap.xml");
    revalidatePath(`/posts/${slug}`);

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete post",
      },
      { status: 500 }
    );
  }
}

