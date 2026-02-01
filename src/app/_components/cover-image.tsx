import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string | null | undefined;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  // Use default image if src is null or empty
  const imageSrc = src || "/favicon/apple-touch-icon.png";
  
  const image = (
    <Image
      src={imageSrc}
      alt={`${title} - Cover Image`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
      priority={!!slug}
      loading={slug ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
