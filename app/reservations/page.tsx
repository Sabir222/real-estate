import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import Heading from "../components/Heading";
import Myreservations from "../components/Myreservations";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading
          center
          title="Please Login !"
          subtitle="You to login or create account to see this page"
        />
      </div>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading
          title="You have no Reservations"
          center
          subtitle="Browse our houses to make a reservation"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Myreservations currentUser={currentUser} reservations={reservations} />
    </div>
  );
};

export default page;
