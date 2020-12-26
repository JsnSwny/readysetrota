import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import regeneratorRuntime from "regenerator-runtime";
import { sendCharge } from "../../actions/payments";
import { loadStart, loadFinish } from "../../actions/loading";

const Payment = (props) => {
  let errors = useSelector((state) => state.errors.msg);
  const dispatch = useDispatch();
  const { amount, total_employees, period } = props;
  let user = useSelector((state) => state.auth.user);
  let success = useSelector((state) => state.payments.charge_success);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadStart());
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
      dispatch(loadFinish());
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
      <div className="login-box wide">
        {/* <p
          onClick={() => {
            setStep(0);
          }}
        >
          Go back
        </p> */}
        <h1 className="title" style={{ marginBottom: "20px" }}>
          Checkout
        </h1>
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
          <button
            type="submit"
            style={{ width: "300px", marginTop: "50px" }}
            className="btn-2"
          >
            Pay £{amount}
          </button>
        </form>
      </div>
    );
  }
};

export default Payment;
