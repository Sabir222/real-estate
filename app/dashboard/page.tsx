import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListing";
import Button from "../components/Button";
import Heading from "../components/Heading";
import AddListing from "../components/dashboard/AddListing";
import Dashboad from "../components/dashboard/Dashboad";
// import Map from "@/app/components/Map";
export default async function Home() {
  const currentUser = await getCurrentUser();

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
      <Dashboad />
    </main>
  );
}
