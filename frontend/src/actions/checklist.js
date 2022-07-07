import { UPDATE_CHECKLIST } from "./types";
import axios from "axios";
import { format } from "date-fns";

export const updateChecklist = (id, obj) => (dispatch, getState) => {
  axios
    .put(`/api/checklist/${id}/`, obj, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_CHECKLIST,
        payload: res.data,
      });
    })

    .catch((err) => console.log(err.response));
};
