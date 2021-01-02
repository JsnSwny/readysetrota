import { LOAD_START, LOAD_FINISH, SET_DEPARTMENT, SET_SITE, GET_DEPARTMENTS, GET_POSITIONS, GET_EMPLOYEES, GET_SITES, RESET_LOADING } from "../actions/types";

const initialState = {
  any: false,
  sites: true,
  departments: true,
  positions: true,
  employees: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        any: true
      };
    case LOAD_FINISH:
      return {
        ...state,
        any: false
      };
    case SET_DEPARTMENT:
      return {
        ...state,
        positions: true,
        employees: true,
      }
    case SET_SITE:
      return {
        ...state,
        departments: true,
        positions: true,
        employees: true,
      }
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: false,
        positions: state.positions != false && action.payload.length != 0,
        employees: state.employees != false && action.payload.length != 0
      }
    case GET_POSITIONS:
      return {
        ...state,
        positions: false,
      }
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: false,
      }
    case GET_SITES:
      return {
        ...state,
        sites: false,
        departments: state.departments != false && action.payload.length != 0,
        positions: state.positions != false && action.payload.length != 0,
        employees: state.employees != false && action.payload.length != 0
      }
    case RESET_LOADING:
      return {
        ...state,
        sites: false,
        positions: false,
        employees: false
      }
    default:
      return state;
  }
}
