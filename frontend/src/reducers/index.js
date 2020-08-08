import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";
import auth from "./auth";
import responsive from "./responsive";
import errors from "./errors";

const appReducer = combineReducers({
  shifts,
  employees,
  auth,
  responsive,
  errors,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default (state, action) =>
  rootReducer(action.type === "LOGOUT_SUCCESS" ? undefined : state, action);
