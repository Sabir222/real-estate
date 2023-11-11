"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { BsCardImage } from "react-icons/bs";
declare global {
  var cloudinary: any;
}

interface ImagesUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImagesUpload: React.FC<ImagesUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="j9centpr"
      options={{
        maxFiles: 4,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 border-dashed border-2 p-20 border-black flex flex-col justify-center items-center text-neutral-500 gap-4"
          >
            <BsCardImage size={100} />
            <p className="text-lg font-semibold text-gray-400">
              Click Here to Upload
            </p>
            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image alt="upload" fill src={value} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImagesUpload;
