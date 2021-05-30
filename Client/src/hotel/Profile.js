import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeaderHotel";
import React, { useState } from "react";
import { updateHotel } from "../actions/hotels";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { hotel } = auth;
  const dispatch = useDispatch();
  const [email, setEmail] = useState(hotel.email);
  const [hotelName, setHotelName] = useState(hotel.hotelName);
  const [hotelDescription, setHotelDescription] = useState(
    hotel.hotelDescription
  );
  const [city, setCity] = useState(hotel.city);
  const [address, setAddress] = useState(hotel.address);
  const [phone, setPhone] = useState(hotel.phone);
  const [rooms, setRooms] = useState(hotel.rooms);
  const [pricePerNight, setPricePerNight] = useState(hotel.pricePerNight);

  async function handleClick(e) {
    e.preventDefault();

    const hotelId = hotel._id;

    const data = await updateHotel(
      {
        hotelName,
        hotelDescription,
        email,
        phone,
        city,
        address,
        rooms,
        pricePerNight,
      },
      hotelId,
      auth.token
    );
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("Profile updated successfully");
      console.log(data.data.doc);
      const newData = {
        hotel: data.data.doc,
        token: auth.token,
      };
      localStorage.setItem("auth-token", JSON.stringify(newData));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: newData,
      });
    }
  }

  return (
    <>
      <div
        className="container-fuild p-5 bg-light"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <ProfileHeader />
      </div>
      <div className="container-fuild p-4">
        <ProfileNav />
      </div>
      <div className="container d-flex align-items-center flex-column justify-content-center">
        <Form className="w-75">
          <Row className="p-5">
            <Col>
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                placeholder="Hotel Name"
                defaultValue={hotel.hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                defaultValue={hotel.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5">
            <Col>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                defaultValue={hotel.hotelDescription}
                onChange={(e) => setHotelDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5">
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City"
                defaultValue={hotel.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Address"
                defaultValue={hotel.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5">
            <Col>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                placeholder="Phone"
                defaultValue={hotel.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                placeholder="Number of Rooms"
                defaultValue={hotel.rooms}
                onChange={(e) => setRooms(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Price per night</Form.Label>
              <Form.Control
                placeholder="Price per night"
                defaultValue={hotel.pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5">
            <Button
              type="submit"
              style={{ backgroundColor: "#3f51b5" }}
              onClick={handleClick}
            >
              Save changes
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Profile;
