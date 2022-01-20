import { GET_STATS } from "../actions/types";

const initialState = {
  stats: {
    hours: [],
    total_cost: {},
    total_hours: {},
    forecast_dif: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
      };

    default:
      return state;
  }
}
