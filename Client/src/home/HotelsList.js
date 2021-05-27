import { Container, Row, Spinner } from "react-bootstrap";
import { getHotels } from "../actions/hotels";
import React, { useState, useEffect } from "react";
import HotelCard from "../hotel/HotelCard";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    const response = await getHotels();
    setHotels(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels(hotels);
  }, [hotels]);

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
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel._id} />
        ))}
      </Row>
    </Container>
  );
};

export default HotelsList;
