import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline text-blue-600 dark:text-blue-400">
        Punjipati
      </Link>
      <span className="text-gray-600 dark:text-gray-400 ml-2">Finance</span>
    </h2>
  );
};

export default Header;
