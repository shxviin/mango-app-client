import { combineReducers } from "redux";
import { bookingReducer } from "./bookingReducer";

const reducers = combineReducers({
    allBookingsSelectedDates: bookingReducer,
    // contact: selectedContactReducer
});

export default reducers;