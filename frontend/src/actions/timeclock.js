import {
  GET_TIMECLOCK,
  TIMECLOCK_LOADING,
  SUCCESS,
  RESET_TIMECLOCK,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const getTimeclock = (pin, site) => (dispatch, getState) => {
  dispatch({
    type: TIMECLOCK_LOADING,
  });
  axios
    .get(`/timeclock/?pin=${pin}&site=${site}`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
      });
      dispatch({
        type: GET_TIMECLOCK,
        payload: res.data,
      });
    })
    .catch((err) => toast.error("Incorrect PIN"));
};

export const resetTimeclock = () => (dispatch, getState) => {
  dispatch({
    type: RESET_TIMECLOCK,
  });
};
