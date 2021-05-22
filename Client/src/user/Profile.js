import ProfileNav from "../components/ProfileNav";

const Profile = () => {
  return (
    <>
      <div className="container-fuild bg-secondary p-5">
        <h1>Helo, Your Name</h1>
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

export default Profile;
