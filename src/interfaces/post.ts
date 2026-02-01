import { type Author } from "./author";

export type PostCategory = 'news' | 'case-study' | 'general';

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string | null;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string | null;
  };
  content: string;
  preview?: boolean;
  category?: PostCategory;
};
