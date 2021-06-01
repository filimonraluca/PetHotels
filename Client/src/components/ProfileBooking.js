import UserProfileBooking from "../user/ProfileBooking";
import HotelProfileBooking from "../hotel/ProfileBooking";
import { useSelector } from "react-redux";

const ProfileBooking = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <>
      {auth.user != null && <UserProfileBooking></UserProfileBooking>}
      {auth.hotel != null && <HotelProfileBooking></HotelProfileBooking>}
    </>
  );
};

export default ProfileBooking;
