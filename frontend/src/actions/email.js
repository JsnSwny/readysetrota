import { SEND_MESSAGE } from "./types";

// Get Bookings
export const sendMessage = (obj) => (dispatch, getState) => {
  axios
    .post(`sendmessage/`, obj)
    .then((res) => {})
    .catch((err) => console.log(err.response));
};
