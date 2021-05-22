import ProfileNav from "../components/ProfileNav";
import ConnectNav from "../components/ConnectNav";

const ProfileBooking = () => {
  return (
    <>
      <div className="container-fuild bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fuild p-4">
        <ProfileNav />
      </div>
      <div className="container">
        <p>Show all the reservations and a button to browse hotels</p>
      </div>
    </>
  );
};

export default ProfileBooking;
