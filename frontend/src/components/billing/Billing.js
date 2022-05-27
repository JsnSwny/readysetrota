import React, { Fragment, useState, useEffect } from "react";
import Title from "../common/Title";
import { useSelector } from "react-redux";
import { addBusinessDays, fromUnixTime, format } from "date-fns";
import UpgradeModal from "./UpgradeModal";
import axios from "axios";
import ConfirmModal from "../layout/confirm/ConfirmModal";
import Loading from "../common/Loading";
import PaymentMethod from "./PaymentMethod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Billing = () => {
  const stripePromise = loadStripe(
    "pk_test_51FuTd1E5eS8rS5Q2BTPb8elKj6kQQtMOBi3E1HYWgIL5jAKJv5QGv0UNk6NX4tpEhBbSDVGTYW1Pyo8h2mfNKhR000SiPavZ9R"
  );
  let business = useSelector((state) => state.employees.business);
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPaymentMethod = (paymentMethodId) => {
    if (paymentMethodId) {
      axios
        .post("/retrieve-payment-method/", { paymentMethodId })
        .then((res) => console.log(res));
    }
  };

  const getSubscriptionInformation = (subscriptionId) => {
    if (subscriptionId) {
      setLoading(true);

      axios.post("/retrieve-subscription/", { subscriptionId }).then((res) => {
        console.log(res.data);
        setInvoices(res.data.invoices.data);
        setSubscriptionInfo(res.data);
        setLoading(false);
      });
    }
  };

  const cancelSubscription = (subscriptionId) => {
    setLoading(true);
    axios.post("/cancel-subscription/", { subscriptionId }).then((res) => {
      setSubscriptionInfo({
        ...subscriptionInfo,
        active: false,
        cancel_at: res.data.subscription_cancellation.cancel_at,
      });
      setLoading(false);
    });
  };

  const reactivateSubscription = (subscriptionId) => {
    setLoading(true);
    axios.post("/reactivate-subscription/", { subscriptionId }).then((res) => {
      setSubscriptionInfo({
        ...subscriptionInfo,
        active: true,
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(business);
    getSubscriptionInformation(business.subscription_id);
    if (business.payment_method_id) {
      getPaymentMethod(business.payment_method_id);
    }
  }, [business]);

  console.log(subscriptionInfo);

  return (
    <Fragment>
      <Loading active={loading} />
      <UpgradeModal
        getSubscriptionInformation={getSubscriptionInformation}
        setLoading={setLoading}
        open={open}
        setOpen={setOpen}
      />
      {confirmOpen && (
        <ConfirmModal
          title={
            subscriptionInfo.active
              ? "Are you sure you want to cancel your subscription?"
              : "Are you sure you want to reactivate your subscription?"
          }
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            subscriptionInfo.active
              ? cancelSubscription(business.subscription_id)
              : reactivateSubscription(business.subscription_id);
          }}
          actionTitle="Confirm"
        />
      )}
      <Title
        name="Subscription & Billing"
        subtitle="Manage your billing and payment details."
        wrapper=""
      />
      <div className="wrapper">
        <section className="section flex-container--between">
          <div className="billing-card">
            <div className="billing-card__top">
              <div className="flex-container--between billing-card__heading">
                <div className="billing-card__heading-left">
                  <h3 className="billing-card__title">
                    Premium Plan {console.log(subscriptionInfo)}
                    {subscriptionInfo.status == "trialing" && (
                      <span className="billing-card__tag">Trial</span>
                    )}
                  </h3>
                  <p>You have access to all features.</p>
                </div>
                <div className="billing-card__heading-right">
                  <h3>
                    £{subscriptionInfo.current_quantity}
                    <span>/per month</span>
                  </h3>
                </div>
              </div>
              <div className="billing-card__bar-heading">
                <h4>
                  {business.number_of_employees}/{business.total_employees}{" "}
                  employees
                </h4>
                <div className="billing-card__bar">
                  <span
                    style={{
                      width: `${
                        (business.number_of_employees /
                          business.total_employees) *
                        100
                      }%`,
                    }}
                  ></span>
                </div>
              </div>
            </div>
            <div className="billing-card__bottom flex-container--between-center">
              {subscriptionInfo ? (
                subscriptionInfo.active ? (
                  <button
                    className="text-btn text-btn--red"
                    onClick={() => setConfirmOpen(true)}
                  >
                    Cancel plan
                  </button>
                ) : (
                  <button
                    className="text-btn text-btn--green"
                    onClick={() => setConfirmOpen(true)}
                  >
                    Reactivate plan
                  </button>
                )
              ) : (
                <p></p>
              )}
              {!business.subscription_id || subscriptionInfo.active ? (
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="btn-3"
                >
                  Upgrade plan
                </button>
              ) : (
                subscriptionInfo && (
                  <p className="info">
                    Your plan ends on{" "}
                    <strong>
                      {subscriptionInfo.cancel_at &&
                        format(
                          fromUnixTime(subscriptionInfo.cancel_at),
                          "dd/MM/yyyy"
                        )}
                    </strong>
                  </p>
                )
              )}
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentMethod
              subscriptionInfo={subscriptionInfo}
              setLoading={setLoading}
            />
          </Elements>
        </section>
        <section className="section">
          <div className="section-title">
            <h4>Billing history</h4>
            <p>Your list of invoices</p>
          </div>
          <table className="listing">
            <thead>
              <tr>
                <th>Invoice Date</th>
                <th>Employees</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((item) => (
                <tr className="listing__row">
                  <td className="bold">
                    {format(fromUnixTime(item.created), "MMM d, yyyy")}
                  </td>
                  <td>{item.lines.data.at(-1).quantity}</td>
                  <td>£{(item.total / 100).toFixed(2)}</td>
                  <td>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </td>
                  <td>
                    <a className="link" href={item.invoice_pdf} target="_blank">
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Fragment>
  );
};

export default Billing;
