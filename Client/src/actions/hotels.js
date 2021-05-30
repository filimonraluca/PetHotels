async function getHotels(credentials) {
  return fetch(`${process.env.REACT_APP_API}/hotel`).then((data) =>
    data.json()
  );
}
async function updateHotel(data, id, token) {
  return fetch(`${process.env.REACT_APP_API}/hotel/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}
export { getHotels, updateHotel };
