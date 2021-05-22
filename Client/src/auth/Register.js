import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../actions/auth";

const Register = () => {
  let [username, setUserName] = useState();
  let [password, setPassword] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: "30vw",
    margin: "20px auto",
  };
  const handleSubmit = async (e) => {
    if (username === undefined) username = "";
    e.preventDefault();
    const data = await registerUser({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
    });
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      const res = await loginUser({
        username,
        password,
      });
      console.log(res);
      toast.success("Register successfully");
      if (res.success === false) toast.error(data.data.message);
      else {
        console.log(data.data.token);
        toast.success("LoggedIn successfully");
        localStorage.setItem("auth-token", data.data.token);
      }
    }
  };
  const fieldStyle = { margin: "10px" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#3f51b5" }}>
            <PetsIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          style={fieldStyle}
          onChange={(e) => setUserName(e.target.value)}
          label="Username"
          placeholder="Enter username"
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
        <TextField
          style={fieldStyle}
          onChange={(e) => setFirstName(e.target.value)}
          label="First name"
          placeholder="Enter first name"
          required
        />
        <TextField
          style={fieldStyle}
          onChange={(e) => setLastName(e.target.value)}
          label="Last name"
          placeholder="Enter last name"
          required
        />
        <TextField
          style={fieldStyle}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Enter email"
          required
        />
        <TextField
          style={fieldStyle}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          placeholder="Enter phone number"
        />
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
  );
};

export default Register;
