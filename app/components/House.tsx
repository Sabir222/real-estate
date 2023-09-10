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
        // redirect to myreservations
      })
      .catch(() => {
        toast.error("Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loginModal, totalPrice, dateRange, listing?.id, currentUser]);

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
    <main className="mt-44">
      <ListingReservation
        price={listing?.price}
        totalPrice={totalPrice}
        onChangeDate={(value) => setDateRange(value)}
        dateRange={dateRange}
        onSubmit={onCreateReservation}
        disabled={isLoading}
        disabledDates={disabledDates}
      />
    </main>
  );
};
