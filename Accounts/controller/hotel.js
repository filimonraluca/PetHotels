const Hotel = require('../model/Hotel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation/hotel')

async function registerHotel(req, res) {
    const { error } = registerValidation(req.body)
    if (error != null)
        return { success: false, data: { "message": error.details[0].message } }
    try {
            let hotel = await Hotel.findOne({ email: req.body.email })
            if (hotel)
                return { success: false, data: { "message": "You already have an account!" } }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const newHotel = new Hotel({
                password: hashPassword,
                email: req.body.email,
                hotelName: req.body.hotelName,
                hotelDescription: req.body.hotelDescription,
                city: req.body.city,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                rooms: req.body.rooms,
                pricePerNight: req.body.pricePerNight
            })
            hotel = await Hotel.create(newHotel)
            return { success: true, data: { hotel } }
        } catch (err) {
        return { success: false, data: { err } }
    }
}

async function loginHotel(req, res) {
    const { error } = loginValidation(req.body)
    if (error != null)
        return { success: false, data: { "message": error.details[0].message } }
    try {
        let hotel = await Hotel.findOne({ email: req.body.email })
        if (!hotel)
            return { success: false, data: { "message": "Email does not exists" } }

        //verify password
        const validPass = await bcrypt.compare(req.body.password, hotel.password);
        if (!validPass) return { success: false, data: { "message": "Invalid password" } }

        //create token
        const token = jwt.sign({ _id: hotel._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token)
        return { success: true, data: { hotel,token } }

    } catch (err) {
        return { success: false, data: { err } }
    }
}

async function getHotels(req, res) {
    try {
        let hotels = await Hotel.find();
        return { success: true, data: hotels}
    } catch (err) {
        return { success: false, data: { err } }
    }
}

async function getHotelById(req, res) {
    try {
        let hotel = await Hotel.findById(req.params.hotelId);
        return { success: true, data: hotel }
    } catch (err) {
        return { success: false, data: { err } }
    }
}

module.exports = { registerHotel, loginHotel, getHotels, getHotelById }