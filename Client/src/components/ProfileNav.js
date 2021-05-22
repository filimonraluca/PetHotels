import { Nav } from "react-bootstrap";

const ProfileNav = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/profile">
      <Nav.Item>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/bookings">Bookings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/hotels">Hotels</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileNav;
