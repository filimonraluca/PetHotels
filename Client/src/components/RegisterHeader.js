import { Nav } from "react-bootstrap";

const Register = () => {
  const active = window.location.pathname;
  return (
    <Nav justify variant="tabs" className="mt-2 mb-5">
      <Nav.Item>
        <Nav.Link
          className={`${active === "/register-user" && "active"}`}
          href="/register-user"
        >
          Register as User
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`${active === "/register-hotel" && "active"}`}
          href="/register-hotel"
        >
          Register as Provider
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Register;
