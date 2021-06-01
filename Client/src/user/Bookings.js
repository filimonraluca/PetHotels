import { Container, Row, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ReservationCard from "../reservation/ReservationCardHotel";
import { getReservationsByUser } from "../actions/reservations";
import { useSelector } from "react-redux";

const Bookings = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    const response = await getReservationsByUser(user._id, auth.token);
    setReservations(response.data.reservations);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations(reservations);
  }, [reservations]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container fluid>
      <Row
        lg={6}
        md={4}
        sm={3}
        xs={1}
        className="d-flex align-items-center justify-content-center m-3"
      >
        {reservations.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation._id} />
        ))}
      </Row>
    </Container>
  );
};

export default Bookings;
