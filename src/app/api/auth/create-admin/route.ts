import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// This endpoint is for creating the first admin user
// Should be called once to set up the admin account
// After setup, this endpoint should be disabled or protected
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create admin user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: data.user,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create admin user",
      },
      { status: 500 }
    );
  }
}


