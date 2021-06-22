import { GET_NEW_AVAILABILITY } from "./types";
import { toast } from "react-toastify";
import axios from "axios";
import { tokenConfig } from "./auth";

export const getNewAvailability = () => (dispatch, getState) => {
  let business = getState().employees.current.business.id;
  axios
    .get(
      `/api/new-availability/?employee__business=${business}&ordering=start_date`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_NEW_AVAILABILITY,
        payload: res.data,
      });
    });
};
