"use client";

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Card, CardBody, Skeleton, Image, CardFooter } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { SafeListing } from "../types";
import { BsFillHouseFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface MapProps {
  listings: SafeListing[];
}
//
const Map: React.FC<MapProps> = ({ listings }) => {
  const centerMorocco = useMemo(
    () => ({ lat: 31.501120166432887, lng: -9.75375476694082 }),
    []
  );

  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  if (!isLoaded) {
    return (
      <Skeleton className="rounded-lg h-[500px] w-[100%]">
        <div className="h-24 rounded-lg bg-default-1000"></div>
      </Skeleton>
    );
  }
  return (
    <GoogleMap
      mapContainerClassName="h-[500px] w-[100%] rounded-2xl "
      zoom={4.89}
      center={centerMorocco}
    >
      {listings.map((listing, index) => (
        <div key={listing.id}>
          <MarkerF
            position={{ lat: listing.lat, lng: listing.lng }}
            onClick={() => setSelected(index)}
          />
          {selected === null && (
            <InfoWindowF position={{ lat: listing.lat, lng: listing.lng }}>
              <div
                className={` flex items-center justify-center `}
                onClick={() => setSelected(index)}
              >
                <BsFillHouseFill size={40} />
              </div>
            </InfoWindowF>
          )}
          {selected === index && (
            <InfoWindowF
              position={{ lat: listing.lat, lng: listing.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="p-4">
                <Card
                  onClick={() => router.push(`/listings/${listing.id}`)}
                  shadow="sm"
                  key={listing?.id}
                  isPressable
                  onPress={() => console.log("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={listing.title}
                      className="w-full object-cover h-[140px]"
                      src={listing.imageSrc}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{listing.title}</b>
                    <p className="text-default-500">${listing.price}</p>
                  </CardFooter>
                </Card>
              </div>
            </InfoWindowF>
          )}
        </div>
      ))}
    </GoogleMap>
  );
};

export default Map;
