import { LOAD_START, LOAD_FINISH } from "../actions/types";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_FINISH:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
