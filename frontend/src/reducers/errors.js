import { GET_ERRORS, RESET_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case RESET_ERRORS:
      return {
        ...state,
        msg: {},
        status: null,
      };
    default:
      return state;
  }
}
