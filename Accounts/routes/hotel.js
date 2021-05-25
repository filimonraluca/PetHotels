const express = require('express')
const router = express.Router()
const User = require('../model/Hotel')
const { registerHotel, loginHotel, getHotels, getHotelById } = require('../controller/hotel')
const statusCodes = require("../config/configurations").statusCodes;

router.post('/', async (req, res) => {
    const result = await registerHotel(req,res)
    const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.post('/login', async (req, res) => {
    const result = await loginHotel(req,res)
    const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.get('/', async (req, res) => {
  const result = await getHotels(req,res)
  const statusCode = result.success
  ? statusCodes.OK
  : statusCodes.BAD_REQUEST;
res.status(statusCode).json(result);
});

router.get('/:hotelId', async (req, res) =>{
  const result = await getHotelById(req,res)
  const statusCode = result.success
   ? statusCodes.OK
   : statusCodes.BAD_REQUEST;
 res.status(statusCode).json(result);
})

module.exports = router;