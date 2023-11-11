"use client";

import { IconType } from "react-icons";

interface SidebarContentProps {
  label: string;
  onClick: () => void;
  icon?: IconType;
}
const SidebarContent: React.FC<SidebarContentProps> = ({
  label,
  onClick,
  icon: Icon,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-black hover:opacity-70 hover:shadow-xl ease-in-out duration-150 mx-2 text-white p-4 flex gap-2 items-center justify-center sm:justify-start  rounded-lg shadow-lg cursor-pointer"
    >
      {Icon && <Icon size={20} />}
      <div className="hidden sm:block">{label}</div>
    </div>
  );
};

export default SidebarContent;
