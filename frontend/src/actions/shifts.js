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
  SWAP_SHIFTS,
  GET_SWAP_REQUESTS,
} from "./types";
import { tokenConfig } from "./auth";
import { format } from "date-fns";
import { getErrors, resetErrors } from "./errors";

let test = "hello";

// Get Bookings
export const getShifts = (startdate, enddate) => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios
    .get(
      `/api/shiftlist/?date_after=${startdate}&date_before=${enddate}&department=${
        getState().employees.current.department
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
export const getShiftsByID = (id, user) => (dispatch, getState) => {
  axios
    .get(
      `/api/shiftlist/?date_after=${format(new Date(), "yyyy-MM-dd")}${
        user ? "&employee__user__id=" + id : "&employee=" + id
      }&ordering=date,start_time`,
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
        payload: { ...res.data, start_time: res.data.start_time.substr(0, 5) },
      });
      dispatch(getPopularTimes());

      dispatch(resetErrors());
    })

    .catch((err) => {});
};

export const updateShift = (id, shift) => (dispatch, getState) => {
  axios
    .put(`/api/shifts/${id}/`, shift, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_SHIFT,
        payload: { ...res.data, start_time: res.data.start_time.substr(0, 5) },
      });
      dispatch(resetErrors());
      dispatch(getPopularTimes());
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
      dispatch(getPopularTimes());
    })
    .catch((error) => {});
};

// Get Popular Times
export const getPopularTimes = () => (dispatch, getState) => {
  axios
    .get(
      `/api-view/getpopulartimes?department=${
        getState().employees.current.department
      }`,
      tokenConfig(getState)
    )
    .then((res) => {
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

// Swap Shifts
export const swapShifts = (swap) => (dispatch, getState) => {
  dispatch({
    type: SWAP_SHIFTS,
  });
  axios
    .post(`/api/shiftswap/`, swap)
    .then((res) => {})
    .catch((err) => {});
};

// Swap Shifts
export const getSwapRequests = (id) => (dispatch, getState) => {
  axios
    .get(`/api/shiftswap/?q=${id}`)
    .then((res) => {
      dispatch({
        type: GET_SWAP_REQUESTS,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const updateShiftSwap = (id, newShiftSwap) => (dispatch, getState) => {
  axios
    .put(`/api/shiftswap/${id}/`, newShiftSwap)
    .then((res) => {})

    .catch((err) => {});
};
