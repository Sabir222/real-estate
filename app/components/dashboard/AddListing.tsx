"use client";
import useRentModalStore from "@/app/hooks/RentModalStore";
import Button from "../Button";

const AddListing = () => {
  const rentModal = useRentModalStore();
  const handleClick = () => {
    rentModal.onOpen();
  };

  return (
    <div>
      <Button label="Add House" onClick={handleClick} />
    </div>
  );
};

export default AddListing;
