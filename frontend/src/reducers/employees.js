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
  GET_AVAILABILITY,
  ADD_AVAILABILITY,
  UPDATE_AVAILABILITY,
  DELETE_AVAILABILITY,
  GET_HOLIDAYS,
  SET_BUSINESS,
  SUBSCRIPTION_CANCELLED,
  CHARGE_COMPLETE,
  GET_SITES,
  ADD_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  SET_SITE,
  LOGOUT_SUCCESS,
} from "../actions/types";
import { format, parseISO } from "date-fns";

const initialState = {
  availability: [],
  sites: [],
  holidays: [],
  employees: [],
  positions: [],
  all_positions: [],
  departments: [],
  current: { 
    department: localStorage.getItem("current_department")
      ? localStorage.getItem("current_department")
      : 0, 
    business: 0, 
    site: localStorage.getItem("current_site")
      ? parseInt(localStorage.getItem("current_site"))
      : 0,  },
  uuid_success: false,
  business: { plan: "F" },
};

export default function (state = initialState, action) {
  let newState = {};
  switch (action.type) {
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
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
        current: {
          ...state.current,
          site: state.current.site == 0 && action.payload.length > 0 ? action.payload[0].id : state.current.site
        }
      };

    case ADD_SITE:
      localStorage.setItem("current_site", action.payload.id);
      return {
        ...state,
        sites: [...state.sites, action.payload],
        current: {
          ...state.current,
          site: action.payload.id,
          department: 0
        },
        positions: [],
        employees: [],
      };
    case UPDATE_SITE:
      return {
        ...state,
        sites: state.sites.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_SITE:
      let newSites = state.sites.filter((site) => site.id !== action.payload);
      newState = {
        ...state,
        sites: newSites,
        current: {
          ...state.current,
          site: newSites.length > 0 && action.payload == state.current.site ? newSites[0].id : state.current.site
        },
        postions: [],
        employees: []
      }

      localStorage.setItem("current_site", newState.current.site);

      return newState;
    case SET_SITE:
      localStorage.setItem("current_site", action.payload);
      return {
        ...state,
        current: {
          ...state.current,
          site: action.payload,
          department: 0,
          business: state.sites.find(item => item.id == action.payload).business.id
        },
        
        departments: [],
        employees: [],
        positions: []
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
      
      newState = {
        ...state,
        departments: action.payload,
        current: {
        ...state.current,
        department: state.current.department == 0 && action.payload.length > 0 ? action.payload[0].id : state.current.department
        }
      }
      localStorage.setItem("current_department", newState.current.department);
      return newState;
    case SET_BUSINESS:
      return {
        ...state,
        business: action.payload,
        current: {
          ...state.current,
          business: action.payload.id
        }
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
    case LOGOUT_SUCCESS:
      localStorage.setItem("current_department", 0);
      localStorage.setItem("current_site", 0);
      return {
        ...state,
        current: {
          ...state.current,
          department: 0,
          site: 0,
          business: 0
        }
      };
    case SET_DEPARTMENT:
      localStorage.setItem("current_department", action.payload);
      return {
        ...state,
        current: {
          ...state.current,
          department: action.payload,
        },
        employees: [],
        positions: [],       
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
      let newDepartments = state.departments.filter(
        (department) => department.id !== action.payload
      );
      let deleted_employees = state.employees.filter(item => item.position.some(pos => pos.department.id == action.payload));
      newState = {
        ...state,
        departments: newDepartments,
        current: {
          ...state.current,
          department: newDepartments.length > 0 && action.payload == state.current.department ? newDepartments[0].id : state.current.department
        },
        business: {
          ...state.business,
          number_of_employees: state.business.number_of_employees - deleted_employees.length
        }
      }

      localStorage.setItem("current_department", newState.current.department);

      return newState;
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
      localStorage.setItem("current_department", action.payload.id);
      return {
        ...state,
        departments: [...state.departments, action.payload],
        current: {
          ...state.current,
          department: action.payload.id
        }
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
      return {
        ...state,
        uuid_success: true,
        current: {
          ...state.current,
          department: action.payload
        }
      };
    default:
      return state;
  }
}
