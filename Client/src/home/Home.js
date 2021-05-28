import HotelsList from "./HotelsList";
import Header from "./Header";

const Home = () => {
  return (
    <div className="d-flex align-items-center flex-column justify-content-center">
      <Header />
      <h1
        className="mt-5 text-monospace"
        style={{
          fontFamily: "Niconne, cursive",
          fontWeight: "500",
          fontSize: "3rem",
          color: "#3f51b5",
        }}
      >
        TOP HOTELS
      </h1>
      <HotelsList />
    </div>
  );
};

export default Home;
