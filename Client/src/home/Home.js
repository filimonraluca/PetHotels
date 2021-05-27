import HotelsList from "./HotelsList";

const Home = () => {
  return (
    <div className="d-flex align-items-center flex-column justify-content-center">
      <h2 className="mt-5 text-monospace">Find the best hotel for your pet</h2>
      <HotelsList />
    </div>
  );
};

export default Home;
