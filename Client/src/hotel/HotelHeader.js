import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import defaultImage from "../images/hotel.jpg";
const Header = (props) => {
  const hotel = props.hotel;
  return (
    <Container fluid>
      <Row>
        <Col className="p-0 vh-100 ">
          <Jumbotron
            className="shadow w-100 h-100 d-flex align-items-center flex-row justify-content-around"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.7)), url(${defaultImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-center align-middle text-white">
              <h1
                style={{
                  fontFamily: "Niconne, cursive",
                  fontWeight: "400",
                  fontSize: "3rem",
                  color: "#fcedd8",
                  lineHeight: "#d52e3f",
                  textShadow: "3px 3px 0px #3f51b5",
                }}
              >
                {hotel.hotelName}
              </h1>
              <h5 className="text-white">
                <i className="fas fa-map-marker-alt"></i>
                <span> {hotel.address}</span>
              </h5>
            </div>

            <Button
              className="p-3 m-3"
              style={{ backgroundColor: "#3f51b5", fontSize: "20px" }}
            >
              <i className="fas fa-calendar-plus"></i>
              <span> Book a room now</span>
            </Button>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
