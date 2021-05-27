let userState;

if (localStorage.getItem("auth-token") !== "undefined") {
  userState = JSON.parse(localStorage.getItem("auth-token"));
} else {
  userState = null;
}

const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
