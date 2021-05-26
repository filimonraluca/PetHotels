import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import { toast } from "react-toastify";
import { loginHotel, registerUser } from "../actions/auth";
import { useDispatch } from "react-redux";

const Register = ({ history }) => {
  let [password, setPassword] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
  };
  const handleSubmit = async (e) => {
    if (email === undefined) email = "";
    e.preventDefault();
    const data = await registerUser({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("Register successfully");
      toast.success("You can log in now!");
      dispatch({
        type: "SIGN_IN_USER",
        payload: data,
      });
      history.push("/login");
    }
  };
  const dispatch = useDispatch();
  const fieldStyle = { margin: "10px" };
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#3f51b5" }}>
              <PetsIcon />
            </Avatar>
            <h2>Sign in</h2>
          </Grid>
          <form>
            <div>
              <TextField
                style={fieldStyle}
                onChange={(e) => setEmail(e.target.value)}
                label="E-mail"
                placeholder="Enter e-mail"
                required
              />
              <TextField
                style={fieldStyle}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter password"
                type="password"
                required
              />
            </div>
            <div>
              <TextField
                style={fieldStyle}
                onChange={(e) => setFirstName(e.target.value)}
                label="First name"
                placeholder="Enter first name"
              />
              <TextField
                style={fieldStyle}
                onChange={(e) => setLastName(e.target.value)}
                label="Last name"
                placeholder="Enter last name"
              />
            </div>
            <TextField
              style={fieldStyle}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
              placeholder="Enter phone number"
            />
          </form>
          <Button
            type="submit"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            style={{ margin: "30px 0" }}
            fullWidth
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
