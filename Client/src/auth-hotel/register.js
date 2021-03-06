import React, { Component } from "react";
import HotelGeneralInfo from "./hotelGeneralInfo";
import HotelSpecificInfo from "./hotelSpecificInfo";
import Header from "../components/RegisterHeader";

class RegisterHotel extends Component {
  state = {
    step: 1,
    password: "",
    email: "",
    hotelName: "",
    hotelDescription: "",
    city: "",
    address: "",
    phone: "",
    rooms: 0,
    pricePerNight: 0,
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
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
    } = this.state;
    const values = {
      password,
      email,
      hotelName,
      hotelDescription,
      city,
      address,
      phone,
      rooms,
      pricePerNight,
    };
    switch (step) {
      case 1:
        return (
          <>
            <Header></Header>
            <HotelGeneralInfo
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          </>
        );
      case 2:
        return (
          <>
            <Header></Header>
            <HotelSpecificInfo
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          </>
        );
      default:
        return <Header />;
    }
  }
}
export default RegisterHotel;
