let reservationState;

if (localStorage.getItem("current-reservation") !== "undefined") {
  reservationState = JSON.parse(localStorage.getItem("current-reservation"));
} else {
  reservationState = null;
}

const reservationReducer = (state = reservationState, action) => {
  switch (action.type) {
    case "RESERVATION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reservationReducer;
