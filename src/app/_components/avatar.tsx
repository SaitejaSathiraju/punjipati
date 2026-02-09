import Image from 'next/image';

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  // Ensure picture is a valid path, fallback to default
  const imageSrc = picture || "/assets/blog/authors/tim.jpeg";
  
  return (
    <div className="flex items-center">
      <Image
        src={imageSrc}
        alt={name}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full mr-4"
        unoptimized={imageSrc.startsWith('http')} // Don't optimize external images
      />
      <div className="text-xl font-bold dark:text-white">{name}</div>
    </div>
  );
};

export default Avatar;
