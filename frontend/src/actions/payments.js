import {
  CHARGE_COMPLETE,
  LOAD_START,
  LOAD_FINISH,
  SUBSCRIPTION_CANCELLED,
  GET_SUBSCRIPTION,
  CHARGE_START,
} from "./types";
import axios from "axios";
import { loadUser } from "./auth";
import { getErrors } from "./errors";

export const sendCharge = (obj) => (dispatch, getState) => {
  dispatch({
    type: CHARGE_START,
  });
  axios
    .post(`charge/`, {
      token: obj.token,
      charge: (obj.amount * 100).toFixed(0),
      payment_method: obj.payment_method,
      customer_id: obj.customer_id,
      total_employees: obj.total_employees,
      period: obj.period,
    })
    .then((res) => {
      if (res.data.error) {
        dispatch(getErrors({ payment: res.data.error }, 1));
        return false;
      }
      dispatch({
        type: CHARGE_COMPLETE,
        employees: obj.total_employees,
      });
      dispatch(getCustomer(obj.customer_id));
      dispatch(loadUser());
    })
    .catch((err) => console.log(err.response));
};

export const cancelSubscription = (customer_id) => (dispatch, getState) => {
  dispatch({
    type: LOAD_START,
  });
  axios.post(`cancel/`, { customer_id: customer_id }).then((res) => {
    dispatch({
      type: SUBSCRIPTION_CANCELLED,
      payload: res.data,
    });
    dispatch({
      type: LOAD_FINISH,
    });
    dispatch(getCustomer(customer_id));
  });
};

export const getCustomer = (customer_id) => (dispatch, getState) => {
  axios
    .post(`getCustomer/`, { customer_id: customer_id })
    .then((res) => {
      dispatch({
        type: GET_SUBSCRIPTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};
