import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import { GET_ALL_SHIFTS, ADD_SHIFT, GET_DAILY_SHIFTS } from "./types";
import { tokenConfig } from "./auth";

// Get Bookings
export const getShifts = (startdate, enddate) => (dispatch, getState) => {
  axios
    .get(
      `/api/shifts/?date_after=${startdate}&date_before=${enddate}&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_ALL_SHIFTS,
        payload: res.data,
        date: startdate,
        enddate: enddate,
      });
    });
};
export const getDailyShifts = (date) => (dispatch, getState) => {
  axios
    .get(
      `/api/shifts/?date_after=${date}&date_before=${date}&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_DAILY_SHIFTS,
        payload: res.data,
      });
    });
};

// Add Employee
export const addShift = (shift) => (dispatch, getState) => {
  console.log(shift);
  axios
    .post("/api/shifts/", shift, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_SHIFT,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};
