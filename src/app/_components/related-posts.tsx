import Link from "next/link";
import { Post } from "@/interfaces/post";
import DateFormatter from "./date-formatter";
import Avatar from "./avatar";

type Props = {
  posts: Post[];
  currentSlug: string;
};

export function RelatedPosts({ posts, currentSlug }: Props) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col hover:bg-gray-50 dark:hover:bg-gray-900 p-4 rounded-lg transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              <Link
                href={`/posts/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <DateFormatter dateString={post.date} />
              <Avatar name={post.author.name} picture={post.author.picture} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}









