async function getHotels(credentials) {
  return fetch(`${process.env.REACT_APP_API}/hotel`).then((data) =>
    data.json()
  );
}
export { getHotels };
