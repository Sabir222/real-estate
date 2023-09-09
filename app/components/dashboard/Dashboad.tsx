"use client";
import SideBar from "./sidebar/SideBar";
import Dashcards from "./Dashcards";
import { useState } from "react";
import { SafeListing, SafeUser } from "@/app/types";
import AddListing from "./AddListing";

export enum CONTENT {
  USER = 0,
  HOUSES = 1,
  RESERVATIONS = 2,
}

interface DashboadProps {
  currentUser?: SafeUser | null;
  data?: SafeListing[];
  users?: SafeUser[];
}

const Dashboad: React.FC<DashboadProps> = ({ currentUser, data, users }) => {
  const [section, setSection] = useState(CONTENT.USER);
  console.log(users);

  if (section === CONTENT.HOUSES) {
    return (
      <div className="flex">
        <SideBar setSection={setSection} />
        <div className=" h-screen w-full p-4 flex flex-col gap-4">
          <div className="self-end w-[150px]">
            <AddListing />
          </div>
          {data?.map((house) => {
            return <Dashcards key={house.id} Delete update />;
          })}
        </div>
      </div>
    );
  }

  if (section === CONTENT.RESERVATIONS) {
    return (
      <div className="flex">
        <SideBar setSection={setSection} />
        <div className=" h-screen w-full p-4">
          <Dashcards email="email" username="XXXXXXXXXXXXX" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <SideBar setSection={setSection} />
      <div className=" h-screen w-full p-4 flex flex-col gap-4">
        {users?.map((user) => {
          return (
            <>
              <Dashcards
                key={user.id}
                email={`${user.email}`}
                username={`${user.name}`}
                role={`${user.role}`}
                update
                Delete
                imageSrc={`${user.image}`}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboad;
