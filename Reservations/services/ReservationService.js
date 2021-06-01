const Reservation = require("../models/Reservation");

async function getAllReservations() {
  try {
    const reservations = await Reservation.find({});

    return { success: true, data: { reservations } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function getReservation(idReservation) {
  try {
    const reservations = await Reservation.find({
      _id: idReservation,
    });

    return { success: true, data: { reservations } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function getReservationByUser(idUser) {
  try {
    const reservations = await Reservation.find({
      userId: idUser,
    });

    return { success: true, data: { reservations } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function getReservationByHotel(idHotel) {
  try {
    const reservations = await Reservation.find({
      hotelId: idHotel,
    });

    return { success: true, data: { reservations } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function createReservation(payload) {
  const {
    userId,
    hotelId,
    hotelPrice,
    reservationStartDate,
    reservationEndDate,
    onlinePayment,
    payed,
  } = payload;

  const numberOfNights = Math.ceil(
    (new Date(reservationEndDate).getTime() -
      new Date(reservationStartDate).getTime()) /
      (1000 * 3600 * 24)
  );

  const totalPrice = numberOfNights * hotelPrice;

  const reservationData = {
    userId,
    hotelId,
    reservationStartDate,
    reservationEndDate,
    onlinePayment,
    numberOfNights,
    totalPrice,
    payed,
  };

  try {
    const reservation = new Reservation(reservationData);
    await reservation.save();
    return { success: true, data: { reservation } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function updateReservation(idReservation, payload) {
  try {
    const reservation = await Reservation.updateOne(
      { _id: idReservation },
      payload
    );

    return { success: true, data: { reservation } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

async function deleteReservation(idReservation) {
  try {
    const reservation = await Reservation.deleteOne({
      _id: idReservation,
    });

    return { success: true, data: { reservation } };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
}

module.exports = {
  getAllReservations,
  getReservation,
  getReservationByUser,
  getReservationByHotel,
  createReservation,
  updateReservation,
  deleteReservation,
};
