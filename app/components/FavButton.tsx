"use client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { SafeUser } from "@/app/types";
import useFavorite from "../hooks/FavoriteStore";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const FavButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
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
      {hasFavorited ? <AiFillStar size={30} className='fill-yellow-500' /> : <AiOutlineStar size={30} className='fill-white' />}
    </div>
  );
};

export default FavButton;

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
