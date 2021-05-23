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
  email: {
    type: String,
    required: true,
    min: 6,
  },
  userFirstName: {
    type: String,
    required: true,
    min: 2,
  },
  userLastName: {
    type: String,
    required: true,
    min: 2,
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 7,
    max: 10,
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
  numberOfNights: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
