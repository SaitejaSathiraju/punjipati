"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/app/_components/container";

export default function AdminPanelContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    authorName: "Finance Team",
    authorPicture: "/assets/blog/authors/tim.jpeg",
    ogImage: "",
    category: "news" as "news" | "case-study" | "general",
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setSuccess("Post created successfully! Redirecting...");
      // Reset form
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        authorName: "Finance Team",
        authorPicture: "/assets/blog/authors/tim.jpeg",
        ogImage: "",
        category: "news",
      });

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'og' | 'author') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("bucket", type === 'author' ? "author-images" : "post-images");
      uploadFormData.append("folder", type === 'author' ? "authors" : "posts");

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      if (type === 'cover') {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      } else if (type === 'og') {
        setFormData((prev) => ({ ...prev, ogImage: data.url }));
      } else if (type === 'author') {
        setFormData((prev) => ({ ...prev, authorPicture: data.url }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel - Create New Post</h1>
          <Link
            href="/admin-secure-punjipati-2024/posts"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            View All Posts
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Brief description of the post (150-200 characters recommended)"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content (Markdown) *
            </label>
            <textarea
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white font-mono text-sm"
              placeholder="Write your post content in Markdown format..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <input
                type="file"
                id="coverImageUpload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-2"
              />
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Or enter image URL"
              />
              {formData.coverImage && (
                <img src={formData.coverImage} alt="Cover preview" className="mt-2 w-full h-32 object-cover rounded" />
              )}
            </div>

            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium mb-2">
                OG Image
              </label>
              <input
                type="file"
                id="ogImageUpload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'og')}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-2"
              />
              <input
                type="text"
                id="ogImage"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Or enter image URL"
              />
              {formData.ogImage && (
                <img src={formData.ogImage} alt="OG preview" className="mt-2 w-full h-32 object-cover rounded" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium mb-2">
                Author Name
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Author Name"
              />
            </div>

            <div>
              <label htmlFor="authorPicture" className="block text-sm font-medium mb-2">
                Author Picture
              </label>
              <input
                type="file"
                id="authorPictureUpload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'author')}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-2"
              />
              <input
                type="text"
                id="authorPicture"
                name="authorPicture"
                value={formData.authorPicture}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Or enter image URL"
              />
              {formData.authorPicture && (
                <img src={formData.authorPicture} alt="Author preview" className="mt-2 w-20 h-20 object-cover rounded-full" />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="news">News</option>
              <option value="case-study">Case Study</option>
              <option value="general">General</option>
            </select>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select where this post should appear: News section, Case Study section, or General (appears in both).
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : uploading ? "Uploading..." : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}


