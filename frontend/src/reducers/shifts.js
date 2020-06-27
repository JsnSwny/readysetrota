import {
  GET_ALL_SHIFTS,
  ADD_SHIFT,
  GET_DAILY_SHIFTS,
  LOGOUT_SUCCESS,
  GET_SHIFTS_BY_ID,
  SHIFTS_LOADING,
  DELETE_SHIFT,
} from "../actions/types";
import { format, addDays, startOfWeek } from "date-fns";

const todayDate = format(
  startOfWeek(new Date(), { weekStartsOn: 1 }),
  "YYY-MM-dd"
);

let width = window.innerWidth;
let dateRange = width > 1000 ? 6 : width > 600 ? 2 : 0;

var weekFromDate = addDays(
  startOfWeek(new Date(), { weekStartsOn: 1 }),
  dateRange
);

console.log(dateRange);
weekFromDate = format(weekFromDate, "YYY-MM-dd");

const initialState = {
  shifts: [],
  date: todayDate,
  end_date: weekFromDate,
  daily_shifts: [],
  user_shifts: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHIFTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
        date: action.date,
        end_date: action.enddate,
        isLoading: false,
      };

    case GET_DAILY_SHIFTS:
      return {
        ...state,
        daily_shifts: action.payload,
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

        daily_shifts: [...state.daily_shifts, action.payload],
      };
    case DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((shift) => shift.id !== action.payload),
        daily_shifts: state.daily_shifts.filter(
          (shift) => shift.id !== action.payload
        ),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        shifts: [],
        daily_shifts: [],
      };
    default:
      return state;
  }
}
