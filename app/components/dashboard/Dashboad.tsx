"use client";
import SideBar from "./sidebar/SideBar";
import Dashcards from "./Dashcards";
import { useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import AddListing from "./AddListing";
import Heading from "../Heading";

export enum CONTENT {
  USER = 0,
  HOUSES = 1,
  RESERVATIONS = 2,
}

interface DashboadProps {
  currentUser?: SafeUser | null;
  data?: SafeListing[];
  users?: SafeUser[];
  reservations?: SafeReservation[];
}

const Dashboad: React.FC<DashboadProps> = ({
  currentUser,
  data,
  users,
  reservations,
}) => {
  const [section, setSection] = useState(CONTENT.USER);
  console.log("reservations", reservations);

  if (section === CONTENT.HOUSES) {
    return (
      <div className="flex">
        <SideBar setSection={setSection} />
        <div>
          <div className=" w-[70px] sm:w-[150px] md:w-[250px] flex"></div>
        </div>

        <div className=" w-full p-4 flex flex-col gap-4">
          <div className="self-end w-[150px]">
            <AddListing />
          </div>
          {data?.length === 0 && (
            <div>
              <Heading
                title="No Houses available"
                subtitle="add Houses"
                center
              />
            </div>
          )}
          {data?.map((house) => {
            return (
              <Dashcards
                key={house.id}
                Delete
                houseLocation={house.city}
                houseName={house.title}
                houseImg={house.imageSrc}
                houseId={house.id}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (section === CONTENT.RESERVATIONS) {
    return (
      <div className="flex ">
        <SideBar setSection={setSection} />
        <div>
          <div className=" w-[70px] sm:w-[150px] md:w-[250px] flex"></div>
        </div>
        <div className="  p-4 flex-grow flex flex-col gap-4">
          {reservations?.length === 0 && (
            <div>
              <Heading
                title="No reservations"
                subtitle="Things aren't looking good cheif"
                center
              />
            </div>
          )}

          {reservations?.map((reservation) => {
            const startDate = new Date(reservation.startDate);
            const endDate = new Date(reservation.endDate);

            const formattedStartDate = `${
              startDate.getMonth() + 1
            }/${startDate.getDate()}/${startDate.getFullYear()}`;
            const formattedEndDate = `${
              endDate.getMonth() + 1
            }/${endDate.getDate()}/${endDate.getFullYear()}`;
            const reservationAuthor = users?.find(
              (user) => user.id === reservation.userId
            );
            return (
              <Dashcards
                key={reservation.id}
                houseLocation={`${reservation.listing.city}`}
                houseName={`${reservation.listing.title}`}
                startDate={formattedStartDate}
                endDate={formattedEndDate}
                reservation
                reservationAuthor={reservationAuthor}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <SideBar setSection={setSection} />
      <div>
        <div className=" w-[70px] sm:w-[150px] md:w-[250px] flex"></div>
      </div>
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
                imageSrc={`${user.image}`}
                avatar
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboad;
