import { LOAD_START, LOAD_FINISH, RESET_LOADING } from "./types";

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

export const resetLoading = () => (dispatch) => {
  dispatch({
    type: RESET_LOADING,
  });
};
