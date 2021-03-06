import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import { registerHotel } from "../actions/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const HotelSpecificInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  async function handleClick(values) {
    const {
      password,
      email,
      hotelName,
      hotelDescription,
      city,
      address,
      phone,
      rooms,
      pricePerNight,
    } = values;
    const data = await registerHotel({
      password,
      email,
      hotelName,
      hotelDescription,
      city,
      address,
      phone,
      rooms,
      pricePerNight,
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
      history.push("/login-hotel");
    }
  }

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const paperStyle = {
    padding: 20,
    margin: "20px auto",
  };
  const fieldStyle = { padding: "20px" };
  const { values, handleChange } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#7c3fb5" }}>
            <PetsIcon />
          </Avatar>
          <h2>Register as provider</h2>
        </Grid>
        <form>
          <div>
            <TextField
              style={fieldStyle}
              onChange={handleChange("city")}
              label="city"
              placeholder="Enter city"
              required
              defaultValue={values.city}
            />
            <TextField
              style={fieldStyle}
              onChange={handleChange("address")}
              label="address"
              placeholder="Enter address"
              type="address"
              required
              defaultValue={values.address}
            />
          </div>
          <div>
            <TextField
              style={{ padding: "20px" }}
              onChange={handleChange("phone")}
              label="phone"
              placeholder="Enter phone"
              required
              defaultValue={values.phone}
            />
            <TextField
              style={{ padding: "20px" }}
              onChange={handleChange("rooms")}
              label="Rooms"
              placeholder="Enter number of rooms"
              required
              defaultValue={values.rooms}
            />
          </div>
          <TextField
            style={{ padding: "20px" }}
            onChange={handleChange("pricePerNight")}
            label="Price for one night"
            placeholder="Enter for one night"
            required
            defaultValue={values.pricePerNight}
          />
        </form>
        <Button
          style={{ float: "right", margin: "20px", marginTop: "auto" }}
          label="Continue"
          color="primary"
          variant="contained"
          onClick={() => handleClick(props.values)}
        >
          Sign in
        </Button>
        <Button
          style={{ float: "right", margin: "20px", marginTop: "auto" }}
          label="Previously"
          color="primary"
          variant="contained"
          onClick={back}
        >
          Go back
        </Button>
      </Paper>
    </Grid>
  );
};
export default HotelSpecificInfo;
