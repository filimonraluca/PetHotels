import { Row, Col, Form, Button } from "react-bootstrap";

const ReservationForm = () => {
  return (
    <Form
      className="w-50 p-5 m-5"
      style={{ border: "1px solid #cacacc", backgroundColor: "fcedd8" }}
    >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="startDate">
          <Form.Label>Select Start Date</Form.Label>
          <Form.Control type="date" name="startDate" placeholder="Check in" />
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <Form.Label>Select End Date</Form.Label>
          <Form.Control type="date" name="endDate" placeholder="Check out" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="rooms">
          <Form.Label>Rooms</Form.Label>
          <Form.Control
            type="digit"
            name="rooms"
            placeholder="Number of rooms"
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="pet">
          <Form.Label>Rooms</Form.Label>
          <Form.Control type="text" name="pet" placeholder="Pet type" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" id="onlinePayment">
        <Form.Check type="checkbox" label="Online payment" />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Button type="submit" style={{ backgroundColor: "#3f51b5" }}>
          Book Now
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ReservationForm;
