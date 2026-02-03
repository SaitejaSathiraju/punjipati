import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-black dark:text-white">
        Punjipati.
      </h1>
      <div className="text-center md:text-left mt-5 md:pl-8">
        <h4 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
          India-First Financial Impact & Future Intelligence
        </h4>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We explain how global & Indian economic events will impact{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">Indians</span> over the next{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">1–5 years</span> —{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">clearly</span>,{" "}
          <span className="font-semibold text-orange-600 dark:text-orange-400">practically</span>, and{" "}
          <span className="font-semibold text-pink-600 dark:text-pink-400">early</span>.
        </p>
      </div>
    </section>
  );
}
