import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListing";
import getTotalReservations from "../actions/getTotalReservations";
import getTotalUsers from "../actions/getTotalUsers";
import Heading from "../components/Heading";
import Dashboad from "../components/dashboard/Dashboad";
export default async function Home() {
  const currentUser = await getCurrentUser();
  const currentLisings = await getListings();
  const users = await getTotalUsers();
  const reservations = await getTotalReservations();

  if (currentUser?.role !== "ADMIN") {
    return (
      <main className=" flex flex-col items-center justify-center min-h-screen">
        <Heading
          title="You don't have access to this page"
          subtitle="Please contact your admin"
          center
        />
        <button className=" py-3 px-6 text-white bg-black rounded-md">
          <a href="/">Back to home Page</a>
        </button>
      </main>
    );
  }

  return (
    <main>
      <Dashboad reservations={reservations} currentUser={currentUser} data={currentLisings} users={users} />
    </main>
  );
}
