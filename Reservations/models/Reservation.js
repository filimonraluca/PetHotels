const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  reservationStartDate: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        const date = new Date();
        date.setHours(date.getHours() + 3);
        if (value < date) {
          return false;
        }
        return true;
      },
      message: "Reservation date is invalid.",
    },
  },
  reservationEndDate: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        const date = new Date();
        date.setHours(date.getHours() + 3);
        if (value < date) {
          return false;
        }
        return true;
      },
      message: "Reservation date is invalid.",
    },
  },
  numberOfNights: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  onlinePayment: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
