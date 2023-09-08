"use client";
import { useState } from "react";
import SideBar from "./sidebar/SideBar";
import Dashcards from "./Dashcards";

export enum CONTENT {
  USER = 0,
  HOUSES = 1,
  RESERVATIONS = 2,
}

const Dashboad = () => {
  const [section, setSection] = useState(CONTENT.USER);

  if (section === CONTENT.HOUSES) {
    return (
      <div className="flex">
        <SideBar setSection={setSection} />
        <div className=" h-screen w-full p-4">
          <Dashcards email="HOUSES" username="Sabir Koutabi" role="admin" />
        </div>
      </div>
    );
  }

  if (section === CONTENT.RESERVATIONS) {
    return (
      <div className="flex">
        <SideBar setSection={setSection} />
        <div className=" h-screen w-full p-4">
          <Dashcards
            email="RESERVATIONS"
            username="XXXXXXXXXXXXX"
            role="admin"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <SideBar setSection={setSection} />
      <div className=" h-screen w-full p-4">
        <Dashcards
          email="mrsabir4@gmail.com"
          username="Sabir Koutabi"
          role="admin"
        />
      </div>
    </div>
  );
};

export default Dashboad;
