import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle itemProp="headline">{title}</PostTitle>
      <div className="hidden md:block md:mb-12" itemProp="author" itemScope itemType="https://schema.org/Person">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0" itemProp="image">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6" itemProp="author" itemScope itemType="https://schema.org/Person">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg" itemProp="datePublished">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
