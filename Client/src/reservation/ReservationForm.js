import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { createReservation } from "../actions/reservations";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ReservationForm = (props) => {
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));
  const [reservationStartDate, setStartDate] = useState();
  const [reservationEndDate, setEndDate] = useState();
  const [onlinePayment, setOnlinePayment] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    if (auth == null) {
      toast.error("You must be logged in to make a reservation!");
      history.push("/login-user");
    } else {
      const { user } = auth;
      const userId = user._id;
      const hotel = props.hotel;
      const hotelId = hotel._id;
      const hotelPrice = hotel.pricePerNight;

      const data = await createReservation(
        {
          userId,
          hotelId,
          hotelPrice,
          reservationStartDate,
          reservationEndDate,
          onlinePayment,
        },
        auth.token
      );
      console.log(data);
      if (data.success === false) toast.error(data.error.message);
      else {
        toast.success("Reservation created successfully");
      }
    }
  }

  return (
    <Form
      className="w-50 p-5 m-5"
      style={{ border: "1px solid #cacacc", backgroundColor: "fcedd8" }}
    >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="startDate">
          <Form.Label>Select Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            placeholder="Check in"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <Form.Label>Select End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            placeholder="Check out"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" id="onlinePayment">
        <Form.Check
          type="checkbox"
          label="Online payment"
          onChange={(e) => setOnlinePayment(!onlinePayment)}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Button
          type="submit"
          style={{ backgroundColor: "#3f51b5" }}
          onClick={handleClick}
        >
          Book Now
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ReservationForm;
