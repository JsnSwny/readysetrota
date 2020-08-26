import axios from "axios";

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  GET_POSITIONS,
  GET_ALL_POSITIONS,
  GET_DEPARTMENTS,
  ADD_POSITION,
  DELETE_EMPLOYEE,
  ADD_DEPARTMENT,
  DELETE_POSITION,
  DELETE_DEPARTMENT,
  SET_DEPARTMENT,
  UUID_SUCCESS,
  UUID_RESET,
  UPDATE_DEPARTMENT,
  UPDATE_POSITION,
  UPDATE_EMPLOYEE,
  UPDATE_BUSINESS,
  GET_AVAILABILITY,
  ADD_AVAILABILITY,
  UPDATE_AVAILABILITY,
  DELETE_AVAILABILITY,
  GET_HOLIDAYS,
} from "./types";

import { getErrors, resetErrors } from "./errors";
import { loadUser } from "./auth";

import { format } from "date-fns";

import { tokenConfig } from "./auth";

export const updateBusinessName = (id, name) => (dispatch, getState) => {
  axios
    .put(`/api/business/${id}/`, name, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_BUSINESS,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch((err) => {
      console.log(err.response);
    });
};

export const getEmployees = () => (dispatch, getState) => {
  axios
    .get(
      `/api/employeelist/?position__department=${
        getState().employees.current_department
      }&ordering=first_name`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      });
    })
    .catch();
};

export const setDepartment = (id) => (dispatch) => {
  dispatch({
    type: SET_DEPARTMENT,
    payload: id,
  });
  dispatch(getEmployees());
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

export const updateEmployee = (id, employee) => (dispatch, getState) => {
  axios
    .put(`/api/employees/${id}/`, employee, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch();
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
    .catch();
};
// Get Positions
export const getPositions = (all = false) => (dispatch, getState) => {
  let currentBusiness = getState().employees.current_business;
  if (all && !currentBusiness) {
    return false;
  }
  axios
    .get(
      `/api/positions/${
        all
          ? `?department__business=${currentBusiness}`
          : `?department=${getState().employees.current_department}`
      }`,
      tokenConfig(getState)
    )
    .then((res) => {
      if (all) {
        dispatch({
          type: GET_ALL_POSITIONS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_POSITIONS,
          payload: res.data,
        });
      }
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
      dispatch(getEmployees());
    })
    .catch((error) => {});
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
      console.log(err.response);
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

export const updatePosition = (id, position) => (dispatch, getState) => {
  axios
    .put(`/api/positions/${id}/`, position, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_POSITION,
        payload: res.data,
      });
      dispatch(resetErrors());
      dispatch(getEmployees());
    })

    .catch();
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
      console.log(err.response);
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

export const updateDepartment = (id, department) => (dispatch, getState) => {
  axios
    .put(`/api/departments/${id}/`, department, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_DEPARTMENT,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch((err) => console.log(err.response));
};

// Delete Position
export const deleteDepartment = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/departments/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_DEPARTMENT,
        payload: id,
      });
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
    })
    .catch((error) => {});
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
      if (res.data.error) {
        dispatch(getErrors({ uuid: res.data.error[0] }));
      } else {
        dispatch({
          type: UUID_SUCCESS,
          payload: res.data.department_id,
        });
        dispatch(loadUser());
        axios.get("/api/departments/", tokenConfig(getState)).then((res) => {
          dispatch({
            type: GET_DEPARTMENTS,
            payload: res.data,
          });
        });
      }
    })
    .catch();
};

// Get Department
export const uuidReset = () => (dispatch, getState) => {
  dispatch({
    type: UUID_RESET,
  });
};

// Get Department
export const getAvailability = (employee, business) => (dispatch, getState) => {
  axios
    .get(
      `/api/availability/?employee__id=${employee}&business=${business}&ordering=date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_AVAILABILITY,
        payload: res.data,
      });
    });
};

export const getAllAvailability = (business, startdate, enddate) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/availability/?employee__business=${business}&date_after=${startdate}&date_before=${enddate}&ordering=date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_AVAILABILITY,
        payload: res.data,
      });
    });
};

export const getHolidays = (business, user = false) => (dispatch, getState) => {
  axios
    .get(
      `/api/availability/${
        user ? `?employee__user=${user}` : `?employee__business=${business}`
      }&date_after=${format(
        new Date(),
        "YYY-MM-dd"
      )}&name=holiday&ordering=date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_HOLIDAYS,
        payload: res.data,
      });
    });
};

export const addAvailability = (obj) => (dispatch, getState) => {
  axios
    .post("/api/availability/", obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_AVAILABILITY,
        payload: res.data,
      });
      dispatch(resetErrors());
    })
    .catch((err) => console.log(err.response));
};

// Delete Position
export const deleteAvailability = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/availability/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_AVAILABILITY,
        payload: id,
      });
    })
    .catch((error) => {});
};

export const updateAvailability = (id, obj) => (dispatch, getState) => {
  axios
    .put(`/api/availability/${id}/`, obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_AVAILABILITY,
        payload: res.data,
      });
      dispatch(resetErrors());
    })

    .catch((err) => console.log(err.response));
};
