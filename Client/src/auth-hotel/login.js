import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import Header from "../components/LoginHeader";
import PetsIcon from "@material-ui/icons/Pets";
import { loginHotel } from "../actions/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const HotelLogIn = ({ history }) => {
  async function handleClick(e) {
    if (email === undefined) email = "";
    e.preventDefault();
    const data = await loginHotel({
      email,
      password,
    });
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("LoggedIn successfully");
      localStorage.setItem("auth-token", JSON.stringify(data.data));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: data.data,
      });
      history.push("/profile");
    }
  }

  let [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const paperStyle = {
    padding: 20,
    margin: "20px auto",
  };
  const fieldStyle = { padding: "20px" };
  return (
    <>
      <Header></Header>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#7c3fb5" }}>
              <PetsIcon />
            </Avatar>
            <h2>Login as provider</h2>
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
            <Button
              style={{ float: "right", margin: "20px" }}
              label="Continue"
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Log in
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
export default HotelLogIn;
