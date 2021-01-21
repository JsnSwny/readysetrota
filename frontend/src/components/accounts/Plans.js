import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../common/Loading";
import { getCustomer } from "../../actions/payments";
// import { getDepartments } from "../../actions/employees";
import { Link } from "react-router-dom";
import Header from "../layout/Header"

const Plans = () => {
  const dispatch = useDispatch();
  let business = useSelector((state) => state.employees.business);
  const [employeesAmount, setEmployeesAmount] = useState(15);
  const [amountPerMonth, setAmountPerMonth] = useState(0);
  const [period, setPeriod] = useState("month");
  let loading = useSelector((state) => state.loading);
  const [showPremium, setShowPremium] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51FuTd1E5eS8rS5Q2BTPb8elKj6kQQtMOBi3E1HYWgIL5jAKJv5QGv0UNk6NX4tpEhBbSDVGTYW1Pyo8h2mfNKhR000SiPavZ9R"
  );
  // const stripePromise = loadStripe(
  //   "pk_live_51FuTd1E5eS8rS5Q2BVulz7l7vh0YfoTD7s1saCidaozzz8Lyw3ztrwkAOkTcEbZemRrcl3yalrdGxTnBLZAFzWVX00GTuGNgIV"
  // );
  let errors = useSelector((state) => state.errors.msg);
  let user = useSelector((state) => state.auth.user);
  let subscription = useSelector((state) => state.payments.subscription);
  useEffect(() => {
    dispatch(getCustomer(user.profile.stripe_id));
  }, []);

  useEffect(() => {
    setAmountPerMonth(((employeesAmount - 10) / 5) * 2 + 10);
  }, [employeesAmount]);

  return (
    <div className="premium__container">
      <div className="premium flex-container--column-center">
        <h1 className="premium__title">Premium Plan</h1>
        <p className="premium__subtitle">Upgrade to premium and gain access to all that readysetrota has to offer.</p>
        <div className="flex-container--center">
          <Fragment>
            <div className="premium__form">
              <h1 className="title" style={{ marginBottom: "20px" }}>
                Premium Plan
              </h1>
              <div
                style={{ marginBottom: "40px" }}
                className="flex-container--center"
              >
                <span
                  className={`form-control ${
                    period == "month" ? " active" : ""
                  } btn-6`}
                  onClick={() => {
                    setPeriod("month");
                  }}
                >
                  Monthly
                </span>
                <span
                  className={`form-control ${
                    period == "year" ? " active" : ""
                  } btn-6`}
                  onClick={() => {
                    setPeriod("year");
                  }}
                >
                  Yearly (20% off)
                </span>
              </div>
              <div className="form-group">
                <label>How many employees do you have?</label>
                <input
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "20px",
                  }}
                  type="range"
                  id="points"
                  name="points"
                  min="10"
                  max="100"
                  step="5"
                  className="slider"
                  onChange={(e) => {
                    setEmployeesAmount(e.target.value);
                  }}
                  value={employeesAmount}
                />
              </div>
              <h2 style={{ fontWeight: "normal", marginTop: "50px" }}>
                {employeesAmount} Employees
              </h2>
              {period == "month" ? (
                <h1>£{amountPerMonth} per month</h1>
              ) : (
                <h1>
                  £
                  {Math.ceil(
                    amountPerMonth * 12 - ((amountPerMonth * 12) / 100) * 20
                  )}{" "}
                  per year
                </h1>
              )}
              <Link to={{
                  pathname: `/checkout`,
                  state: {
                    amountPerMonth,
                    employeesAmount,
                    period
                  }
              }}><span className="btn-6--lg">Checkout <i class="fas fa-shopping-cart"></i></span></Link>
            </div>
            
            {/* <div className="form">
              <Elements stripe={stripePromise}>
                <Payment
                  amount={
                    period == "month"
                      ? amountPerMonth
                      : amountPerMonth * 12 - ((amountPerMonth * 12) / 100) * 20
                  }
                  total_employees={employeesAmount}
                  period={period}
                />
              </Elements>
            </div> */}
          </Fragment>
        </div>
      </div>
      </div>
  );
};

export default Plans;
