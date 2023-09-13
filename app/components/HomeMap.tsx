"use client";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { SafeListing } from "../types";
import Map from "@/app/components/Map";

interface MapProps {
  listings: SafeListing[];
}
const HomeMap: React.FC<MapProps> = ({ listings }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col pb-2 gap-3">
      <Switch
        className=""
        isSelected={isSelected}
        onValueChange={setIsSelected}
      >
        Use map
      </Switch>

      {isSelected && (
        <div className="pb-10">
          <Map listings={listings} />
        </div>
      )}
    </div>
  );
};

export default HomeMap;
