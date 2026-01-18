'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/interfaces/post';
import { PostPreview } from './post-preview';

type Props = {
  initialPosts: Post[];
  category?: 'news' | 'case-study' | 'general';
  title?: string;
  description?: string;
};

export function PostsListWithSearch({ initialPosts, category, title = "Posts", description }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialPosts.length);

  const fetchPosts = async (search: string = '', reset: boolean = false) => {
    setIsLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const params = new URLSearchParams({
        limit: '5',
        offset: currentOffset.toString(),
      });

      if (category) {
        params.append('category', category);
      }

      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/posts/search?${params.toString()}`);
      const data = await response.json();

      if (reset) {
        setPosts(data.posts || []);
        setOffset((data.posts || []).length);
      } else {
        setPosts(prev => [...prev, ...(data.posts || [])]);
        setOffset(prev => prev + (data.posts || []).length);
      }

      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery, true);
  };

  const handleLoadMore = () => {
    fetchPosts(searchQuery, false);
  };

  return (
    <div className="py-16">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          {description}
        </p>
      )}

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <section aria-label={`${title} articles`}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-12">
              {posts.map((post) => (
                <article key={post.slug} itemScope itemType="https://schema.org/Article">
                  <PostPreview
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                    slug={post.slug}
                    excerpt={post.excerpt}
                  />
                </article>
              ))}
            </div>
          </section>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {searchQuery ? 'No posts found matching your search.' : `No ${title.toLowerCase()} yet. Check back soon for updates.`}
          </p>
        </div>
      )}
    </div>
  );
}

