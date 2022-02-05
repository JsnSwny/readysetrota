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
          `api/stats/?stat_type=${stat_type}${
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

export const getReportData =
  (startDate, endDate, basedOn) => (dispatch, getState) => {
    dispatch({
      type: STATS_LOADING,
    });
    var start = new Date();
    let current = getState().employees.current;
    axios
      .get(
        `/api/report/?site_id=${current.site.id}&start_date=${format(
          startDate,
          "dd/MM/yyyy"
        )}&end_date=${format(endDate, "dd/MM/yyyy")}&based_on=${basedOn}`
      )
      .then((res) => {
        var elapsed = new Date() - start;
        dispatch({
          type: GET_REPORT_DATA,
          payload: res.data,
        });
      });
  };
