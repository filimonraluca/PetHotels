import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeaderHotel";
import Bookings from "./Bookings";

const ProfileBooking = () => {
  return (
    <>
      <div
        className="container-fuild p-5 bg-light"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <ProfileHeader />
      </div>
      <div className="container-fuild p-4">
        <ProfileNav />
      </div>
      <div className="container">
        <Bookings />
      </div>
    </>
  );
};

export default ProfileBooking;
