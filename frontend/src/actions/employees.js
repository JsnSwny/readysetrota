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
  SET_BUSINESS,
  GET_SITES,
  ADD_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  SET_SITE,
} from "./types";

import { getErrors, resetErrors } from "./errors";
import { loadUser } from "./auth";

import { format } from "date-fns";

import { tokenConfig } from "./auth";

export const getSites = () => (dispatch, getState) => {
  let current_site = getState().employees.current.site
  let current_department = getState().employees.current.department
  let user = getState().auth.user

  axios.get(`/api/sites/?current_department=${current_department}&current_site=${current_site}`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_SITES,
      payload: res.data,
      user: user
    });
    dispatch({
      type: SET_BUSINESS,
      payload: res.data.length > 0 ? res.data[0].business : 0,
    });
    dispatch({
      type: UUID_RESET,
    });
  });
};

export const addSite = (site) => (dispatch, getState) => {
  axios
    .post("/api/sites/", site, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_SITE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const updateSite = (id, site) => (dispatch, getState) => {
  axios
    .put(`/api/sites/${id}/`, site, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_SITE,
        payload: res.data,
      });
    })

    .catch((err) => console.log(err.response));
};

export const deleteSite = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/sites/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_SITE,
        payload: id,
      });
      dispatch(getSites())
    })
    .catch((error) => {console.log(error)});
};

export const setSite = (id) => (dispatch, getState) => {
  let isLoading = Object.keys(getState().loading).some(k => getState().loading[k]);
  let user = getState().auth.user
  if(isLoading) {
    return false;
  }

  dispatch({
    type: SET_SITE,
    payload: id,
    user: user
  });
};

export const updateBusinessName = (id, name) => (dispatch, getState) => {
  axios
    .put(`/api/business/${id}/`, name, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_BUSINESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err.response);
    });
};

export const getEmployees = () => (dispatch, getState) => {
  let current = getState().employees.current;
  let site_admin = getState().employees.site_admin;
  let query = '';

  if(current.site > 0) {
    query += `&position__department__site=${current.site}`
  } 
  if(current.department > 0) {
    query += `&position__department=${current.department}`
  }
  axios
    .get(
      `/api/employeelist${site_admin ? "admin" : ""}/?${query}&ordering=first_name`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      });
    })
    .catch(err => console.log(err.response));
};

export const setDepartment = (id) => (dispatch, getState) => {
  let isLoading = Object.keys(getState().loading).some(k => getState().loading[k]);
  if(isLoading) {
    return false;
  }
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
      // Remove later and update number of employees through reducer
      dispatch(getDepartments());
      dispatch(getSites())
    })
    .catch((error) => {});
};

export const updateEmployee = (update, employee, siteAdmin, current_site) => (dispatch, getState) => {
  let current = getState().employees.current;
  axios
    .put(`/api/employees/${update.id}/`, employee, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res.data,
      });
      if(update.user) {
        if(siteAdmin) {
          dispatch(
            updateSite(current.site, {
              ...current_site,
              admins: [...current_site.admins, update.user],
              business_id: current_site.business.id
            })
          );
        } else {
          dispatch(
            updateSite(current.site, {
              ...current_site,
              admins: current_site.admins.filter(item => item != update.user),
              business_id: current_site.business.id
            })
          );
        }
      } 
      dispatch(resetErrors());
    })

    .catch((err) => console.log(err.response));
};

// Add Employee
export const addEmployee = (employee) => (dispatch, getState) => {
  let current = getState().employees.current;
  axios
    .post(`/api/employees/?business=${current.business}`, employee, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
        current_dep: getState().employees.current.department,
      });
      dispatch(resetErrors());

      // Remove later and update number of employees through reducer
      dispatch(getDepartments());
      dispatch(getSites())
    })
    .catch((err) => console.log(err.response));
};
// Get Positions
export const getPositions = (all = false) => (dispatch, getState) => {
  let current = getState().employees.current;
  let site_admin = getState().employees.site_admin;

  let query = '';
  if(current.site > 0) {
    query += `&department__site=${current.site}`
  } 
  if(current.department > 0) {
    query += `&department=${current.department}`
  }
  axios
    .get(
      `/api/positionslist/${
        all
          ? `?department__site=${current.site}`
          : `?${query}`
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
    }).catch(err => console.log(err.response));
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
      dispatch(getSites());
      dispatch(getDepartments());
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
  let current = getState().employees.current;
  axios
    .post(`/api/departments/?business=${current.business}`, department, tokenConfig(getState))
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
      dispatch(getSites())
    })
    .catch((error) => {console.log(error.response)});
};

// Get Department
export const getDepartments = () => (dispatch, getState) => {
  let current_site = getState().employees.current.site
  let current_department = getState().employees.current.department
  axios
    .get(
      `/api/departments/${getState().employees.current.site > 0 ? `?site__id=${getState().employees.current.site}&current_department=${current_department}` : ""}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_DEPARTMENTS,
        payload: res.data,
      });
    }).catch(err => console.log(err.response));
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
        axios.get("/api/departments/", tokenConfig(getState)).then((res) => {
          dispatch({
            type: GET_DEPARTMENTS,
            payload: res.data,
          });
        });
        dispatch(loadUser());
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

export const getAllAvailability = (site, startdate, enddate) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/availability/?employee__position__department__site=${site}&date_after=${startdate}&date_before=${enddate}&ordering=date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_AVAILABILITY,
        payload: res.data,
      });
    });
};

export const getHolidays = (site, user = false) => (dispatch, getState) => {
  axios
    .get(
      `/api/availability/${
        user ? `?employee__id=${user}` : `?employee__position__department__site=${site}`
      }&date_after=${format(
        new Date(),
        "yyyy-MM-dd"
      )}&name=holiday&ordering=date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_HOLIDAYS,
        payload: res.data,
      });
    }).catch(err => console.log(err.response));
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

export const updatePositionIndex = (positions) => (dispatch, getState) => {
  let requests = [];
  requests = positions.map((item, index) => axios.put(`/api/positions/${item.id}/`, 
    {...item, order: index}), tokenConfig(getState))
  
  
  axios.all(requests).then(axios.spread((...args) => {
    for(let i=0; i<args.length; i++) {
      dispatch({
        type: UPDATE_POSITION,
        payload: args[i].data,
      });
    }
  })).catch(err => console.log(err.response))
}