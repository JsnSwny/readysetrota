import { GET_PERMISSION_TYPES } from "./types";
import axios from "axios";
import { format } from "date-fns";

export const getPermissionTypes = () => (dispatch, getState) => {
  axios.get(`/api/permission-types/`).then((res) => {
    dispatch({
      type: GET_PERMISSION_TYPES,
      payload: res.data,
    });
  });
};
