let hotelState;

if (localStorage.getItem("clicked-hotel") !== "undefined") {
  hotelState = JSON.parse(localStorage.getItem("clicked-hotel"));
} else {
  hotelState = null;
}

const hotelReducer = (state = hotelState, action) => {
  switch (action.type) {
    case "CLICKED_HOTEL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default hotelReducer;
