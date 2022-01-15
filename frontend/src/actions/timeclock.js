import {
  GET_TIMECLOCK,
  TIMECLOCK_LOADING,
  SUCCESS,
  RESET_TIMECLOCK,
  GET_TIMECLOCKS,
  UPDATE_TIMECLOCK,
  ADD_TIMECLOCK,
  DELETE_TIMECLOCK,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import { tokenConfig } from "./auth";
import { format } from "date-fns";

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

// Get Bookings
export const getTimeclocks = (date) => (dispatch, getState) => {
  axios
    .get(
      `/api/timeclocks/?date=${format(date, "yyyy-MM-dd")}&department__site=${
        getState().employees.current.site.id
      }&ordering=date,clock_in`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_TIMECLOCKS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const updateTimeclock = (id, obj) => (dispatch, getState) => {
  console.log("UPDATING TIMECLOCK");
  axios
    .put(`/api/timeclocks/${id}/`, obj, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPDATE_TIMECLOCK,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err.response);
    });
};

// Add Employee
export const addTimeclock = (obj) => (dispatch, getState) => {
  axios
    .post("/api/timeclocks/", obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TIMECLOCK,
        payload: {
          ...res.data,
        },
      });
    })

    .catch((err) => {
      console.log(err.response);
    });
};

// Add Employee
export const deleteTimeclock = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/timeclocks/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_TIMECLOCK,
        payload: id,
      });
    })
    .catch((error) => {});
};
