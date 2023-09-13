"use client";
import Button from "@/app/components/Button";
import Avatar from "@/app/components/navbar/Avatar";
import { SafeUser } from "@/app/types";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface DashcardsProps {
  email?: string;
  username?: string;
  role?: string;
  imageSrc?: string;
  houseName?: string;
  houseLocation?: string;
  Delete?: boolean;
  update?: boolean;
  endDate?: string;
  startDate?: string;
  avatar?: boolean;
  onClick?: () => void;
  houseImg?: string;
  reservation?: boolean;
  reservationAuthor?: SafeUser;
  houseId?: string;
}
const Dashcards: React.FC<DashcardsProps> = ({
  email,
  username,
  role,
  houseLocation,
  houseName,
  Delete,
  update,
  onClick,
  imageSrc,
  avatar,
  houseImg,
  reservation,
  startDate,
  endDate,
  reservationAuthor,
  houseId,
}) => {
  const router = useRouter();

  const onDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("House deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    },
    [router]
  );
  return (
    <div
      className="p-4  rounded-md flex flex-col gap-4 sm:flex-row  items-center  bg-neutral-100  justify-between ease-in-out duration-300 hover:shadow-inner shadow-sm
"
    >
      {avatar && <Avatar src={imageSrc} />}
      {houseImg && (
        <Image alt="house image" width={60} height={60} src={houseImg} />
      )}
      {reservation && (
        <div className="flex flex-col gap-2">
          <p className="text-gray-400">From {startDate}</p>
          <p className="text-gray-400">To {endDate}</p>
        </div>
      )}

      <div className="flex flex-col justify-center ">
        {email && (
          <>
            <p className="text-lg font-semibold">{email}</p>
            <p className="text-gray-400">@{username}</p>
          </>
        )}
        {houseName && (
          <div className="flex flex-col items-center ">
            <p className="text-lg font-semibold text-center">{houseName}</p>
            <p className="text-gray-400">{houseLocation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center ">
        {role && (
          <div className="font-bold flex items-center justify-center text-center ">
            {role}
          </div>
        )}
      </div>

      <div className="min-w-[170px] flex items-center gap-3">
        {Delete && (
          <>
            <Button label="Delete" onClick={() => onDelete(houseId || "")} />
            {/*onDelete(houseId || "") */}
          </>
        )}
        {update && (
          <>
            <Button label="Make Admin" onClick={() => {}} />
          </>
        )}
        {reservationAuthor && (
          <div className="flex flex-col items-center">
            <p className="text-center text-lg font-semibold">
              Reservation made by
            </p>
            <p className="text-gray-400">{reservationAuthor.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashcards;
