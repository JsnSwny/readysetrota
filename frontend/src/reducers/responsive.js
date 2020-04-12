import { SET_WIDTH } from "../actions/types";

const initialState = {
  width: window.innerWidth,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WIDTH:
      return {
        ...state,
        width: action.width,
      };

    default:
      return state;
  }
}
