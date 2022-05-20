import React, { Fragment, useState, useEffect } from "react";
import Title from "../common/Title";
import { useSelector } from "react-redux";
import { addBusinessDays, fromUnixTime, format } from "date-fns";
import UpgradeModal from "./UpgradeModal";
import axios from "axios";

const Billing = () => {
  let business = useSelector((state) => state.employees.business);
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  const getSubscriptionInformation = (subscriptionId) => {
    if (subscriptionId)
      axios.post("/retrieve-subscription/", { subscriptionId }).then((res) => {
        console.log(res);
        setInvoices(res.data.invoices.data);
      });
  };

  useEffect(() => {
    getSubscriptionInformation(business.subscription_id);
  }, [business]);

  return (
    <Fragment>
      <UpgradeModal open={open} setOpen={setOpen} />
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
                  <h3>{business.plan == "P" ? "Premium" : "Free"} Plan</h3>
                  <p>You have access to all features.</p>
                </div>
                <div className="billing-card__heading-right">
                  <h3>
                    £10<span>/per month</span>
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
              <p className="billing-card__cancel">Cancel plan</p>
              <button
                onClick={() => {
                  setOpen(true);
                  console.log("setting open");
                }}
                className="btn-3"
              >
                Upgrade plan
              </button>
            </div>
          </div>

          <div className="billing-card">
            <div className="billing-card__top">
              <div className="flex-container--between billing-card__heading">
                <div className="billing-card__heading-left">
                  <h3>Payment method</h3>
                  <p>Set up your method of payment for your plan.</p>
                </div>
                <div className="billing-card__heading-right">
                  <button>Edit payment method</button>
                </div>
              </div>
              <div className="payment-card-block">
                <div className="payment-card-block__image"></div>
                <div className="payment-card-block__details">
                  <h5>
                    Visa ending <strong>1234</strong>
                  </h5>
                  <p>Exp. 06/24</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="section-title">
            <h4>Billing history</h4>
            <p>Your list of invoices</p>
          </div>
          <table className="listing">
            <thead>
              <tr>
                <th>Invoice Date </th>
                <th>Status</th>
                <th>Amount</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((item) => (
                <tr className="listing__row">
                  <td className="bold">
                    {format(fromUnixTime(item.created), "MMM d, yyyy")}
                  </td>
                  <td>{item.status}</td>
                  <td>£{(item.total / 100).toFixed(2)}</td>
                  <td>Plan</td>
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
