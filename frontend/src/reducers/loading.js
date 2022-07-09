import {
  LOAD_START,
  LOAD_FINISH,
  SET_DEPARTMENT,
  SET_SITE,
  GET_DEPARTMENTS,
  GET_POSITIONS,
  GET_EMPLOYEES,
  GET_SITES,
  RESET_LOADING,
  CHARGE_START,
  CHARGE_COMPLETE,
  START_AVAILABILITY,
  GET_AVAILABILITY,
  GET_STATS,
  STATS_LOADING,
  TIMECLOCK_LOADING,
  GET_TIMECLOCK,
  GET_FORECAST,
  FORECAST_LOADING,
  GET_REPORT_DATA,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ALL_EMPLOYEES,
} from "../actions/types";

const initialState = {
  any: false,
  sites: true,
  departments: true,
  positions: true,
  employees: true,
  charge: false,
  availability: true,
  stats: true,
  timeclock: false,
  forecast: false,
  register: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        any: true,
      };
    case LOAD_FINISH:
      return {
        ...state,
        any: false,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        register: true,
      };
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        register: false,
      };
    case TIMECLOCK_LOADING:
      return {
        ...state,
        timeclock: true,
      };
    case GET_TIMECLOCK:
      return {
        ...state,
        timeclock: false,
      };
    case FORECAST_LOADING:
      return {
        ...state,
        forecast: true,
      };
    case GET_FORECAST:
      return {
        ...state,
        forecast: false,
      };
    case SET_DEPARTMENT:
      return {
        ...state,
        positions: true,
        employees: true,
      };
    case SET_SITE:
      return {
        ...state,
        departments: true,
        positions: true,
        employees: true,
      };
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: false,
        positions: state.positions != false && action.payload.length != 0,
        employees: state.employees != false && action.payload.length != 0,
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: false,
      };
    case GET_EMPLOYEES:
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: false,
      };
    case GET_SITES:
      return {
        ...state,
        sites: false,
        departments: state.departments != false && action.payload.length != 0,
        positions: state.positions != false && action.payload.length != 0,
        employees: state.employees != false && action.payload.length != 0,
      };
    case CHARGE_START:
      return {
        ...state,
        charge: true,
      };
    case CHARGE_COMPLETE:
      return {
        ...state,
        charge: false,
      };
    case RESET_LOADING:
      return {
        ...state,
        sites: false,
        positions: false,
        employees: false,
      };
    case START_AVAILABILITY:
      return {
        ...state,
        availability: true,
      };
    case GET_AVAILABILITY:
      return {
        ...state,
        availability: false,
      };
    case GET_STATS:
      return {
        ...state,
        stats: false,
      };
    case STATS_LOADING:
      return {
        ...state,
        stats: true,
      };
    case GET_REPORT_DATA:
      return {
        ...state,
        stats: false,
      };
    default:
      return state;
  }
}
