import {
  Container,
  Row,
  Col,
  Jumbotron,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import defaultImage from "../images/header.jpg";

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="p-0 vh-100 ">
          <Jumbotron
            className="shadow w-100 h-100 d-flex align-items-center flex-column justify-content-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5)), url(${defaultImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1
              className="text-center align-middle text-white"
              style={{
                fontFamily: "Niconne, cursive",
                fontWeight: "500",
                fontSize: "6rem",
                color: "#fcedd8",
                lineHeight: "#d52e3f",
                textShadow: "5px 5px 0px #3f51b5",
              }}
            >
              Find the best place for your pet
            </h1>
            <Form className="d-flex">
              <FormControl type="text" placeholder="Search" className="m-3" />
              <Button
                className="p-2 m-3"
                style={{ backgroundColor: "#3f51b5" }}
              >
                Search
              </Button>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
