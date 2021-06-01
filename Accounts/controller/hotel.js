const Hotel = require("../model/Hotel");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("./validation/hotel");
const statusCodes = require("../config/configurations").statusCodes;
var ObjectId = require("mongoose").Types.ObjectId;

async function getLatLong(address) {
  console.log(address);
  let response;
  address = encodeURI(address);
  await fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=AIzaSyB41hll-FBYVUbwlkrlwGMJhfZy5O_vhg8"
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      if (res.error_message)
        response = { success: false, data: res.error_message };
      else {
        response = { success: true, data: res.results[0].geometry.location };
      }
    })
    .catch((error) => {
      console.log(error);
      response = { success: false, data: error.error_message };
    });
  return response;
}

async function registerHotel(req, res) {
  const { error } = registerValidation(req.body);
  if (error != null) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { message: error.details[0].message } };
  }
  try {
    let hotel = await Hotel.findOne({ email: req.body.email });
    if (hotel) {
      res.status(statusCodes.CONFLICT);
      return {
        success: false,
        data: { message: "You already have an account!" },
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const latLongResponse = await getLatLong(
      req.body.address.concat(",", req.body.city)
    );
    const newHotel = new Hotel({
      password: hashPassword,
      email: req.body.email,
      hotelName: req.body.hotelName,
      hotelDescription: req.body.hotelDescription,
      city: req.body.city,
      address: req.body.address,
      phone: req.body.phone,
      rooms: req.body.rooms,
      pricePerNight: req.body.pricePerNight,
      lat: latLongResponse.data.lat,
      lon: latLongResponse.data.lng,
    });
    hotel = await Hotel.create(newHotel);
    res.status(statusCodes.CREATED);
    return { success: true, data: { hotel } };
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { err } };
  }
}

async function loginHotel(req, res) {
  const { error } = loginValidation(req.body);
  if (error != null)
    return { success: false, data: { message: error.details[0].message } };
  try {
    let hotel = await Hotel.findOne({ email: req.body.email });
    if (!hotel)
      return { success: false, data: { message: "Email does not exists" } };

    //verify password
    const validPass = await bcrypt.compare(req.body.password, hotel.password);
    if (!validPass)
      return { success: false, data: { message: "Invalid password" } };

    //create token
    const token = jwt.sign({ _id: hotel._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    return { success: true, data: { hotel, token } };
  } catch (err) {
    return { success: false, data: { err } };
  }
}

async function getHotels(req, res) {
  try {
    let hotels = await Hotel.find();
    return { success: true, data: hotels };
  } catch (err) {
    return { success: false, data: { err } };
  }
}

async function getHotelById(req, res) {
  try {
    let hotel = await Hotel.findById(req.params.hotelId);
    if (hotel) {
      res.status(statusCodes.OK);
      return { success: true, data: hotel };
    } else {
      res.status(statusCodes.NOT_FOUND);
      return { success: false, data: "Hotel not found!" };
    }
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { err } };
  }
}

async function changeHotelInfo(req, res) {
  const result = await getHotelById(req, res);
  console.log(result);
  if (result.success) {
    const hotel = result.data;
    if (
      req.body.email &&
      req.body.hotelName &&
      req.body.hotelDescription &&
      req.body.city &&
      req.body.address &&
      req.body.phone &&
      req.body.rooms &&
      req.body.pricePerNight
    ) {
      // try {
      let doc = await Hotel.findOneAndUpdate(
        { _id: new ObjectId(req.params.hotelId) },
        req.body,
        {
          new: true,
        }
      );
      res.status(statusCodes.OK);
      return { success: true, data: { doc } };
      // } catch (err) {
      //     res.status(statusCodes.BAD_REQUEST);
      //     return { success: false, data: { err } };
      // }
    } else {
      res.status(statusCodes.NOT_ALLOWED);
      return { success: false, data: { message: "Method not allowed" } };
    }
  } else return { success: false, data: { message: "User not found" } };
}

async function deleteHotel(req, res) {
  const result = await getHotelById(req, res);
  console.log(result);
  if (result.success) {
    console.log("HERE");
    try {
      const del_res = await Hotel.deleteOne({
        _id: new ObjectId(req.params.hotelId),
      });
      res.status(statusCodes.OK);
      return {
        success: true,
        data: { message: "Successfully deleted account!" },
      };
    } catch (err) {
      res.status(statusCodes.NOT_FOUND);
      return { success: false, data: { err } };
    }
  } else return result;
}

module.exports = {
  registerHotel,
  loginHotel,
  getHotels,
  getHotelById,
  changeHotelInfo,
  deleteHotel,
};
