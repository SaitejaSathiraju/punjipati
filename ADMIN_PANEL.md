# Admin Panel Documentation

## Overview

The admin panel allows you to create and publish posts directly from the web interface without needing to manually create Markdown files.

## Access

- **Admin Panel**: Navigate to `/admin` or click "Admin" in the navbar
- **View All Posts**: Navigate to `/admin/posts` to see all published posts

## Creating a New Post

1. Go to `/admin`
2. Fill in the form:
   - **Title** (required): The post title
   - **Excerpt** (required): Brief description (150-200 characters recommended)
   - **Content** (required): Post content in Markdown format
   - **Cover Image URL**: Path to cover image (e.g., `/assets/blog/post-name/cover.jpg`)
   - **OG Image URL**: Open Graph image for social sharing
   - **Author Name**: Default is "Finance Team"
   - **Author Picture URL**: Path to author image

3. Click "Publish Post"
4. The post will be automatically:
   - Saved as a Markdown file in the `_posts` directory
   - Published on the website
   - Appear on the homepage (if it's in the latest 5 posts)

## Features

- ✅ Direct posting from web interface
- ✅ Automatic slug generation from title
- ✅ Markdown support for rich content
- ✅ Automatic date assignment
- ✅ Latest 5 posts displayed on homepage
- ✅ View all posts in admin panel

## Post Format

Posts are saved as Markdown files with front matter:

```markdown
---
title: "Your Post Title"
excerpt: "Brief description"
date: "2024-01-20T10:00:00.000Z"
coverImage: "/assets/blog/post-name/cover.jpg"
author:
  name: "Author Name"
  picture: "/assets/blog/authors/author.jpg"
ogImage:
  url: "/assets/blog/post-name/cover.jpg"
---

Your post content in Markdown...
```

## Homepage Display

The homepage automatically displays:
- **Hero Post**: The latest post (most recent)
- **More Posts**: Up to 4 additional latest posts (total of 5 latest posts)

Posts are sorted by date in descending order (newest first).

## Notes

- Posts are saved immediately when published
- The slug is automatically generated from the title
- If a post with the same title exists, you'll get an error
- After publishing, you'll be redirected to the homepage
- Make sure to upload cover images to the `public/assets/blog/` directory before referencing them

