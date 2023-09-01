"use client";
import Modal from "./Modal";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModalStore from "@/app/hooks/RegisterModalStore";
import { useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
const RegisterModal = () => {
  const registerModal = useRegisterModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to our platform"
        subtitle="Create an account"
        center
      />
      <Input
        id="email"
        label="Email"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="name"
        label="Name"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        disabled={isLoading}
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        disabled={isLoading}
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="flex justify-center text-gray-400">
        <div className="flex gap-2 ">
          <div>Already have an account?</div>
          <div onClick={registerModal.onClose} className="hover:underline hover:text-black cursor-pointer">
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Sign up"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
