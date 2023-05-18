// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 my-auto w-full bg-black p-6 text-white">
      <p className="text-center">
        If you have any questions, feel free to shoot me a DM on Twitter
        <span className="ml-1">
          <a
            href="https://twitter.com/bhancock_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-300"
          >
            @bhancock_ai
          </a>
        </span>{" "}
        or an email at
        <a
          href="mailto:brandon@brandonhancock.io"
          className="ml-1 text-red-500 hover:text-red-300"
        >
          brandon@brandonhancock.io
        </a>
      </p>
    </div>
  );
};

export default Footer;
