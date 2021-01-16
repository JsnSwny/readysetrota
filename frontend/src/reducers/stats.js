import { GET_STATS } from "../actions/types";

const initialState = {
  stats: {shifts: {current: 0, before: 0}, hours: {current: 0, before: 0}, wage: {current: 0, before: 0}}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
}
