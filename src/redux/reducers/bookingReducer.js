import { ActionTypes } from "../constants/action-types";

const initialState = {
    bookings: []
}

export const bookingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_BOOKINGS:
            return { ...state, bookings: payload };
        default:
            return state;
    }
};

// export const selectedContactReducer = (state = {}, { type, payload }) => {
//     switch (type) {
//         case ActionTypes.SELECTED_CONTACT:
//             return { ...state, ...payload };
//         case ActionTypes.REMOVE_SELECTED_CONTACT:
//             return {};
//         default:
//             return state;
//     }
// };