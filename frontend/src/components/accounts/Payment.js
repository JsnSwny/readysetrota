import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import regeneratorRuntime from "regenerator-runtime";
import { sendCharge } from "../../actions/payments";
import { loadStart, loadFinish } from "../../actions/loading";
import Checkout from "./Checkout"
import loading from "../../reducers/loading";

const Payment = (props) => {
  let errors = useSelector((state) => state.errors.msg);
  const dispatch = useDispatch();
  const { amount, total_employees, period } = props;
  let user = useSelector((state) => state.auth.user);
  let success = useSelector((state) => state.payments.charge_success);
  const [planView, setPlanView] = useState("new");
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  let loading = useSelector((state) => state.loading);
  let [processing, setProcessing] = useState(false);
  let subscription = useSelector((state) => state.payments.subscription);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      let obj = {
        token: result.token.id,
        payment_method: paymentMethod.id,
        amount: amount,
        customer_id: user.profile.stripe_id,
        total_employees: total_employees,
        period: period,
      };
      dispatch(sendCharge(obj));
    }
  };

  if (success) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
      <div className="premium__form">
        <div className="premium__details">
          <h2>{user.business.plan == "F" ? "Upgrading from Free Trial to Premium" : `Upgrading your Premium Plan`}</h2>
          <p><strong>Number of employees:</strong> {total_employees}</p>
          <p><strong>Interval: </strong>{period.charAt(0).toUpperCase() + period.slice(1)}ly</p>
          <p><strong>Price: </strong>£{amount}</p>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="FormGroup">
            <CardElement hidePostalCode={true} />
          </div>

          <p className="error" style={{ marginTop: "20px" }}>
            {error}
          </p>
          <p className="error" style={{ marginTop: "20px" }}>
            {errors.payment}
          </p>
          <div className="flex-container--wrap">
          
            <Link to="/premium">
            <button
              className="btn-6--stretch"
            >
                Back
                </button>
            </Link>
          
          <button
            type="submit"
            className={`btn-6--stretch ${(processing|| loading.charge) ? "processing" : ""}`}
          >
            Pay £{amount}
          </button>
          </div>
          
        </form>
      </div>
      </Fragment>
    );
  }
};

export default Payment;
