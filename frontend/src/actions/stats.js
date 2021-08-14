import { GET_STATS, STATS_LOADING } from "./types";
import axios from "axios";

export const getStats =
  (stat_type, id, start_date, end_date, currentFilter) =>
  (dispatch, getState) => {
    dispatch({
      type: STATS_LOADING,
    });
    if (id) {
      axios
        .get(
          `/stats/?stat_type=${stat_type}${
            stat_type == "business"
              ? `&currentFilter=${currentFilter}&id=${id}`
              : `&employee_id=${id}`
          }&start_date=${start_date}&end_date=${end_date}`
        )
        .then((res) => {
          dispatch({
            type: GET_STATS,
            payload: res.data,
          });
        });
    }
  };
