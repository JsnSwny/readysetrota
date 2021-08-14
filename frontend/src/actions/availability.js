import axios from "axios";

import { GET_LEAVE, ADD_LEAVE, DELETE_LEAVE, UPDATE_LEAVE } from "./types";

import { getErrors, resetErrors } from "./errors";
import { loadUser } from "./auth";

import { format, addDays, parseISO } from "date-fns";

import { tokenConfig } from "./auth";

export const getUserLeave = (employee_id) => (dispatch, getState) => {
  let current = getState().employees.current;
  axios
    .get(
      `/api/leave/?site__id=${current.site.id}&employee__id=${employee_id}&ordering=-created_at`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_LEAVE,
        payload: res.data,
      });
    });
};

export const getLeave = (start_date, end_date) => (dispatch, getState) => {
  let current = getState().employees.current;
  axios
    .get(
      `/api/leave/?site__id=${current.site.id}&start_date__lte=${end_date}&end_date__gte${start_date}&ordering=-created_at`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_LEAVE,
        payload: res.data,
      });
    });
};

export const addLeave = (obj) => (dispatch, getState) => {
  axios
    .post("/api/leave/", obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_LEAVE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const updateLeave = (id, obj) => (dispatch, getState) => {
  axios
    .put(`/api/leave/${id}/`, obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_LEAVE,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch((err) => console.log(err.response));
};

export const deleteLeave = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leave/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_LEAVE,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
