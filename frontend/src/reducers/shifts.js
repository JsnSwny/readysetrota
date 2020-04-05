import { GET_ALL_SHIFTS, ADD_SHIFT, GET_DAILY_SHIFTS } from "../actions/types";
import { format, addDays } from "date-fns";

const todayDate = format(new Date(), "YYY-MM-dd");
var weekFromDate = addDays(new Date(), 6);
weekFromDate = format(weekFromDate, "YYY-MM-dd");

const initialState = {
  shifts: [],
  date: todayDate,
  end_date: weekFromDate,
  daily_shifts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
        date: action.date,
        end_date: action.enddate,
      };
    case GET_DAILY_SHIFTS:
      return {
        ...state,
        daily_shifts: action.payload,
      };
    case ADD_SHIFT:
      return {
        ...state,
        shifts: [...state.shifts, action.payload],
        daily_shifts: [...state.daily_shifts, action.payload],
      };
    default:
      return state;
  }
}
