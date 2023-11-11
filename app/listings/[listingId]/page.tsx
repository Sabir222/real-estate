import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { House } from "@/app/components/House";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <div>
        <Container>
          <Heading
            center
            title="Ops Error found!"
            subtitle="Listing not found"
          />
        </Container>
      </div>
    );
  }
  return (
    <House
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default page;
