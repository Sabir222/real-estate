"use client";

import Button from "@/app/components/Button";
import Avatar from "@/app/components/navbar/Avatar";

interface DashcardsProps {
  email?: string;
  username?: string;
  role?: string;
}
const Dashcards: React.FC<DashcardsProps> = ({ email, username, role }) => {
  return (
    <div className="p-4  rounded-md flex flex-col gap-4 sm:flex-row  items-center  bg-neutral-100 shadow-sm justify-between">
      <Avatar />
      <div className="flex flex-col justify-center ">
        {email && (
          <>
            <p className="text-lg font-semibold">{email}</p>
            <p className="text-gray-400">@{username}</p>
          </>
        )}
      </div>
      {role && <div className="font-bold">{role}</div>}
      <div className="min-w-[170px] flex items-center gap-3">
        <Button label="Delete" onClick={() => {}} />
        <Button label="Update" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Dashcards;
