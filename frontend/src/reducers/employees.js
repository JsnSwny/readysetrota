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
  GET_FORECAST,
  ADD_FORECAST,
  UPDATE_FORECAST,
  UPDATE_SETTINGS,
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
  forecast: [],
  current: {
    department: localStorage.getItem("current_department")
      ? localStorage.getItem("current_department")
      : {},
    business: {},
    site: { permissions: [] },
  },
  uuid_success: false,
  business: { plan: "F" },
  site_admin: false,
  sitesettings: {},
};

export default function (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        sitesettings: action.payload,
      };
    case GET_AVAILABILITY:
      return {
        ...state,
        availability: action.payload,
      };
    case GET_FORECAST:
      return {
        ...state,
        forecast: action.payload,
      };
    case ADD_FORECAST:
      return {
        ...state,
        forecast: [...state.forecast, action.payload],
      };
    case UPDATE_FORECAST:
      return {
        ...state,
        forecast: state.forecast.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case GET_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case GET_SITES:
      let current_site =
        (state.current.site == 0 ||
          !action.payload.some((item) => item.id == state.current.site.id)) &&
        action.payload.length > 0
          ? action.payload[0]
          : state.current.site;

      let isSiteAdminGet = (user) => {
        return user.business
          ? true
          : action.payload.find((site) => site.id == current_site)
          ? action.payload
              .find((site) => site.id == current_site)
              .admins.includes(user.id)
          : false;
      };
      return {
        ...state,
        sites: action.payload,
        current: {
          ...state.current,
          site: current_site,
        },
        site_admin: isSiteAdminGet(action.user),
      };

    case ADD_SITE:
      localStorage.setItem("current_site", action.payload.id);
      return {
        ...state,
        sites: [...state.sites, action.payload],
        current: {
          ...state.current,
          site: action.payload,
          department: 0,
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
        current: {
          ...state.current,
          site: action.payload,
        },
      };
    case DELETE_SITE:
      let newSites = state.sites.filter((site) => site.id !== action.payload);

      let deleted_site = state.sites.find((item) => item.id == action.payload);

      newState = {
        ...state,
        sites: newSites,
        current: {
          ...state.current,
          site:
            newSites.length > 0 && action.payload == state.current.site.id
              ? newSites[0]
              : state.current.site,
        },
        business: {
          ...state.business,
          number_of_employees:
            state.business.number_of_employees -
            deleted_site.number_of_employees,
        },
      };

      localStorage.setItem("current_site", newState.current.site);

      return newState;
    case SET_SITE:
      localStorage.setItem("current_site", action.payload);
      let isSiteAdmin = (user) => {
        return user.business
          ? true
          : state.sites.find((site) => site.id == action.payload.id)
          ? state.sites
              .find((site) => site.id == action.payload.id)
              .admins.includes(user.id)
          : false;
      };
      return {
        ...state,
        current: {
          ...state.current,
          site: action.payload,
          department: 0,
          business: state.sites.find((item) => item.id == action.payload.id)
            .business,
        },
        site_admin: isSiteAdmin(action.user),
        departments: [],
        employees: [],
        positions: [],
      };
    case ADD_AVAILABILITY:
      return {
        ...state,
        availability: [...state.availability, action.payload],
        holidays:
          action.payload.name == "holiday" ||
          action.payload.name == "unavailable"
            ? [...state.holidays, action.payload]
            : state.holidays,
      };
    case UPDATE_AVAILABILITY:
      let holidays = [];
      if (["holiday", "unavailable"].includes(action.payload.name)) {
        if (state.holidays.some((item) => item.id == action.payload.id)) {
          holidays = state.holidays.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        } else {
          holidays = [...state.holidays, action.payload];
        }
      }

      return {
        ...state,
        availability: state.availability.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        holidays,
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
      // let emp = action.payload;
      if (!state.current.site.permissions.includes("manage_wages")) {
        action.payload.forEach((item) => {
          delete item.wage_type;
          delete item.wage;
        });
      }

      return {
        ...state,
        employees: action.payload,
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload.sort((a, b) => a.order - b.order),
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
          department:
            (state.current.department == 0 ||
              !action.payload.some(
                (item) => item.id == state.current.department.id
              )) &&
            action.payload.length > 0
              ? action.payload[0]
              : state.current.department,
        },
      };
      localStorage.setItem("current_department", newState.current.department);
      return newState;
    case SET_BUSINESS:
      return {
        ...state,
        business: action.payload,
        current: {
          ...state.current,
          business: action.payload,
        },
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
      localStorage.setItem("current_department", {});
      localStorage.setItem("current_site", {});
      return {
        ...state,
        current: {
          ...state.current,
          department: {},
          site: { permissions: [] },
          business: {},
        },
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
      let foundIndex = state.sites.findIndex(
        (item) => item.id == action.payload.position[0].department.site.id
      );
      state.sites[foundIndex].number_of_employees++;
      if (
        action.payload.position.some(
          (item) => item.department.id == parseInt(action.current_dep.id)
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
        employees: state.employees.filter(
          (employees) =>
            !employees.position.some(
              (position) => position.id == action.payload
            )
        ),
      };
    case DELETE_DEPARTMENT:
      let newDepartments = state.departments.filter(
        (department) => department.id !== action.payload
      );
      newState = {
        ...state,
        departments: newDepartments,
        current: {
          ...state.current,
          department:
            newDepartments.length > 0 &&
            action.payload == state.current.department.id
              ? newDepartments[0]
              : state.current.department,
        },
      };

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
      localStorage.setItem("current_department", action.payload);
      return {
        ...state,
        departments: [...state.departments, action.payload],
        positions: [],
        employees: [],
        current: {
          ...state.current,
          department: action.payload,
        },
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
          department: action.payload,
        },
      };
    default:
      return state;
  }
}
