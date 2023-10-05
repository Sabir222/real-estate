"use client";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <footer className="mt-auto">
      <div className="bg-[#EEEEEE] ">
        <div className="max-w-[2520px] mx-auto  xl:px-20 md:px-10 sm:px-2 px-4 py-4 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start  h-40">
            <div className="order-3">
              &#169; {currentYear} All Rights Reserved.
            </div>
            <div className="order-2 ">
              <Logo />
            </div>
            <div className="flex gap-5 items-center order-1">
              <button>
                <a href="https://twitter.com/sabirkoutabi" target="_blank">
                  <FaXTwitter />
                </a>
              </button>
              <button>
                <a href="https://github.com/Sabir222" target="_blank">
                  <FaGithub />
                </a>
              </button>
              <button>
                <a href="https://www.linkedin.com/in/skoutabi/" target="_blank">
                  <FaLinkedin />
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
