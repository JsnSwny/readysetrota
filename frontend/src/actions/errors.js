import { GET_ERRORS, RESET_ERRORS } from "./types";
import { toast } from "react-toastify";

export const getErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  };
};
