import axios from "axios";
import { toast } from "react-toastify";
import { tokenConfig } from "./auth";
import { format } from "date-fns";

export const updateWage = (id, obj) => (dispatch, getState) => {
  axios
    .put(`/api/wages/${id}/`, obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "UPDATE_WAGE",
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err.response);
    });
};
