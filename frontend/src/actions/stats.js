import { GET_STATS } from "./types";
import axios from "axios";


export const getStats = (stat_type, id, start_date, end_date, currentFilter) => (
    dispatch,
    getState
  ) => {
    if(id) {
        axios
        .get(
          `/stats/?stat_type=${stat_type}${stat_type == "business" ? `&currentFilter=${currentFilter}&id=${id}` : `&user_id=${id}`}&start_date=${start_date}&end_date=${end_date}`
        )
        .then((res) => {
          dispatch({
            type: GET_STATS,
            payload: res.data,
          });
        });
    }
    
};