"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/app/_components/container";
import AdminPostsContent from "./admin-posts-content";

export default function SecureAdminPosts() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setAuthenticated(true);
          } else {
            router.push("/admin-secure-punjipati-2024/login");
            return;
          }
        } else {
          router.push("/admin-secure-punjipati-2024/login");
          return;
        }
      } catch (error) {
        router.push("/admin-secure-punjipati-2024/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin-secure-punjipati-2024/login");
    router.refresh();
  };

  if (loading) {
    return (
      <Container>
        <div className="max-w-4xl mx-auto py-16">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-sm">Admin Panel</span>
          <div className="flex gap-4">
            <Link
              href="/admin-secure-punjipati-2024"
              className="text-sm hover:underline"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <AdminPostsContent />
    </div>
  );
}

