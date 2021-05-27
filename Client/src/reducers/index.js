import { combineReducers } from "redux";
import authReducer from "./auth";
import hotelReducer from "./hotel";

const rootReducer = combineReducers({
  auth: authReducer,
  hotel: hotelReducer,
});

export default rootReducer;
