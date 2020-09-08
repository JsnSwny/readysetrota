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
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_HOLIDAYS,
  SET_BUSINESS,
  SUBSCRIPTION_CANCELLED,
  CHARGE_COMPLETE,
} from "../actions/types";
import { format, addDays, parseISO } from "date-fns";

const todayDate = format(new Date(), "yyyy-MM-dd");
var weekFromDate = addDays(new Date(), 7);
weekFromDate = format(weekFromDate, "yyyy-MM-dd");

const initialState = {
  availability: [],
  holidays: [],
  employees: [],
  positions: [],
  all_positions: [],
  departments: [],
  current_department: localStorage.getItem("current_department")
    ? localStorage.getItem("current_department")
    : 0,
  current_business: 0,
  uuid_success: false,
  business: { plan: "F" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        current_business: action.payload.business
          ? action.payload.business.id
          : "",
      };
    case LOGIN_SUCCESS:
    case USER_LOADED:
    case REGISTER_SUCCESS:
      return {
        ...state,
        current_business: action.payload.user.business
          ? action.payload.user.business.id
          : "",
      };
    case GET_AVAILABILITY:
      return {
        ...state,
        availability: action.payload,
      };
    case GET_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case ADD_AVAILABILITY:
      return {
        ...state,
        availability: [...state.availability, action.payload],
        holidays:
          action.payload.name == "holiday"
            ? [...state.holidays, action.payload]
            : state.holidays,
      };
    case UPDATE_AVAILABILITY:
      return {
        ...state,
        availability: state.availability.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        holidays: state.holidays.map((item) =>
          item.id === action.payload.id
            ? action.payload.name == "holiday" && action.payload
            : item
        ),
      };
    case DELETE_AVAILABILITY:
      return {
        ...state,
        availability: state.availability.filter(
          (available) => available.id !== action.payload
        ),
        holidays: state.holidays.filter(
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
        current_business:
          state.current_department > 0 && action.payload.length > 0
            ? action.payload.filter(
                (item) => item.id == parseInt(state.current_department)
              )[0].business.id
            : state.current_business,
      };
    case SET_BUSINESS:
      return {
        ...state,
        business: action.payload,
      };
    case CHARGE_COMPLETE:
      return {
        ...state,
        business: {
          ...state.business,
          plan: "P",
          total_employees: action.employees,
        },
      };
    case SUBSCRIPTION_CANCELLED:
      return {
        ...state,
        business: {
          ...state.business,
          subscription_cancellation: format(
            parseISO(action.payload.subscription_cancellation),
            "yyyy-MM-dd"
          ),
        },
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
          business: {
            ...state.business,
            number_of_employees: state.business.number_of_employees + 1,
          },
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
        business: {
          ...state.business,
          number_of_employees: state.business.number_of_employees - 1,
        },
      };
    case DELETE_POSITION:
      return {
        ...state,
        positions: state.positions.filter(
          (position) => position.id !== action.payload
        ),
        all_positions: state.all_positions.filter(
          (position) => position.id !== action.payload
        ),
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== action.payload
        ),
        current_department:
          action.payload == state.current_department
            ? 0
            : state.current_department,
      };
    case ADD_POSITION:
      return {
        ...state,
        positions: [...state.positions, action.payload],
        all_positions: [...state.all_positions, action.payload],
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
