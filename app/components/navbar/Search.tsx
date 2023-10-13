"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    const encodedSearchQuery = encodeURI(searchQuery.trim());
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch}>
      <div className="flex justify-center items-center relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
          className="text-sm font-semibold pl-5 pr-10 text-black py-2  ease-in-out duration-150 rounded-lg w-full flex items-center  justify-between md:w-[270px] lg:w-[500px] ring-1 ring-black hover:ring-2 "
        />
        <div
          className="p-2 ml-2 bg-black rounded-full absolute text-white flex  justify-between right-2 cursor-pointer"
          onClick={onSearch}
        >
          <BiSearch size={10} />
        </div>
      </div>
    </form>
  );
};

export default Search;
