"use client";

import { useRouter } from "next/navigation";
import SidebarContent from "./SidebarContent";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { MdOutlineRealEstateAgent } from "react-icons/md";
const SideBar = () => {
  const router = useRouter();
  return (
    <div className="fixed  h-full py-2 bg-gray-100  w-[70px] sm:w-[150px] md:w-[250px] flex flex-col gap-3 ">
      <SidebarContent
        label="Home"
        icon={AiOutlineHome}
        onClick={() => router.push("/")}
      />
      <SidebarContent label="Users" icon={AiOutlineUser} onClick={() => {}} />
      <SidebarContent
        label="Houses"
        icon={MdOutlineRealEstateAgent}
        onClick={() => {}}
      />
      <SidebarContent
        label="Reservations"
        icon={MdOutlineRealEstateAgent}
        onClick={() => {}}
      />
    </div>
  );
};

export default SideBar;
