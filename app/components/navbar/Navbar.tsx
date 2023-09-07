"use client";

import Logo from "../Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import MenuContent from "./MenuContent";
import { usePathname } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <div className="fixed w-full  bg-white z-10 border-b h-[150px] md:h-[80px] ">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-4 flex flex-row gap-3 md:gap-20 justify-between items-center ">
        <div>
          <a href="/">
            <Logo />
          </a>
        </div>

        <div className="absolute md:static  bottom-5 right-1 left-1 sm:right-8  sm:left-8  pb-4 ">
          <Search />
        </div>
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer">
            {currentUser?.role === "ADMIN" ? (
              <a href="/dashboard">
                <MenuContent label="Dashboard" onClick={() => {}} />
              </a>
            ) : null}
          </div>

          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
