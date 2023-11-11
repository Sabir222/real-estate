"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;

  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,

  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2">
        <div className="font-medium">{title}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-10 h-10 flex rounded-full border-[1px] justify-center items-center hover:bg-black hover:text-white border-back cursor-pointer ease-in-out duration-150"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-medium text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 flex rounded-full border-[1px] justify-center items-center hover:bg-black hover:text-white border-back cursor-pointer ease-in-out duration-150"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
