import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";
import auth from "./auth";
import responsive from "./responsive";
import errors from "./errors";
import payments from "./payments";
import loading from "./loading";
import stats from "./stats";
import availability from "./availability";
import timeclock from "./timeclock";
import report from "./report";
import permissions from "./permissions";
import checklist from "./checklist";

const appReducer = combineReducers({
  shifts,
  employees,
  checklist,
  auth,
  responsive,
  errors,
  payments,
  loading,
  stats,
  availability,
  timeclock,
  report,
  permissions,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default (state, action) =>
  rootReducer(action.type === "LOGOUT_SUCCESS" ? undefined : state, action);
