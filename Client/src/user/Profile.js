import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeaderUser";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <>
      <div
        className="container-fuild p-5 bg-light"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <ProfileHeader />
      </div>
      <div className="container-fuild p-4">
        <ProfileNav />
      </div>
      <div className="container d-flex align-items-center flex-column justify-content-center">
        <Form className="w-75">
          <Row className="p-5 m-3">
            <Col>
              <Form.Control
                placeholder="First Name"
                defaultValue={user.firstName}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last Name"
                defaultValue={user.lastName}
              />
            </Col>
          </Row>
          <Row className="p-5 m-3">
            <Col>
              <Form.Control placeholder="Email" defaultValue={user.email} />
            </Col>
            <Col>
              <Form.Control placeholder="Phone" defaultValue={user.phone} />
            </Col>
          </Row>
          <Row className="p-5 m-3">
            <Button type="submit" style={{ backgroundColor: "#3f51b5" }}>
              Save changes
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Profile;
