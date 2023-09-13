"use client";

import { SafeListing, SafeReservation, SafeUser } from "../types";
import useLoginModalStore from "../hooks/LoginModalStore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./listings/ListingReservation";
import { Range } from "react-date-range";
import Container from "./Container";
import { MdBathroom, MdBedroomParent } from "react-icons/md";
import { Image } from "@nextui-org/react";
import Map from "@/app/components/Map";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface HouseProps {
  reservations?: SafeReservation[];
  listing: SafeListing;
  currentUser?: SafeUser | null;
}
export const House: React.FC<HouseProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModalStore();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Success");
        setDateRange(initialDateRange);
        router.push("/reservations");
      })
      .catch(() => {
        toast.error("Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loginModal, totalPrice, dateRange, listing?.id, currentUser, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.price) {
        setTotalPrice(listing?.price * dayCount);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  return (
    <Container>
      <div className="lg:px-[100px]  2xl:px-[230px]">
        <div className="w-full pb-10">
          <Image
            className="w-full z-0"
            height={100}
            alt="NextUI hero Image"
            src={`${listing?.imageSrc}`}
          />
        </div>
        <div className="flex flex-col  md:flex-row  gap-6 pb-10">
          <div className="w-full  p-4">
            <p className="text-xl font-semibold">{listing?.title}</p>
            <p className="text-lg text-gray-400 pb-2">
              {listing?.country},{listing?.city}
            </p>
            <hr />
            <p className="pt-7">{listing?.description}</p>

            <div className="flex flex-col xl:flex-row gap-4 mt-6">
              <div className="w-full flex items-center gap-3 text-2xl">
                <MdBedroomParent size={50} />
                {listing?.roomCount} Rooms
              </div>
              <div className="w-full flex items-center gap-3 text-2xl">
                <MdBathroom size={50} /> {listing?.bathroomCount} Bathrooms
              </div>
            </div>
          </div>
          <div className="w-full">
            <ListingReservation
              price={listing?.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
        <Map listings={[listing]} />
      </div>
    </Container>
  );
};
