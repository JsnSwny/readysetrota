import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import Loading from "../common/Loading";

const Premium = () => {
  const [employeesAmount, setEmployeesAmount] = useState(15);
  const [amountPerMonth, setAmountPerMonth] = useState(0);
  const [period, setPeriod] = useState("monthly");
  const [step, setStep] = useState(0);
  let loading = useSelector((state) => state.loading.loading);
  let errors = useSelector((state) => state.errors.msg);
  const stripePromise = loadStripe(
    "pk_test_51FuTd1E5eS8rS5Q2BTPb8elKj6kQQtMOBi3E1HYWgIL5jAKJv5QGv0UNk6NX4tpEhBbSDVGTYW1Pyo8h2mfNKhR000SiPavZ9R"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAmountPerMonth(((employeesAmount - 15) / 5) * 2 + 10);
  }, [employeesAmount]);

  const onSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <Fragment>
      {loading && <Loading />}
      <div className="login">
        <div className="login__box wide">
          <div className="login__left login__part">
            {step == 0 ? (
              <Fragment>
                <h1 className="title" style={{ marginBottom: "20px" }}>
                  Premium Plan
                </h1>
                <form onSubmit={onSubmit}>
                  <div
                    style={{ justifyContent: "center", marginBottom: "20px" }}
                    className="form-selector"
                  >
                    <span
                      className={`form-control ${
                        period == "monthly" ? " active" : ""
                      }`}
                      onClick={() => {
                        setPeriod("monthly");
                      }}
                    >
                      Monthly
                    </span>
                    <span
                      className={`form-control ${
                        period == "year" ? " active" : ""
                      }`}
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
                        marginTop: "10px",
                      }}
                      type="range"
                      id="points"
                      name="points"
                      min="15"
                      max="100"
                      step="5"
                      className="slider"
                      onChange={(e) => {
                        setEmployeesAmount(e.target.value);
                      }}
                      value={employeesAmount}
                    />
                    <p className="error">{errors.role}</p>
                  </div>
                  <h2 style={{ fontWeight: "normal" }}>
                    {employeesAmount} Employees
                  </h2>
                  {period == "monthly" ? (
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
                  <button
                    style={{ width: "300px", marginTop: "50px" }}
                    className="btn-2"
                  >
                    Proceed to Payment
                  </button>
                </form>
              </Fragment>
            ) : (
              <Elements stripe={stripePromise}>
                <Payment
                  amount={
                    period == "monthly"
                      ? amountPerMonth
                      : amountPerMonth * 12 - ((amountPerMonth * 12) / 100) * 20
                  }
                  setStep={setStep}
                  total_employees={employeesAmount}
                  period={period}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Premium;
