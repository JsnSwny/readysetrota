import axios from "axios";

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  GET_POSITIONS,
  GET_DEPARTMENTS,
  ADD_POSITION,
  DELETE_EMPLOYEE,
  ADD_DEPARTMENT,
  DELETE_POSITION,
  SET_DEPARTMENT,
} from "./types";

import { getErrors, resetErrors } from "./errors";

import { tokenConfig } from "./auth";

export const getEmployees = () => (dispatch, getState) => {
  axios
    .get(
      `/api/employees/?position__department=${
        getState().employees.current_department
      }&ordering=name`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      });
    });
};

export const setDepartment = (id) => (dispatch) => {
  dispatch({
    type: SET_DEPARTMENT,
    payload: id,
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
    .catch((error) => {});
};

// Add Employee
export const addEmployee = (employee) => (dispatch, getState) => {
  axios
    .post("/api/employees/", employee, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
        current_dep: getState().employees.current_department,
      });
      dispatch(resetErrors());
    })
    .catch((err) => {});
};
// Get Positions
export const getPositions = (all = false) => (dispatch, getState) => {
  axios
    .get(
      `/api/positions/${
        all ? `?department=${getState().employees.current_department}` : ""
      }`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_POSITIONS,
        payload: res.data,
      });
    });
};

// Delete Position
export const deletePosition = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/positions/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_POSITION,
        payload: id,
      });
    })
    .catch((error) => {});
};

// Add Employee
export const addPosition = (position) => (dispatch, getState) => {
  position.department_id = getState().employees.current_department;
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
      // dispatch({
      //   type: GET_DEPARTMENTS,
      //   payload: res.data,
      // });
    });
};
