import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * API route to manually trigger revalidation
 * Can be called after content updates to ensure fresh sitemap and pages
 * 
 * Usage:
 * POST /api/revalidate?path=/posts/my-post
 * POST /api/revalidate?path=/sitemap.xml
 * POST /api/revalidate (revalidates all)
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    } else {
      // Revalidate all important paths
      revalidatePath("/");
      revalidatePath("/sitemap.xml");
      revalidatePath("/posts/[slug]", "page");
      
      return NextResponse.json({
        revalidated: true,
        paths: ["/", "/sitemap.xml", "/posts/[slug]"],
        now: Date.now(),
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error revalidating",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

