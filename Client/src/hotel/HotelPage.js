import { useLocation } from "react-router-dom";
import Header from "./HotelHeader";
import Details from "./HotelDetailsCards";
import { Container, Row, Col } from "react-bootstrap";
import ReservationForm from "../reservation/ReservationForm";

const Hotel = () => {
  const location = useLocation();
  const hotel = location.state;
  return (
    <div className="d-flex align-items-center flex-column justify-content-center">
      <Header hotel={hotel} />
      <h1 className="mt-5 mb-5 text-monospace">{hotel.hotelName}</h1>
      <Container fluid>
        <Row>
          <Col className="d-flex align-items-center flex-row justify-content-center">
            <Details hotel={hotel} />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center flex-column justify-content-center">
            <ReservationForm />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center flex-column justify-content-center">
            <h2>Mapa</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Hotel;
