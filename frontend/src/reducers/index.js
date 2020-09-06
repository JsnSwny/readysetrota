import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";
import auth from "./auth";
import responsive from "./responsive";
import errors from "./errors";
import payments from "./payments";
import loading from "./loading";

const appReducer = combineReducers({
  shifts,
  employees,
  auth,
  responsive,
  errors,
  payments,
  loading,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default (state, action) =>
  rootReducer(action.type === "LOGOUT_SUCCESS" ? undefined : state, action);
