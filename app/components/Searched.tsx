"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "./Container";
import ListingCard from "./listings/ListingCard";
import { SafeUser, SafeListing } from "../types";
import Heading from "./Heading";
import { Spinner } from "@nextui-org/react";

interface SearchProps {
  currentUser?: SafeUser | null;
}

const Searched: React.FC<SearchProps> = ({ currentUser }) => {
  const [data, setData] = useState<SafeListing[] | null>(null);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/search?q=${encodedSearchQuery}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    setData(null);

    if (encodedSearchQuery) {
      fetchData();
    }
  }, [encodedSearchQuery]);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner color="default" size="lg" />
        </div>
      </div>
    );
  } else if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Heading
          center
          title="Sorry,"
          subtitle="There aren't any houses in the city you searched."
        />
      </div>
    );
  }
  return (
    <main className="min-h-screen">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 xl:grid-cols-4 2xl:grid-cols-5">
          {data?.map((listing) => {
            return (
              <>
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                />
              </>
            );
          })}
        </div>
      </Container>
    </main>
  );
};

export default Searched;
