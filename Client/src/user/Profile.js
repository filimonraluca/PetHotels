import React, { useState } from "react";
import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeaderUser";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../actions/users";

const Profile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ? user.phone : "");
  const dispatch = useDispatch();

  async function handleClick(e) {
    e.preventDefault();

    const userId = user._id;

    const data = await updateUser(
      { firstName, lastName, email, phone },
      userId,
      auth.token
    );
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("Profile updated successfully");
      console.log(data.data.doc);
      const newData = {
        user: data.data.doc,
        token: auth.token,
      };
      localStorage.setItem("auth-token", JSON.stringify(newData));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: newData,
      });
    }
  }

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
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last Name"
                defaultValue={user.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5 m-3">
            <Col>
              <Form.Control
                placeholder="Email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Phone"
                defaultValue={user.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="p-5 m-3">
            <Button
              type="submit"
              style={{ backgroundColor: "#3f51b5" }}
              onClick={handleClick}
            >
              Save changes
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Profile;
