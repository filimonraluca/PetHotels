async function getUserById(userId) {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}`).then((data) =>
    data.json()
  );
}

async function updateUser(data, id, token) {
  return fetch(`${process.env.REACT_APP_API}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}
export { getUserById, updateUser };
