import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getHotelById } from "../actions/hotels";

const ReservationCard = (props) => {
  const reservation = props.reservation;
  const history = useHistory();
  const dispatch = useDispatch();

  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState(true);

  const fetchHotel = async () => {
    const response = await getHotelById(reservation.hotelId);
    setHotel(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotel(hotel);
  }, [hotel]);

  const seeHotel = async (e) => {
    e.preventDefault();
    localStorage.setItem("clicked-hotel", JSON.stringify(hotel));
    dispatch({
      type: "CLICKED_HOTEL",
      payload: hotel,
    });
    history.push("/hotel");
  };

  const deleteReservation = async (e) => {
    e.preventDefault();
    localStorage.setItem("clicked-hotel", JSON.stringify(hotel));
    dispatch({
      type: "CLICKED_HOTEL",
      payload: hotel,
    });
    history.push("/hotel");
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Card
      style={{ width: "18rem", height: "320px" }}
      className="text-center m-3 mt-5"
    >
      <Card.Body>
        <Card.Title>{hotel.hotelName}</Card.Title>
        <Card.Header>
          {reservation.onlinePayment ? "Payment complete" : "Payment at hotel"}
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {`Start: ${new Date(
              reservation.reservationStartDate
            ).toDateString()}`}
          </ListGroup.Item>
          <ListGroup.Item>{`End: ${new Date(
            reservation.reservationEndDate
          ).toDateString()}`}</ListGroup.Item>
          <ListGroup.Item>{`Total price: $${reservation.totalPrice}`}</ListGroup.Item>
        </ListGroup>
        <Button
          className="text-center m-2"
          style={{ backgroundColor: "#3f51b5" }}
          onClick={seeHotel}
        >
          Details
        </Button>
        {!reservation.onlinePayment && (
          <Button
            className="text-center m-3"
            style={{ backgroundColor: "#3f51b5" }}
            onClick={deleteReservation}
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReservationCard;
