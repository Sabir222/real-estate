"use client";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import Container from "./Container";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";

interface MyReservationsProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
const Myreservations: React.FC<MyReservationsProps> = ({
  reservations,
  currentUser,
}) => {
  console.log("reservations", reservations);

  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [loading, setLoading] = useState(true);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  useEffect(() => {
    // Simulate a delay of 2 seconds before setting loading to false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {reservations.map((reservation) => {
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);

          if (loading) {
            return (
              <div key={reservation.id}>
                <Card className="w-full space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-5/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-5/5 rounded-lg">
                      <div className="h-12 w-5/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              </div>
            );
          }

          const formattedStartDate = `${
            startDate.getMonth() + 1
          }/${startDate.getDate()}/${startDate.getFullYear()}`;
          const formattedEndDate = `${
            endDate.getMonth() + 1
          }/${endDate.getDate()}/${endDate.getFullYear()}`;
          return (
            <>
              <Card
                className="mb-8 z-0"
                shadow="sm"
                key={reservation.id}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={reservation.listing.title}
                    className="w-full object-cover "
                    src={`${reservation.listing.imageSrc}`}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{reservation.listing.title}</b>
                  <p className="text-default-500">${reservation.totalPrice}</p>
                </CardFooter>
                <CardFooter className="text-small justify-between">
                  <p className="text-gray-400">{reservation.listing.city}</p>
                </CardFooter>
                <CardFooter className="text-small flex flex-col gap-2 items-start">
                  <p className="text-gray-400">From {formattedStartDate}</p>
                  <p className="text-gray-400">To {formattedEndDate}</p>
                </CardFooter>
                <div className="p-2 w-full">
                  <Button
                    className="w-full"
                    color="danger"
                    variant="bordered"
                    startContent={<AiOutlineDelete />}
                    onClick={() => onCancel(reservation.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </>
          );
        })}
      </div>
    </Container>
  );
};

export default Myreservations;
