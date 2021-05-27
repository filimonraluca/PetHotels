import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeaderUser";

const Profile = () => {
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
        <p>Show all the info about the user</p>
      </div>
    </>
  );
};

export default Profile;
