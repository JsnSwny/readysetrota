import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_BUSINESS,
  SET_DEPARTMENT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  business: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DEPARTMENT:
      return {
        ...state,
        business:
          state.user.business != null ||
          state.user.department_admin.some(
            (item) => item.id == parseInt(action.payload)
          ),
      };
    case UPDATE_BUSINESS:
      return {
        ...state,
        user: { ...state.user, business: action.payload },
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        business: action.payload.user.groups.some(
          (item) => item.name == "Business"
        ),
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
