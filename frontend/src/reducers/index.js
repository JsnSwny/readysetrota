import { combineReducers } from "redux";
import shifts from "./shifts";
import employees from "./employees";

export default combineReducers({ shifts, employees });
