import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-black dark:text-white">
        Punjipati.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 text-gray-700 dark:text-gray-300">
        Your trusted source for{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">finance insights</span>,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400">market analysis</span>, and{" "}
        <span className="font-semibold text-purple-600 dark:text-purple-400">investment strategies</span>.
      </h4>
    </section>
  );
}
