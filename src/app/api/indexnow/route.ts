import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

/**
 * IndexNow API endpoint
 * 
 * POST /api/indexnow
 * 
 * Body: {
 *   urls: string[] // Array of full URLs to submit
 * }
 * 
 * This endpoint allows you to manually trigger IndexNow submissions
 * or can be called by other services/webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "urls array is required" },
        { status: 400 }
      );
    }

    // Validate URLs
    const validUrls = urls.filter((url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: "No valid URLs provided" },
        { status: 400 }
      );
    }

    const success = await submitToIndexNow(validUrls);

    return NextResponse.json(
      {
        success,
        message: success
          ? `Successfully submitted ${validUrls.length} URL(s) to IndexNow`
          : "Failed to submit URLs to IndexNow (check logs for details)",
        urls: validUrls,
      },
      { status: success ? 200 : 500 }
    );
  } catch (error) {
    console.error("IndexNow API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process IndexNow request",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    service: "IndexNow API",
    status: "active",
    message: "POST to this endpoint with { urls: string[] } to submit URLs for indexing",
  });
}

