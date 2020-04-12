import { SET_WIDTH } from "./types";

// Get Bookings
export const setWidth = (width) => (dispatch) => {
  dispatch({
    type: SET_WIDTH,
    width: width,
  });
};
