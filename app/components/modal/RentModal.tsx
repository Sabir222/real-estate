"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModalStore from "@/app/hooks/RentModalStore";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import ImagesUpload from "../inputs/ImagesUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  LOCATION = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModalStore();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      lat: 0,
      lng: 0,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
      country: "",
      city: "",
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    try {
      await axios.post("/api/listings", data);

      toast.success("Successfully added");
      reset();
      router.refresh();
      setStep(STEPS.LOCATION);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
    console.log(data);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Add Home";
    }
    return "NEXT";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "BACK";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where's the House location?"
        center
        subtitle="Please Add coordinates of the House"
      />
      <Input
        label="Lat"
        id="lat"
        type="number"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <hr />
      <Input
        label="Lng"
        id="lng"
        type="number"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
      <hr />
      <Input
        id="country"
        label="Country"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
      <hr />
      <Input
        id="city"
        label="City"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="House Info" subtitle="Add necessary information" />
        <hr />
        <Counter
          title="Rooms"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ImagesUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="House Description" subtitle="Add description" />
        <Input
          id="title"
          label="Title"
          errors={errors}
          required
          register={register}
          disabled={isLoading}
        />
        <hr />

        <Input
          id="description"
          label="Description"
          errors={errors}
          required
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="House Price" subtitle="Add Price per night" />
        <Input
          id="price"
          label="Price"
          errors={errors}
          required
          register={register}
          disabled={isLoading}
          formatPrice
          type="number"
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      onClose={rentModal.onClose}
      title="Add a Home"
      isOpen={rentModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
