import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import {
  GET_ALL_SHIFTS,
  ADD_SHIFT,
  GET_DAILY_SHIFTS,
  GET_SHIFTS_BY_ID,
  SHIFTS_LOADING,
  DELETE_SHIFT,
} from "./types";
import { tokenConfig } from "./auth";

import { getErrors, resetErrors } from "./errors";

// Get Bookings
export const getShifts = (startdate, enddate) => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
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

// Get Bookings
export const getShiftsByID = (startdate, enddate, id) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/shifts/?date_after=${startdate}&date_before=${enddate}&employee=${id}&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_SHIFTS_BY_ID,
        payload: res.data,
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
  axios
    .post("/api/shifts/", shift, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_SHIFT,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

// Add Employee
export const deleteShift = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/shifts/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_SHIFT,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};
