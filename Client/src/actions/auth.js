async function registerUser(credentials) {
  return fetch(`${process.env.REACT_APP_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
async function loginUser(credentials) {
  return fetch(`${process.env.REACT_APP_API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
async function createUser(credentials) {
  return fetch(`${process.env.REACT_APP_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function sendToken(credentials) {
  return fetch(`${process.env.REACT_APP_API}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export { registerUser, loginUser, createUser, sendToken };
