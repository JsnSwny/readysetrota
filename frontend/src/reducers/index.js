import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";
import auth from "./auth";
import responsive from "./responsive";

export default combineReducers({ shifts, employees, auth, responsive });
