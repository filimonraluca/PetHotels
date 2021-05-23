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

// async function createReservation(payload) {
//   const {
//     email,
//     userFirstName,
//     userLastName,
//     reservationDate,
//     phoneNumber,
//     numberOfSeats,
//     restaurantId,
//     token,
//   } = payload;

//   const reservationData = {
//     email,
//     userFirstName,
//     userLastName,
//     reservationDate,
//     phoneNumber,
//     numberOfSeats,
//     restaurantId,
//     token,
//   };

//   let reservation;
//   let okToken = true;
//   if (payload.token) {
//     const bearer = `Bearer ${token}`;
//     fetch("https://ip-accounts.herokuapp.com/api/users/auth", {
//       method: "GET",
//       headers: {
//         Authorization: bearer,
//       },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((response) => {
//         if (response.success) {
//           reservationData.guest = false;
//           reservationData.userId = response.data.user[0]._id;
//           reservation = new this.db.Reservation(reservationData);
//         } else {
//           okToken = false;
//         }
//       })
//       .catch((error) => {
//         Logger.error(error);
//       });
//   } else {
//     reservation = new this.db.Reservation(reservationData);
//   }

//   try {
//     const existsReservation = await this.db.Reservation.findByData(
//       email,
//       reservationDate
//     );

//     const existsEmptySeats = await this.checkSeatsAvailability(reservationData);

//     const restaurantOpen = await this.checkRestaurantAvailability(
//       reservationData
//     );

//     if (!restaurantOpen) {
//       throw new Error(
//         "This restaurant is not open for the time of your reservation."
//       );
//     }

//     if (!existsEmptySeats) {
//       throw new Error(
//         "This restaurant doesn't have enough empty seats for your reservation."
//       );
//     }
//     if (!okToken) {
//       throw new Error("The user is not logged in.");
//     }

//     if (!existsReservation && existsEmptySeats) {
//       await reservation.save();
//       await this.sendReservationMail(reservationData);
//     }

//     if (payload.token) {
//       fetch("https://ip-accounts.herokuapp.com/api/clients/addReservation", {
//         method: "POST",
//         body: {
//           clientId: reservation.userId,
//           providerId: reservation.idReservation,
//           reservationId: reservation._id,
//         },
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .catch((error) => {
//           Logger.error(error);
//         });
//     }

//     return { success: true, data: { reservation } };
//   } catch (error) {
//     Logger.error(error);
//     return {
//       success: false,
//       error: { message: error.message },
//     };
//   }
// }

// async function findByRestaurant(restaurantId) {
//   try {
//     const reservations = await this.db.Reservation.find({
//       restaurantId,
//     });

//     return { success: true, data: { reservations } };
//   } catch (error) {
//     return {
//       success: false,
//       error: { message: error.message },
//     };
//   }
// }

// async function update(idReservation, payload) {
//   try {
//     const reservation = await this.db.Reservation.updateOne(
//       { _id: idReservation },
//       payload
//     );

//     return { success: true, data: { reservation } };
//   } catch (error) {
//     Logger.error(error);
//     return {
//       success: false,
//       error: { message: error.message },
//     };
//   }
// }

// async function deleteAll() {
//   try {
//     const reservation = await this.db.Reservation.deleteMany({});

//     return { success: true, data: { reservation } };
//   } catch (error) {
//     Logger.error(error);
//     return {
//       success: false,
//       error: { message: error.message },
//     };
//   }
// }

// async function deleteReservation(idReservation) {
//   try {
//     const reservation = await this.db.Reservation.deleteOne({
//       _id: idReservation,
//     });

//     return { success: true, data: { reservation } };
//   } catch (error) {
//     Logger.error(error);
//     return {
//       success: false,
//       error: { message: error.message },
//     };
//   }
// }

module.exports = { getAllReservations, getReservation };
