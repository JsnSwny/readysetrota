import { GET_TIMECLOCK, RESET_TIMECLOCK } from "../actions/types";

const initialState = {
  employee: null,
  shifts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMECLOCK:
      return {
        ...state,
        employee: action.payload.employee,
        shifts: action.payload.shifts,
      };
    case RESET_TIMECLOCK:
      return {
        ...state,
        employee: null,
        shifts: [],
      };
    default:
      return state;
  }
}
