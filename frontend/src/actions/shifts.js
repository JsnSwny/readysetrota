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
  GET_OPEN_SHIFTS,
} from "./types";
import { tokenConfig } from "./auth";
import { format } from "date-fns";
import { getErrors, resetErrors } from "./errors";

export const batchPublish = (shifts, val) => (dispatch, getState) => {
  axios
    .all(
      shifts.map((item) =>
        axios.put(`/api/shifts/${item.id}/`, { ...item, published: val })
      )
    )
    .then((responseArr) => {
      for (let i = 0; i < shifts.length; i++) {
        dispatch({
          type: UPDATE_SHIFT,
          payload: { ...responseArr[i].data, published: val },
        });
      }
    })
    .catch((err) => console.log(err.response));
};

export const batchDeleteShifts = (shifts) => (dispatch, getState) => {
  axios
    .all(shifts.map((item) => axios.delete(`/api/shifts/${item.id}/`)))
    .then((responseArr) => {
      for (let i = 0; i < shifts.length; i++) {
        dispatch({
          type: DELETE_SHIFT,
          payload: shifts[i].id,
        });
      }
    })
    .catch((err) => console.log(err.response));
};

// Get Bookings
export const getShifts = (
  startdate,
  enddate,
  list = false,
  user = false,
  id = ""
) => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios
    .get(
      `/api/shiftlist/?date_after=${startdate}&date_before=${enddate}&department=${
        getState().employees.current.department.id
      }${
        user ? `&employee__user__id=${id}` : `&employee=${id}`
      }&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_ALL_SHIFTS,
        payload: res.data,
        date: startdate,
        enddate: enddate,
        list,
      });
    })
    .catch((err) => console.log(err.response));
};

export const getOpenShifts = (startdate) => (dispatch, getState) => {
  axios
    .get(
      `/api/shiftlist/?date_after=${startdate}&department=${
        getState().employees.current.department.id
      }&open_shift=true&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_OPEN_SHIFTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const getAbsences = (startdate, site) => (dispatch, getState) => {
  axios
    .get(
      `/api/shiftlist/?date_after=${startdate}&department=${
        getState().employees.current.department.id
      }&absence__not=None&ordering=date,start_time`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_ALL_SHIFTS,
        payload: res.data,
        list: true,
      });
    })
    .catch((err) => console.log(err.response));
};

// Get Bookings
export const getShiftsByID = (id, user) => (dispatch, getState) => {
  axios
    .get(
      `/api/shiftlist/?date_after=${format(new Date(), "yyyy-MM-dd")}${
        user ? `&employee__user__id=${id}` : `&employee= ${id}`
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

    .catch((err) => {
      console.log(err.response);
    });
};

export const updateShift = (id, shift) => (dispatch, getState) => {
  console.log(shift);
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
      console.log(err.response);
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
        getState().employees.current.department.id
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
export const approveShifts = () => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios
    .get(
      `/api-view/approveshifts/?department_id=${
        getState().employees.current.department.id
      }`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PUBLISHED_SHIFTS,
        payload: res.data,
        stage: "Unpublished",
      });
    });
};

// Get Popular Times
export const sendForApproval = () => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  axios
    .get(
      `/api-view/sendforapproval/?department_id=${
        getState().employees.current.department.id
      }`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PUBLISHED_SHIFTS,
        payload: res.data,
        stage: "Approval",
      });
    });
};

// Get Popular Times
export const publish = () => (dispatch, getState) => {
  dispatch({
    type: SHIFTS_LOADING,
  });
  let user = getState().auth.user;
  axios
    .get(
      `/api-view/publish/?department_id=${
        getState().employees.current.department.id
      }&business=${user.business ? true : false}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PUBLISHED_SHIFTS,
        payload: res.data,
        stage: "Published",
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
