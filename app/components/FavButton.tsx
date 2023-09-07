"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorites from "../hooks/FavoriteStore";

import { SafeUser } from "@/app/types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;

/*"use client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/FavoriteStore";

interface FavProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const FavButton: React.FC<FavProps> = ({ listingId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      {hasFavorited ? (
        <AiFillStar
          size={28}
          className={`fill-yellow-500
          absolute
          -top-[2px]
          -right-[2px]`}
        />
      ) : (
        <AiOutlineStar
          size={28}
          className={`fill-white
          absolute
          -top-[2px]
          -right-[2px]`}
        />
      )}
    </div>
  );
};

export default FavButton;*/
