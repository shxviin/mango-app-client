import { ActionTypes } from "../constants/action-types";

export const setBookingsAction = (bookings) => {
    return {
        type: ActionTypes.SET_BOOKINGS,
        payload: bookings
    };
};

// export const selectContact = (contact) => {
//     return {
//         type: ActionTypes.SELECTED_CONTACT,
//         payload: contact
//     };
// };

// export const removeSelectContact = () => {
//     return {
//         type: ActionTypes.REMOVE_SELECTED_CONTACT,
//     };
// };