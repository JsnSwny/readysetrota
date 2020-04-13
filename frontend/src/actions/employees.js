import axios from "axios";

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  GET_POSITIONS,
  GET_DEPARTMENTS,
  ADD_POSITION,
  DELETE_EMPLOYEE,
  ADD_DEPARTMENT,
} from "./types";

import { getErrors, resetErrors } from "./errors";

import { tokenConfig } from "./auth";

export const getEmployees = () => (dispatch, getState) => {
  axios.get(`/api/employees/`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  });
};

// Add Employee
export const deleteEmployee = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/employees/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

// Add Employee
export const addEmployee = (employee) => (dispatch, getState) => {
  axios
    .post("/api/employees/", employee, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
      });
      dispatch(resetErrors());
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};
// Get Positions(
export const getPositions = () => (dispatch, getState) => {
  axios.get("/api/positions/", tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_POSITIONS,
      payload: res.data,
    });
  });
};

// Add Employee
export const addPosition = (position) => (dispatch, getState) => {
  axios
    .post("/api/positions/", position, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_POSITION,
        payload: res.data,
      });
      dispatch(resetErrors());
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};
// Add Employee
export const addDepartment = (department) => (dispatch, getState) => {
  axios
    .post("/api/departments/", department, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.data,
      });
      dispatch(resetErrors());
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

// Get Department
export const getDepartments = () => (dispatch, getState) => {
  axios.get("/api/departments/", tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  });
};

// Get Department
export const checkUUID = (uuid, userid) => (dispatch, getState) => {
  axios
    .get("/api-view/checkuuid", {
      params: {
        uuid,
        userid,
      },
    })
    .then((res) => {
      console.log(res.data);
      // dispatch({
      //   type: GET_DEPARTMENTS,
      //   payload: res.data,
      // });
    })
    .catch((err) => console.log(err.response));
};
