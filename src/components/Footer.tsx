import { JSX } from "react";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-brand-900/90 backdrop-blur-xs p-4 text-white">
      <p>
        This site uses only official Public Game Content from the Darrington
        Press System Reference Document (SRD), shared under the Community Gaming
        License. The descriptive text comes straight from the SRD, but all the
        images here are original creations inspired by those descriptions. We
        don't use any copyrighted art, logos, or story content from Critical
        Role or its related companies. All trademarks and rights belong to
        Critical Role, LLC and its partners. Just so you know, this project
        isn't officially connected to or endorsed by Critical Role or Darrington
        Press.
      </p>
      <p>
        If anyone at Critical Role or Darrington Press sees this, please let us
        know if you have any feedback or suggestions! Thank you for visiting!
        email:{" "}
        <a href="mailto:hello@voxoradigital.com">hello@voxoradigital.com</a>
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-2xl mx-auto my-6 text-sm text-gray-800 dark:text-gray-200">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Copyright / Attribution: Daggerheart
        </h2>
        <p>
          This product includes materials from the
          <span className="font-medium">
            Daggerheart System Reference Document 1.0
          </span>
          , &copy; Critical Role, LLC. under the terms of the
          <a
            href="https://darringtonpress.com/license/"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Darrington Press Community Gaming (DPCGL) License
          </a>
          . More information can be found at
          <a
            href="https://www.daggerheart.com"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.daggerheart.com
          </a>
          . There are no previous modifications by others.
        </p>
      </div>

      <p>
        If Critical Role or Darrington Press want me to remove, then just send
        an email to the above email, I will comply fully with your request no
        need for any legal stuff.
      </p>
    </footer>
  );
};

export default Footer;
