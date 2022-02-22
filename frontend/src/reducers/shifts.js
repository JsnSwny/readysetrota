import {
  GET_ALL_SHIFTS,
  ADD_SHIFT,
  LOGOUT_SUCCESS,
  GET_SHIFTS_BY_ID,
  SHIFTS_LOADING,
  DELETE_SHIFT,
  GET_POPULAR_TIMES,
  UPDATE_SHIFT,
  PUBLISHED_SHIFTS,
  GET_SWAP_REQUESTS,
  SEND_CHARGE,
  CHARGE_COMPLETE,
  GET_OPEN_SHIFTS,
  GET_TIMECLOCKS,
  ADD_TIMECLOCK,
  DELETE_TIMECLOCK,
  UPDATE_TIMECLOCK,
  UPDATE_DATE_RANGE,
} from "../actions/types";
import { format, addDays, startOfWeek } from "date-fns";

const todayDate = format(
  startOfWeek(new Date(), { weekStartsOn: 1 }),
  "yyyy-MM-dd"
);

let width = window.innerWidth;
let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;

var weekFromDate = addDays(
  startOfWeek(new Date(), { weekStartsOn: 1 }),
  dateRange
);

weekFromDate = format(weekFromDate, "yyyy-MM-dd");

const initialState = {
  shifts: [],
  timeclocks: [],
  open_shifts: [],
  date: todayDate,
  end_date: weekFromDate,
  user_shifts: [],
  popular_times: [],
  swap_requests: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_CHARGE:
      return {
        ...state,
        isLoading: true,
      };
    case CHARGE_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case SHIFTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_DATE_RANGE:
      return {
        ...state,
        date: action.date,
        end_date: action.enddate,
      };

    case GET_ALL_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
        isLoading: false,
      };

    case GET_TIMECLOCKS:
      return {
        ...state,
        timeclocks: action.payload,
      };
    case ADD_TIMECLOCK:
      return {
        ...state,
        timeclocks: [...state.timeclocks, action.payload].sort((a, b) =>
          a.clock_in.localeCompare(b.clock_in)
        ),
      };
    case DELETE_TIMECLOCK:
      return {
        ...state,
        timeclocks: state.timeclocks.filter(
          (item) => item.id !== action.payload
        ),
      };

    case UPDATE_TIMECLOCK:
      return {
        ...state,
        timeclocks: state.timeclocks.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case GET_OPEN_SHIFTS:
      return {
        ...state,
        open_shifts: action.payload,
      };
    case GET_SHIFTS_BY_ID:
      return {
        ...state,
        user_shifts: action.payload,
      };
    case ADD_SHIFT:
      return {
        ...state,
        shifts: [...state.shifts, action.payload].sort((a, b) =>
          a.start_time.localeCompare(b.start_time)
        ),
      };
    case UPDATE_SHIFT:
      let new_timeclock = {
        clock_in: action.payload.start_time,
        clock_out: action.payload.end_time,
        break_length: action.payload.break_length,
      };
      return {
        ...state,
        shifts: state.shifts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        timeclocks: state.shifts.map((item) =>
          item.shift == action.payload.id ? { ...item, new_timeclock } : item
        ),
      };
    case DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((shift) => shift.id !== action.payload),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        shifts: [],
      };
    case GET_POPULAR_TIMES:
      return {
        ...state,
        popular_times: action.payload,
      };
    case PUBLISHED_SHIFTS:
      return {
        ...state,
        isLoading: false,
        shifts: state.shifts.map((item) => {
          if (action.payload.includes(item.id)) {
            return {
              ...item,
              stage: action.stage,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };
    case GET_SWAP_REQUESTS:
      return {
        ...state,
        swap_requests: action.payload,
      };
    default:
      return state;
  }
}
