import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Punjipati Finance.
            <br />
            <span className="text-xl text-gray-600 dark:text-gray-400 font-normal">
              Empowering financial decisions through quality content.
            </span>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="#"
              className="mx-3 bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Subscribe
            </a>
            <a
              href="#"
              className="mx-3 font-bold hover:underline text-gray-700 dark:text-gray-300"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-700 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>Punjipati</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
