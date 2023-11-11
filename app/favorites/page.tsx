import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import Favorites from "../components/Favorites";

const page = async () => {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <Favorites favorites={favorites} currentUser={currentUser} />
    </div>
  );
};

export default page;
