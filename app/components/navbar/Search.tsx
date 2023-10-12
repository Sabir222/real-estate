"use client";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className="flex justify-center items-center relative">
      <input
        type="text"
        placeholder="Search"
        className="text-sm font-semibold pl-5 pr-10 text-gray-400 py-2  ease-in-out duration-150 rounded-lg w-full flex items-center  justify-between md:w-[270px] lg:w-[500px] ring-1 ring-black hover:ring-2 "
      />
      <div className="p-2 ml-2 bg-black rounded-full absolute text-white flex  justify-between right-2">
        <BiSearch size={10} />
      </div>
    </div>
  );
};

export default Search;

