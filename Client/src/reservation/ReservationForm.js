import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { createReservation } from "../actions/reservations";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OnlinePayment from "./OnlinePayment";

const ReservationForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { reservation } = useSelector((state) => ({ ...state }));

  if (reservation == null) {
    const resData = {
      onlinePayment: false,
      payed: false,
    };
    localStorage.setItem("current-reservation", JSON.stringify(resData));
    dispatch({
      type: "RESERVATION",
      payload: resData,
    });
  }

  reservation = useSelector((state) => ({ ...state })).reservation;

  const { auth } = useSelector((state) => ({ ...state }));
  const [reservationStartDate, setStartDate] = useState(
    reservation.reservationStartDate
  );
  const [reservationEndDate, setEndDate] = useState(
    reservation.reservationEndDate
  );
  const [onlinePayment, setOnlinePayment] = useState(reservation.onlinePayment);
  const [payed, setPayed] = useState(reservation.payed);

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
          payed,
        },
        auth.token
      );
      console.log(data);
      if (data.success === false) toast.error(data.error.message);
      else {
        toast.success("Reservation created successfully");
        reservation.reservationStartDate = null;
        reservation.reservationEndDate = null;
        reservation.onlinePayment = false;
        reservation.payed = false;
        localStorage.setItem(
          "current-reservation",
          JSON.stringify(reservation)
        );
        dispatch({
          type: "RESERVATION",
          payload: reservation,
        });
        history.push("/profile/bookings");
      }
    }
  }

  function validateDate() {
    if (onlinePayment) {
      const startDate = new Date(reservationStartDate);
      const endDate = new Date(reservationEndDate);
      const currentDate = new Date();
      if (
        endDate - startDate > 0 &&
        startDate >= currentDate &&
        endDate > currentDate
      ) {
        totalPrice =
          ((endDate - startDate) / 86400000) * props.hotel.pricePerNight;
        return true;
      }
      return false;
    }
    return false;
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
            value={reservation.reservationStartDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              reservation.reservationStartDate = e.target.value;
              localStorage.setItem(
                "current-reservation",
                JSON.stringify(reservation)
              );
              dispatch({
                type: "RESERVATION",
                payload: reservation,
              });
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <Form.Label>Select End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            placeholder="Check out"
            value={reservation.reservationEndDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              reservation.reservationEndDate = e.target.value;
              localStorage.setItem(
                "current-reservation",
                JSON.stringify(reservation)
              );
              dispatch({
                type: "RESERVATION",
                payload: reservation,
              });
            }}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" id="onlinePayment">
        <Form.Check
          type="checkbox"
          label="Online payment"
          defaultChecked={reservation.onlinePayment}
          onChange={(e) => {
            setOnlinePayment(!onlinePayment);
            reservation.onlinePayment = !onlinePayment;
            localStorage.setItem(
              "current-reservation",
              JSON.stringify(reservation)
            );
            dispatch({
              type: "RESERVATION",
              payload: reservation,
            });
          }}
        />
      </Form.Group>
      {validateDate() && (
        <OnlinePayment
          setPayed={setPayed}
          totalPrice={totalPrice}
        ></OnlinePayment>
      )}
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
