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

async function loginGoogle(credentials) {
  return fetch(`${process.env.REACT_APP_API}/user/login/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function registerHotel(credentials) {
  return fetch(`${process.env.REACT_APP_API}/hotel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function loginHotel(credentials) {
  return fetch(`${process.env.REACT_APP_API}/hotel/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export { registerUser, loginUser, createUser,loginGoogle, registerHotel, loginHotel };
