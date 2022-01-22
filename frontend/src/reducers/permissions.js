import { GET_PERMISSION_TYPES, SET_ACTIVE_PERMISSIONS } from "../actions/types";

const initialState = {
  permission_types: [],
  active_permissions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERMISSION_TYPES:
      return {
        ...state,
        permission_types: action.payload,
      };

    case SET_ACTIVE_PERMISSIONS:
      return {
        ...state,
        active_permissions: action.payload,
      };

    default:
      return state;
  }
}
