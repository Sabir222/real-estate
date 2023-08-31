"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Logo = () => {
  const router = useRouter();

  return (
    <div className="text-gray-400 cursor-pointer   flex items-center">
      <div className="mr-2 hidden sm:block">
        <Image alt="logo" height="40" width="40" src="/images/logo.png" />
      </div>
      Rent<span className="text-black font-bold">House</span>
    </div>
  );
};

export default Logo;
