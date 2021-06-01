import { Card, ListGroup, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getUserById } from "../actions/users";

const ReservationCard = (props) => {
  const reservation = props.reservation;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const response = await getUserById(reservation.userId);
    if (!response.success) {
      console.log(reservation.userId + " " + reservation._id);
    }
    setUser(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser(user);
  }, [user]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Card
      style={{ width: "18rem", height: "250px" }}
      className="text-center m-3 mt-5"
    >
      <Card.Body>
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
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
      </Card.Body>
    </Card>
  );
};

export default ReservationCard;
