import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addBusinessDays } from "date-fns";

const PaymentMethod = ({ subscriptionInfo, setLoading }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  let business = useSelector((state) => state.employees.business);

  const stripe = useStripe();

  const updatePaymentMethod = async () => {
    setLoading(true);

    const headerConfig = {
      headers: { Authorization: `Token ${token}` },
    };

    const obj = {
      stripe_id: user.profile.stripe_id,
      subscription_id: business.subscription_id,
    };

    const response = await axios.post(
      "/create-setup-checkout-session/",
      obj,
      headerConfig
    );
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    setLoading(false);
  };

  return (
    <div className="billing-card">
      <div className="billing-card__top">
        <div className="flex-container--between billing-card__heading">
          <div className="billing-card__heading-left">
            <h3>Payment method</h3>
            <p>Set up your method of payment for your plan.</p>
          </div>
          <div className="billing-card__heading-right">
            <button onClick={() => updatePaymentMethod()} className="text-btn">
              Edit payment method
            </button>
          </div>
        </div>
        {subscriptionInfo.card && (
          <div className="payment-card-block">
            <div className="payment-card-block__image"></div>
            <div className="payment-card-block__details">
              <h5>
                {subscriptionInfo.card.card.brand} ending{" "}
                <strong>{subscriptionInfo.card.card.last4}</strong>
              </h5>
              <p>
                Exp. {subscriptionInfo.card.card.exp_month}/
                {subscriptionInfo.card.card.exp_year}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;