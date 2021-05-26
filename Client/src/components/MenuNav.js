import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PetsIcon from "@material-ui/icons/Pets";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MenuNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("auth-token");
    history.push("/login");
  };

  return (
    <Navbar
      className="justify-content-between"
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "#3f51b5" }}
    >
      <Navbar.Brand style={{ color: "white" }}>
        <PetsIcon fontSize="large" /> PetHotels
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar" />
      <Navbar.Collapse id="basic-navbar">
        <Nav className="ml-auto">
          <LinkContainer to="/" style={{ color: "white" }}>
            <Nav.Link>
              <i className="fas fa-home"></i> Home
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/" style={{ color: "white" }}>
            <Nav.Link>
              <i className="fas fa-envelope"></i> Contact
            </Nav.Link>
          </LinkContainer>

          {auth != null && (
            <>
              <LinkContainer to="/profile" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-user"></i> Profile
                </Nav.Link>
              </LinkContainer>
              <Nav.Item onClick={logout}>
                <Nav.Link style={{ color: "white" }}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Nav.Link>
              </Nav.Item>
            </>
          )}

          {auth == null && (
            <>
              <LinkContainer to="/login-user" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-sign-in-alt"></i> Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register-user" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-user"></i> Register
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login-hotel" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-sign-in-alt"></i> Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register-hotel" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-user"></i> Register
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuNav;
