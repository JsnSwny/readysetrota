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
  RESET_DEPARTMENT,
  UUID_SUCCESS,
  UUID_RESET,
  UPDATE_DEPARTMENT,
  UPDATE_POSITION,
  UPDATE_EMPLOYEE,
  GET_AVAILABILITY,
  ADD_AVAILABILITY,
  UPDATE_AVAILABILITY,
  DELETE_AVAILABILITY,
} from "../actions/types";
import { format, addDays } from "date-fns";

const todayDate = format(new Date(), "YYY-MM-dd");
var weekFromDate = addDays(new Date(), 7);
weekFromDate = format(weekFromDate, "YYY-MM-dd");

const initialState = {
  availability: [],
  employees: [],
  positions: [],
  all_positions: [],
  departments: [],

  current_department: localStorage.getItem("current_department")
    ? localStorage.getItem("current_department")
    : 0,
  uuid_success: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABILITY:
      return {
        ...state,
        availability: action.payload,
      };
    case ADD_AVAILABILITY:
      return {
        ...state,
        availability: [...state.availability, action.payload],
      };
    case UPDATE_AVAILABILITY:
      return {
        ...state,
        availability: state.availability.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_AVAILABILITY:
      return {
        ...state,
        availability: state.availability.filter(
          (available) => available.id !== action.payload
        ),
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload,
      };
    case GET_ALL_POSITIONS:
      return {
        ...state,
        all_positions: action.payload,
      };
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case RESET_DEPARTMENT:
      localStorage.setItem("current_department", 0);
      return {
        ...state,
        current_department: 0,
      };
    case SET_DEPARTMENT:
      localStorage.setItem("current_department", action.payload);
      return {
        ...state,
        current_department: action.payload,
      };
    case ADD_EMPLOYEE:
      if (
        action.payload.position.some(
          (item) => item.department.id == parseInt(action.current_dep)
        )
      ) {
        return {
          ...state,
          employees: [...state.employees, action.payload],
        };
      } else {
        return {
          ...state,
        };
      }

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case DELETE_POSITION:
      return {
        ...state,
        positions: state.positions.filter(
          (position) => position.id !== action.payload
        ),
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== action.payload
        ),
      };
    case ADD_POSITION:
      return {
        ...state,
        positions: [...state.positions, action.payload],
      };
    case UPDATE_POSITION:
      return {
        ...state,
        positions: state.positions.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
      };

    case UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case UUID_RESET:
      return {
        ...state,
        uuid_success: false,
      };
    case UUID_SUCCESS:
      // localStorage.setItem("current_department", action.payload);
      return {
        ...state,
        uuid_success: true,
        current_department: action.payload,
      };
    default:
      return state;
  }
}
