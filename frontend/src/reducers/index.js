import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";
import auth from "./auth";
import responsive from "./responsive";
import errors from "./errors";

export default combineReducers({ shifts, employees, auth, responsive, errors });
