import { Nav } from "react-bootstrap";

const Login = () => {
  const active = window.location.pathname;
  return (
    <Nav justify variant="tabs" className="mt-2 mb-5">
      <Nav.Item>
        <Nav.Link
          className={`${active === "/login-user" && "active"}`}
          href="/login-user"
        >
          Login as User
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={`${active === "/login-hotel" && "active"}`}
          href="/login-hotel"
        >
          Login as Provider
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Login;
