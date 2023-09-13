import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListing";
import Container from "./components/Container";
import HomeMap from "./components/HomeMap";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const currentLisings = await getListings();
  const currentUser = await getCurrentUser();

  return (
    <main>
      <Container>
        <HomeMap listings={currentLisings} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 xl:grid-cols-4 2xl:grid-cols-5">
          {currentLisings.map((listing) => {
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
}
