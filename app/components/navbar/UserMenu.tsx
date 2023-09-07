"use client";
import Avatar from "./Avatar";
import { useRef, useState } from "react";
import MenuContent from "./MenuContent";
import useLoginModalStore from "@/app/hooks/LoginModalStore";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRegisterModalStore from "@/app/hooks/RegisterModalStore";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
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
        className=" border-[1px]  rounded-full  hover:bg-gray-100 cursor-pointer  ease-in-out duration-150"
      >
        <Avatar src={currentUser?.image} />
      </div>
      {isHovered && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute rounded-lg  border-[1px] w-[200px] bg-white overflow-hidden right-0 top-10 text-sm "
        >
          <div className="flex flex-col cursor-pointer text-center ">
            {currentUser ? (
              <>
                <MenuContent onClick={() => {}} label="My reservations" />
                <MenuContent onClick={() => {}} label="My favorites" />
                <MenuContent
                  onClick={() => {
                    signOut();
                  }}
                  label="LogOut"
                />
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
