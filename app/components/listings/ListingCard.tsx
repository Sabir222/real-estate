"use client";

import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FavButton from "../FavButton";
import { SafeListing, SafeUser } from "@/app/types";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="rounded-md hover:shadow-2xl cursor-pointer ease-in-out flex flex-col gap-3  relative duration-200"
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
          {data.city}, {data.country}
        </div>
        <div className="">{data.title}</div>
        <div className="">
          <span className="font-semibold">${data.price}</span>/ Per night
        </div>
      </div>
      <div className="absolute top-3 right-3 ">
        <FavButton listingId={data.id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ListingCard;
