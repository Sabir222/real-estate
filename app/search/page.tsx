import getCurrentUser from "../actions/getCurrentUser";
import Searched from "../components/Searched";
const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <Searched currentUser={currentUser} />
    </div>
  );
};

export default page;
