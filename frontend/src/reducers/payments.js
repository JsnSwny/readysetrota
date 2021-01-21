import {
  SEND_CHARGE,
  CHARGE_COMPLETE,
  GET_SUBSCRIPTION,
  SUBSCRIPTION_CANCELLED,
} from "../actions/types";

const initialState = {
  charge_success: false,
  subscription: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHARGE_COMPLETE:
      return {
        ...state,
        charge_success: true,
      };
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
        charge_success: false,
      };
    case SUBSCRIPTION_CANCELLED:
      return {
        ...state,
        subscription: {
          ...state.subscription,
          cancel_at_period_end: true,
        },
      };
    default:
      return state;
  }
}
