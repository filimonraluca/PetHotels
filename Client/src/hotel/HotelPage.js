import Header from "./HotelHeader";
import Details from "./HotelDetailsCards";
import { Container, Row, Col } from "react-bootstrap";
import ReservationForm from "../reservation/ReservationForm";
import HotelContact from "./HotelContact";
import HotelMap from "./HotelMap";
import { useSelector } from "react-redux";

const Hotel = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
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
            <ReservationForm hotel={hotel} />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center flex-column justify-content-center">
            <h2>Contact us</h2>
            <HotelContact hotel={hotel} />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center flex-column justify-content-center ">
            <h2>Our Location</h2>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center flex-column justify-content-center ">
            <HotelMap hotel={hotel} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Hotel;
