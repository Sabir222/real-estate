import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListing";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const currentLisings = await getListings();
 

  return (
    <main>
      <div className=" h-full max-w-[2520px]  xl:px-20 md:px-10 sm:px-2 px-4 py-4 mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:grid-cols-5 2xl:grid-cols-6 pt-44">
        {currentLisings.map((listing) => {
          return <ListingCard key={listing.id} data={listing} />;
        })}
      </div>
    </main>
  );
}
