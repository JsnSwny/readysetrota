import axios from "axios";

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  GET_POSITIONS,
  GET_DEPARTMENTS,
  ADD_POSITION,
  DELETE_EMPLOYEE,
} from "./types";

export const getEmployees = () => (dispatch) => {
  axios.get(`/api/employees/`).then((res) => {
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  });
};

// Add Employee
export const deleteEmployee = (id) => (dispatch) => {
  axios
    .delete(`/api/employees/${id}/`)
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
export const addEmployee = (employee) => (dispatch) => {
  axios.post("/api/employees/", employee).then((res) => {
    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data,
    });
  });
};
// Get Positions(
export const getPositions = () => (dispatch) => {
  axios.get("/api/positions/").then((res) => {
    dispatch({
      type: GET_POSITIONS,
      payload: res.data,
    });
  });
};

// Add Employee
export const addPosition = (position) => (dispatch) => {
  axios.post("/api/positions/", position).then((res) => {
    dispatch({
      type: ADD_POSITION,
      payload: res.data,
    });
  });
};

// Get Department
export const getDepartments = () => (dispatch) => {
  axios.get("/api/departments/").then((res) => {
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  });
};
