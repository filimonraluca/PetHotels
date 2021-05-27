import UserProfile from "../user/Profile";
import HotelProfile from "../hotel/Profile";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <>
      {auth.user != null && <UserProfile></UserProfile>}
      {auth.hotel != null && <HotelProfile></HotelProfile>}
    </>
  );
};

export default Profile;
