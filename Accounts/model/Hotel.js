const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        min: 6
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelDescription: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    phone: {
        type: String,
        required: true
    },
    rooms:{
        type:Number,
        required: true
    },
    pricePerNight:{
        type:Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)