const express = require('express')
const router = express.Router()
const User = require('../model/Hotel')
const { registerHotel, loginHotel, getHotels, getHotelById, changeHotelInfo, deleteHotel } = require('../controller/hotel')
const statusCodes = require("../config/configurations").statusCodes;
const verifyToken = require("./verifyToken");

router.post('/', async (req, res) => {
  const result = await registerHotel(req, res)
  res.json(result);
});

router.post('/login', async (req, res) => {
  const result = await loginHotel(req, res)
  const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.get('/', async (req, res) => {
  const result = await getHotels(req, res)
  const statusCode = result.success
    ? statusCodes.OK
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.get('/:hotelId', async (req, res) => {
  const result = await getHotelById(req, res)
  res.json(result);
})

router.put("/", (req, res) => {
  res.status(statusCodes.NOT_ALLOWED);
  res.json({ message: "Method Not Allowed" });
});

router.put("/:hotelId", async (req, res) => {
  const result = await changeHotelInfo(req, res);
  res.json(result);
});

router.delete("/", (req, res) => {
  res.status(statusCodes.NOT_ALLOWED);
  res.json({ message: "Method Not Allowed" });
});

router.delete("/:hotelId", async (req, res) => {
  const result = await deleteHotel(req, res);
  res.json(result);
});


module.exports = router;