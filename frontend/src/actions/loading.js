import { LOAD_START, LOAD_FINISH } from "./types";

// Get Bookings
export const loadStart = () => (dispatch) => {
  dispatch({
    type: LOAD_START,
  });
};
// Get Bookings
export const loadFinish = () => (dispatch) => {
  dispatch({
    type: LOAD_FINISH,
  });
};
