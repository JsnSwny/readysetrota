import axios from "axios";

import { GET_LEAVE, ADD_LEAVE, DELETE_LEAVE } from "./types";

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

export const addLeave = (obj) => (dispatch, getState) => {
  axios
    .post("/api/leave/", obj, tokenConfig(getState))
    .then((res) => {
      console.log("SUCCESSFUL");
      dispatch({
        type: ADD_LEAVE,
        payload: res.data,
      });
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

// export const getLeave = (startDate, endDate) => (dispatch, getState) => {
//   axios
//     .get(
//       `/api/forecast/?site__id=${
//         getState().employees.current.site.id
//       }&date_after=${startDate}&date_before=${endDate}&ordering=date`,
//       tokenConfig(getState)
//     )
//     .then((res) => {
//       dispatch({
//         type: GET_FORECAST,
//         payload: res.data,
//       });
//     });
// };
