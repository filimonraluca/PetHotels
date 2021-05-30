async function getReservations() {
  return fetch(`${process.env.REACT_APP_RESERVATION_API}/reservation`).then(
    (data) => data.json()
  );
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
export { getReservations, createReservation };
