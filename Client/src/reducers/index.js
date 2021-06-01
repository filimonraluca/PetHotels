import { combineReducers } from "redux";
import authReducer from "./auth";
import hotelReducer from "./hotel";
import reservationReducer from "./reservation";

const rootReducer = combineReducers({
  auth: authReducer,
  hotel: hotelReducer,
  reservation: reservationReducer,
});

export default rootReducer;
