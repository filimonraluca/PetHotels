async function getReservationsByUser(userId, token) {
  return fetch(
    `${process.env.REACT_APP_RESERVATION_API}/reservation/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => data.json());
}
async function getReservationsByHotel(hotelId, token) {
  return fetch(
    `${process.env.REACT_APP_RESERVATION_API}/reservation/hotel/${hotelId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => data.json());
}

async function createReservation(body, token) {
  return fetch(`${process.env.REACT_APP_RESERVATION_API}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  }).then((data) => data.json());
}

async function deleteReservation(reservationId, token) {
  return fetch(
    `${process.env.REACT_APP_RESERVATION_API}/reservation/${reservationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => error);
}
export {
  getReservationsByUser,
  getReservationsByHotel,
  createReservation,
  deleteReservation,
};
