"use client";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className="border-[1px] md:w-full w-auto   rounded-lg transition max-w-[700px]  ">
      <div className="flex flex-row  items-center justify-between">
        <div className="text-sm font-semibold pl-5 pr-10 hover:bg-gray-100 text-gray-400 py-2 cursor-pointer   ease-in-out duration-150 rounded-r-lg w-full flex items-center relative justify-between md:w-[270px] lg:w-[500px]">
          Search
          <div className="p-2 ml-2 bg-black rounded-full absolute text-white flex  justify-between right-1">
            <BiSearch size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
