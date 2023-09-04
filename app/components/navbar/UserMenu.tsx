"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useRef, useState } from "react";
import MenuContent from "./MenuContent";
import useRegisterModalStore from "@/app/hooks/RegisterModalStore";
import useLoginModalStore from "@/app/hooks/LoginModalStore";
import { User } from "@prisma/client";

interface UserMenuProps {
  currentUser?: User | null;
}
const UserMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 800);
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-row items-center gap-3 border-[1px]  rounded-full  hover:bg-gray-100 cursor-pointer p-2 ease-in-out duration-150"
      >
        <div className="flex items-center gap-2 flex-row px-2 ">
          <Avatar />
        </div>
      </div>
      {isHovered && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute rounded-lg  border-[1px] w-[200px] bg-white overflow-hidden right-0 top-10 text-sm "
        >
          <div className="flex flex-col cursor-pointer text-center ">
            <>
              <MenuContent
                onClick={() => {
                  loginModal.onOpen();
                }}
                label="Login"
              />
              <MenuContent
                onClick={() => {
                  registerModal.onOpen();
                }}
                label="Sign-Up"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
