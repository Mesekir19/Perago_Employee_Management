import React from "react";
import Logo from "../assets/perago2.png";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-gray-800 dark:border-gray-300 border-gray-600 pb-6 text-black dark:text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center">
          <img src={Logo} alt="Perago Logo" className=" h-8 w16" />
          <p className="text-sm mt-2">
            Build your company's functional employee hierarchy structure
          </p>
        </div>
        <div className="flex space-x-20 mt-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Products</h2>
            <a href="/" className="block text-sm hover:underline">
              Product 1
            </a>
            <a href="/" className="block text-sm hover:underline">
              Product 2
            </a>
            <a href="/" className="block text-sm hover:underline">
              Product 3
            </a>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">About</h2>
            <a href="/" className="block text-sm hover:underline">
              About Us
            </a>
            <a href="/" className="block text-sm hover:underline">
              Our Team
            </a>
            <a href="/" className="block text-sm hover:underline">
              Contact
            </a>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">About</h2>
            <a href="/" className="block text-sm hover:underline">
              About Us
            </a>
            <a href="/" className="block text-sm hover:underline">
              Our Team
            </a>
            <a href="/" className="block text-sm hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between align-items-center items-center border-t border-gray-400 dark:border-gray-300 pt-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Perago. All rights reserved.
          Developed by{" "}
          <a
            href="https://portfolio-mesekir19.vercel.app/"
            target="_blank"
            className=" text-decoration-none text-green-600 font-body"
          >
            Mesekir Getachew
          </a>
        </p>
        <div className="flex space-x-10">
          <IconBrandTwitter size="1.15rem" stroke={1.5} />
          <IconBrandYoutube size="1.15rem" stroke={1.5} />
          <IconBrandInstagram size="1.15rem" stroke={1.5} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
