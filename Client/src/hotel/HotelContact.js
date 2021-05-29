import { Form } from "react-bootstrap";

const HotelContact = (props) => {
  const hotel = props.hotel;
  console.log(hotel)
  return (
    <Form
      className="w-50 p-5 m-5 d-flex align-items-center flex-column justify-content-center"
      style={{
        borderTop: "1px solid #cacacc",
        borderBottom: "1px solid #cacacc",
      }}
    >
      <div className="w-100 d-flex align-items-center flex-row justify-content-between">
        <h6 style={{ color: "#3f51b5" }}>
          <i className="fas fa-map-marker-alt"></i>
          <span> {hotel.address}</span>
        </h6>
        <h6 style={{ color: "#3f51b5" }}>
          <i className="fas fa-phone"></i>
          <span> {hotel.phone}</span>
        </h6>
        <h6 style={{ color: "#3f51b5" }}>
          <i className="fas fa-envelope"></i>
          <span> {hotel.email}</span>
        </h6>
      </div>
      <div className="w-100 mt-5 d-flex align-items-center flex-row justify-content-center">
        <h3 className="pt-3 pe-3 ps-3" style={{ color: "#3f51b5" }}>
          <i className="fab fa-facebook-square fa-lg"></i>
        </h3>
        <h3 className="pt-3 pe-3 ps-3" style={{ color: "#3f51b5" }}>
          <i className="fab fa-instagram fa-lg"></i>
        </h3>
        <h3 className="pt-3 pe-3 ps-3" style={{ color: "#3f51b5" }}>
          <i className="fab fa-twitter-square fa-lg"></i>
        </h3>
      </div>
    </Form>
  );
};

export default HotelContact;
