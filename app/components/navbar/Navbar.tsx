"use client";

import { User } from "@prisma/client";
import Logo from "../Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <div className="fixed w-full  bg-white z-10 border-b h-[150px] md:h-auto ">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-4 flex flex-row gap-3 md:gap-20 justify-between items-center ">
        <div>
          <Logo />
        </div>

        <div className="absolute md:static  bottom-5 right-1 left-1 sm:right-8  sm:left-8  pb-4 ">
          <Search />
        </div>
        <div>
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
