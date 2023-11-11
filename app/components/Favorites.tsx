"use client";
import React from "react";
import Container from "./Container";
import ListingCard from "./listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import Heading from "./Heading";

interface FavoritesProps {
  favorites: SafeListing[] | null;
  currentUser?: SafeUser | null;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, currentUser }) => {
  if (favorites?.length === 0 || !favorites) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading
          title="You have no favorite houses"
          subtitle="browse our house collection and add what you like"
          center
        />
      </div>
    );
  }
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:grid-cols-5 2xl:grid-cols-6">
        {favorites?.map((favorite) => {
          return (
            <ListingCard
              data={favorite}
              key={favorite.id}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Favorites;
