"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import FavButton from "../FavButton";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useEffect, useState } from "react";
import ListingSkeletons from "./ListingSkeletons";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  actionLabel?: string;
  actionId?: string;
  reservation?: SafeReservation;
  disabled?: boolean;
  onAction?: (id: string) => void;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  disabled,
  actionId = "",
  actionLabel,
  reservation,
  onAction,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Simulate a delay of 2 seconds before setting loading to false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <ListingSkeletons />
      ) : (
        <div
          onClick={() => router.push(`/listings/${data.id}`)}
          className="rounded-2xl hover:shadow-2xl shadow cursor-pointer ease-in-out flex flex-col gap-3  relative duration-200"
        >
          <Image
            className=" h-[300px] w-full rounded-md object-cover"
            src={data.imageSrc}
            alt="img"
            width={500}
            height={500}
          />
          <div className="p-4 flex flex-col gap-1">
            <div className="font-semibold">
              {capitalizeFirstLetter(data.city)},{" "}
              {capitalizeFirstLetter(data.country)}
            </div>
            <div className=" truncate hover:text-clip ">{data.title}</div>
            <div className="">
              <span className="font-semibold">${data.price}</span>/ Per night
            </div>
          </div>
          <div className="absolute top-3 right-3 ">
            <FavButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default ListingCard;
