const hotelReducer = (state = {}, action) => {
  switch (action.type) {
    case "CLICKED_HOTEL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default hotelReducer;
