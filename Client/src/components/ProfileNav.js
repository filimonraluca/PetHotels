import { Nav } from "react-bootstrap";

const ProfileNav = () => {
  const active = window.location.pathname;

  return (
    <Nav justify variant="tabs">
      <Nav.Item>
        <Nav.Link
          className={`${active === "/profile" && "active"}`}
          href="/profile"
        >
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`${active === "/profile/bookings" && "active"}`}
          href="/profile/bookings"
        >
          Bookings
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileNav;
