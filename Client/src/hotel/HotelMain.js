import { useLocation } from "react-router-dom";
import HotelCard from "./HotelCard";

const Hotel = () => {
  const location = useLocation();
  const hotel = location.state;
  return <HotelCard hotel={hotel} />;
};
export default Hotel;
