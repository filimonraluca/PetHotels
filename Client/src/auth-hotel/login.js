import React, { Component } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import { loginHotel } from "../actions/auth";
import { toast } from "react-toastify";
async function handleClick(values) {
  console.log(values);
  const { email, password } = values;
  const data = await loginHotel({
    email,
    password,
  });
  console.log(data);
  if (data.success === false) toast.error(data.data.message);
  else {
    toast.success("LoggedIn successfully");
    localStorage.setItem("auth-token", JSON.stringify(data.data));
  }
}
class HotelLogIn extends Component {
  state = {
    password: "",
    email: "",
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  render() {
    const paperStyle = {
      padding: 20,
      margin: "20px auto",
    };
    const fieldStyle = { padding: "20px" };
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#7c3fb5" }}>
              <PetsIcon />
            </Avatar>
            <h2>Sign in as provider</h2>
          </Grid>
          <form>
            <div>
              <TextField
                style={fieldStyle}
                onChange={this.handleChange("email")}
                label="E-mail"
                placeholder="Enter e-mail"
                required
                defaultValue={this.state.email}
              />
              <TextField
                style={fieldStyle}
                onChange={this.handleChange("password")}
                label="Password"
                placeholder="Enter password"
                type="password"
                required
                defaultValue={this.state.password}
              />
            </div>
            <Button
              style={{ float: "right", margin: "20px" }}
              label="Continue"
              color="primary"
              variant="contained"
              onClick={() => handleClick(this.state)}
            >
              Log in
            </Button>
          </form>
        </Paper>
      </Grid>
    );
  }
}
export default HotelLogIn;
