"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuContent from "./MenuContent";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="flex flex-row items-center gap-3 border-[1px]  rounded-full  hover:bg-gray-100 cursor-pointer p-2 ease-in-out duration-150"
      >
        <div className="flex items-center gap-2 flex-row px-2 ">
          <AiOutlineMenu />
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-lg  border-[1px] w-[200px] bg-white overflow-hidden right-0 top-10 text-sm ">
          <div className="flex flex-col cursor-pointer text-center">
            <>
              <MenuContent onClick={() => {}} label="Login" />
              <MenuContent onClick={() => {}} label="Sign-Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
