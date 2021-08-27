import { GET_ERRORS, RESET_ERRORS, SUCCESS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  success: false,
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
        success: false,
      };
    case SUCCESS:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
}
