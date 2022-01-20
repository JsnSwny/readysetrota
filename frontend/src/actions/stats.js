import { GET_STATS, STATS_LOADING, GET_REPORT_DATA } from "./types";
import axios from "axios";
import { format } from "date-fns";

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

export const getReportData = (startDate, endDate) => (dispatch, getState) => {
  dispatch({
    type: STATS_LOADING,
  });
  var start = new Date();
  axios
    .get(
      `/api-view/report/?site_id=1&start_date=${format(
        startDate,
        "dd/MM/yyyy"
      )}&end_date=${format(endDate, "dd/MM/yyyy")}`
    )
    .then((res) => {
      var elapsed = new Date() - start;
      console.log(`${elapsed / 1000}s`);
      dispatch({
        type: GET_REPORT_DATA,
        payload: res.data,
      });
    });
};
