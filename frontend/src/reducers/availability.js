import {
  GET_LEAVE,
  ADD_LEAVE,
  DELETE_LEAVE,
  UPDATE_LEAVE,
} from "../actions/types";

const initialState = {
  leave: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE:
      return {
        ...state,
        leave: action.payload,
      };
    case ADD_LEAVE:
      return {
        ...state,
        leave: [action.payload, ...state.leave],
      };
    case UPDATE_LEAVE:
      return {
        ...state,
        leave: state.leave.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_LEAVE:
      return {
        ...state,
        leave: state.leave.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}
