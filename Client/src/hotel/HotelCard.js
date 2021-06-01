import { Card, Button } from "react-bootstrap";
import defaultImage from "../images/dog-header.jpg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const HotelCard = (props) => {
  const hotel = props.hotel;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    localStorage.setItem("clicked-hotel", JSON.stringify(hotel));
    dispatch({
      type: "CLICKED_HOTEL",
      payload: hotel,
    });
    history.push("/hotel");
  };

  return (
    <Card
      style={{ width: "18rem", height: "300px" }}
      className="text-center m-3 mt-5"
    >
      <Card.Img
        className="p-2"
        variant="top"
        src={defaultImage}
        style={{ width: "100%", height: "50%" }}
      />
      <Card.Body>
        <Card.Title>{hotel.hotelName}</Card.Title>
        <Button
          className="text-center mt-3"
          style={{ backgroundColor: "#3f51b5" }}
          onClick={handleClick}
        >
          See details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
