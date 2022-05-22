import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { getErrors } from "../../../actions/errors";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { updateTotalEmployees } from "../../actions/employees";
import UpgradeSummary from "./UpgradeSummary";
import UpgradePlanSummary from "./UpgradePlanSummary";

const UpgradeForm = ({ setOpen, setLoading, getSubscriptionInformation }) => {
  const dispatch = useDispatch();

  let errors = useSelector((state) => state.errors.msg);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const business = useSelector((state) => state.employees.current.business);

  const [invoiceData, setInvoiceData] = useState({});

  const [numberOfEmployees, setNumberOfEmployees] = useState(
    business.total_employees
  );

  const employeeOptions = [...Array(100).keys()]
    .map((item) => item + 1)
    .filter((item) => item % 5 == 0);

  const stripe = useStripe();
  const elements = useElements();

  const [updatingInvoice, setUpdatingInvoice] = useState(false);

  const retrieveUpcomingInvoice = async () => {
    setUpdatingInvoice(true);
    const headerConfig = {
      headers: { Authorization: `Token ${token}` },
    };

    const obj = {
      customerId: user.profile.stripe_id,
      subscriptionId: business.subscription_id,
      quantity: numberOfEmployees,
    };

    const response = await axios.post(
      "/retrieve-upcoming-invoice/",
      obj,
      headerConfig
    );

    setInvoiceData(response.data);
    setUpdatingInvoice(false);
  };

  useEffect(() => {
    if (business.subscription_id) {
      retrieveUpcomingInvoice();
    }
  }, [numberOfEmployees]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const headerConfig = {
      headers: { Authorization: `Token ${token}` },
    };

    if (business.subscription_id) {
      const obj = {
        quantity: numberOfEmployees,
        subscriptionId: business.subscription_id,
      };

      setUpdatingInvoice(true);

      const response = await axios.post(
        "/update-subscription/",
        obj,
        headerConfig
      );

      console.log(response);

      setUpdatingInvoice(false);
    } else {
      const obj = {
        quantity: numberOfEmployees,
        stripe_id: user.profile.stripe_id,
      };

      const response = await axios.post(
        "/create-checkout-session/",
        obj,
        headerConfig
      );

      console.log(response);

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      console.log(result);
    }

    dispatch(updateTotalEmployees(numberOfEmployees));
    setLoading(false);
    setOpen(false);
    getSubscriptionInformation(business.subscription_id);
  };
  return (
    <form onSubmit={onSubmit} className="form__form">
      <div className="form__control">
        <label className="form__label">Employees*</label>
        <select
          disabled={updatingInvoice}
          className="form__input"
          name="employees"
          onChange={(e) => setNumberOfEmployees(parseInt(e.target.value))}
          autoFocus
          value={numberOfEmployees}
        >
          {employeeOptions.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <p className="error">{errors.name}</p>
      </div>
      <div className="billing__summary">
        <h3>Summary</h3>
        {business.subscription_id ? (
          <UpgradeSummary
            invoiceData={invoiceData}
            numberOfEmployees={numberOfEmployees}
          />
        ) : (
          <UpgradePlanSummary numberOfEmployees={numberOfEmployees} />
        )}
      </div>

      {/* <CardElement hidePostalCode={true} /> */}

      <hr />
      <div className="button-container">
        <button
          disabled={updatingInvoice}
          className="btn-3"
          type="submit"
          value="Add Department"
        >
          Upgrade Plan
        </button>
      </div>
    </form>
  );
};

export default UpgradeForm;
