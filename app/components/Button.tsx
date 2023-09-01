"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80 
      transition
      w-full
      border-2
      ${
        outline
          ? "bg-white text-black border-black hover:bg-gray-200 "
          : "bg-black text-white border-black "
      }

      ${
        small
          ? "py-1 text-sm font-light boder-[1px]"
          : "py-3 text-md font-semibold "
      }

    `}
    >
      {Icon && (
        <Icon
          size={20}
          className={`absolute left-4 ${small ? "top-1" : "top-3"}`}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
