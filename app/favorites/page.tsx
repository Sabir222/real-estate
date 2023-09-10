import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import Favorites from "../components/Favorites";
import Heading from "../components/Heading";

const page = async () => {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Favorites favorites={favorites} currentUser={currentUser} />
    </div>
  );
};

export default page;
