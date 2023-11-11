"use client";

import { useRouter } from "next/navigation";
import SidebarContent from "./SidebarContent";
import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { CONTENT } from "../Dashboad";

interface SideBarProps {
  setSection: (section: CONTENT) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setSection }) => {
  const router = useRouter();
  return (
    <div className=" py-2 h-screen bg-gray-100 fixed top-0 bottom-0 w-[70px] sm:w-[150px] md:w-[250px] flex flex-col gap-3  ">
      <SidebarContent
        label="Home"
        icon={AiOutlineHome}
        onClick={() => router.push("/")}
      />
      <SidebarContent
        label="Users"
        icon={AiOutlineUser}
        onClick={() => setSection(CONTENT.USER)}
      />
      <SidebarContent
        label="Houses"
        icon={MdOutlineRealEstateAgent}
        onClick={() => setSection(CONTENT.HOUSES)}
      />
      <SidebarContent
        label="Reservations"
        icon={AiOutlineCalendar}
        onClick={() => setSection(CONTENT.RESERVATIONS)}
      />
    </div>
  );
};

export default SideBar;
