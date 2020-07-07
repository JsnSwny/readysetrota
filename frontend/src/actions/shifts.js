import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import {
  GET_ALL_SHIFTS,
  ADD_SHIFT,
  GET_SHIFTS_BY_ID,
  SHIFTS_LOADING,
  DELETE_SHIFT,
  GET_POPULAR_TIMES,
  UPDATE_SHIFT,
  PUBLISHED_SHIFTS,
} from "./types";
import { tokenConfig } from "./auth";
import { format } from "date-fns";
import { getErrors, resetErrors } from "./errors";

// Get Bookings
export const getShifts = (startdate, enddate) => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios
    .get(
      `/api/shifts/?date_after=${startdate}&date_before=${enddate}&department=${
        getState().employees.current_department
      }&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_ALL_SHIFTS,
        payload: res.data,
        date: startdate,
        enddate: enddate,
      });
    })
    .catch();
};

// Get Bookings
export const getShiftsByID = (id) => (dispatch, getState) => {
  axios
    .get(
      `/api/shifts/?date_after=${format(
        new Date(),
        "YYY-MM-dd"
      )}&employee=${id}&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_SHIFTS_BY_ID,
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

export const updateShift = (id, shift) => (dispatch, getState) => {
  axios
    .put(`/api/shifts/${id}/`, shift, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_SHIFT,
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
    .catch((error) => {});
};

// Get Popular Times
export const getPopularTimes = () => (dispatch, getState) => {
  axios.get(`/api-view/getpopulartimes`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_POPULAR_TIMES,
      payload: res.data,
    });
  });
};

// Get Popular Times
export const publish = () => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios.get(`/api-view/publish`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: PUBLISHED_SHIFTS,
      payload: res.data,
    });
  });
};
