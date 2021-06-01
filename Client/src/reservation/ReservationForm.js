import React, { useState } from "react";
import { Row, Col, Form, Button, Toast } from "react-bootstrap";
import { createReservation } from "../actions/reservations";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OnlinePayment from "./OnlinePayment"

const ReservationForm = (props) => {
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));
  const [reservationStartDate, setStartDate] = useState();
  const [reservationEndDate, setEndDate] = useState();
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [payed, setPayed] = useState(false)
  let totalPrice = 0;

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
          payed
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

  function validateDate() {
    if (onlinePayment)
    {
      const startDate = new Date(reservationStartDate)
      const endDate = new Date(reservationEndDate)
      const currentDate = new Date()
      if (endDate - startDate > 0 && startDate>=currentDate && endDate>currentDate) {
        totalPrice = ((endDate - startDate) / 86400000)*props.hotel.pricePerNight;
        return true;
      }
      return false
    }
    return false
  }

  // let onlinePaymentButton = <div></div>;
  // if (onlinePayment) {
  //   if (validateDate(reservationStartDate,reservationEndDate))
  //     onlinePaymentButton = <OnlinePayment
  //       setPayed={setPayed}
  //       totalPrice={totalPrice}></OnlinePayment>;
  // }
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
      {validateDate()? <OnlinePayment
        setPayed={setPayed}
        totalPrice={totalPrice}></OnlinePayment> : <></>}
      <Form.Group as={Row} className="mb-3">
        <Button
          type="submit"
          style={{ backgroundColor: "#3f51b5" }}
          onClick={handleClick}
          disabled={onlinePayment ^ payed}
        >
          Book Now
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ReservationForm;
