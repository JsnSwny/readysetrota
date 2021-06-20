import { GET_NEW_AVAILABILITY } from "../actions/types";

const initialState = {
  availability: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEW_AVAILABILITY:
      return {
        ...state,
        availability: action.payload,
      };
    default:
      return state;
  }
}
