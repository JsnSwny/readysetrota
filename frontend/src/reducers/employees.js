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
  RESET_DEPARTMENT,
  UUID_SUCCESS,
  UUID_RESET,
} from "../actions/types";
import { format, addDays } from "date-fns";

const todayDate = format(new Date(), "YYY-MM-dd");
var weekFromDate = addDays(new Date(), 7);
weekFromDate = format(weekFromDate, "YYY-MM-dd");

const initialState = {
  employees: [],
  positions: [],
  departments: [],
  current_department: 0,
  // current_department: localStorage.getItem("current_department")
  //   ? localStorage.getItem("current_department")
  //   : 0,
  uuid_success: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case RESET_DEPARTMENT:
      // localStorage.setItem("current_department", 0);
      return {
        ...state,
        current_department: 0,
      };
    case SET_DEPARTMENT:
      // localStorage.setItem("current_department", action.payload);
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
    case ADD_POSITION:
      return {
        ...state,
        positions: [...state.positions, action.payload],
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
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
