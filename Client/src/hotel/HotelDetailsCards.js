import { Card, Button } from "react-bootstrap";

const Details = (props) => {
  const hotel = props.hotel;
  return (
    <>
      <Card
        text="white"
        style={{
          width: "18rem",
          backgroundColor: "#3f51b5",
          height: "200px",
        }}
        className="m-5 text-center"
      >
        <Card.Header>About</Card.Header>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {hotel.hotelDescription}
          </Card.Text>
          <Button
            className="text-center mt-3"
            style={{
              backgroundColor: "#ffffff",
              border: "#3f51b5",
              color: "#3f51b5",
            }}
          >
            Read more...
          </Button>
        </Card.Body>
      </Card>
      <Card
        text="white"
        style={{
          width: "18rem",
          backgroundColor: "#3f51b5",
          height: "200px",
        }}
        className="m-5 text-center"
      >
        <Card.Header>Price</Card.Header>
        <Card.Body>
          <Card.Title>Only ${hotel.pricePerNight}</Card.Title>
          <Card.Text
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            Your lovely pet can spend a peaceful night with only $
            {hotel.pricePerNight}
          </Card.Text>
          <Button
            className="text-center mt-3"
            style={{
              backgroundColor: "#ffffff",
              border: "#3f51b5",
              color: "#3f51b5",
            }}
          >
            Read more...
          </Button>
        </Card.Body>
      </Card>
      <Card
        text="white"
        style={{
          width: "18rem",
          backgroundColor: "#3f51b5",
          height: "200px",
        }}
        className="m-5 text-center"
      >
        <Card.Header>Availability</Card.Header>
        <Card.Body>
          <Card.Title>24/7</Card.Title>
          <Card.Text
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            We have {hotel.rooms} rooms available! make a booking now!
          </Card.Text>
          <Button
            className="text-center mt-3"
            style={{
              backgroundColor: "#ffffff",
              border: "#3f51b5",
              color: "#3f51b5",
            }}
          >
            Read more...
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Details;
