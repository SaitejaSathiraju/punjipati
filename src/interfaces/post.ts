import { type Author } from "./author";

export type PostCategory = 
  | 'news-national' 
  | 'news-international' 
  | 'market-national' 
  | 'market-international' 
  | 'case-study-national' 
  | 'case-study-international';

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
