import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
} from "../../actions/employees";
import DepartmentPicker from "./DepartmentPicker";
import PositionPicker from "./PositionPicker";
import StaffPicker from "./StaffPicker";
import HolidayRequest from "./HolidayRequest";
import { Link } from "react-router-dom";
import { cancelSubscription, getCustomer } from "../../actions/payments";
import { parseISO, format } from "date-fns";
import Loading from "../common/Loading";

const BusinessProfile = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();
  let currentBusiness = useSelector(
    (state) => state.employees.current_business
  );
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  let loading = useSelector((state) => state.loading.loading);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let subscription = useSelector((state) => state.payments.subscription);

  useEffect(() => {
    dispatch(getCustomer(user.profile.stripe_id));
  }, []);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getEmployees());
    dispatch(getPositions(true));
    dispatch(getPositions());
    dispatch(getHolidays(currentBusiness));
  }, [currentDepartment]);

  useEffect(() => {
    dispatch(getPositions(true));
    dispatch(getPositions());
  }, [currentBusiness]);

  let user = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      {loading && <Loading />}
      <div className="dashboard__header">
        <div className="container-2">
          <h1 className="title">Your Business</h1>
          <div className="dashboard__header-wrapper">
            <p className="subtitle">
              {user.business ? user.business.name : ""}
            </p>
            <i
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: "24px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpen(true);
                setType("BusinessName");
                setUpdate({ id: user.business.id, name: user.business.name });
              }}
              className="fas fa-edit"
            ></i>
          </div>
        </div>
      </div>
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">Current Plan</p>
          </div>
          <div className="dashboard__plan">
            <p>
              <strong>Plan:</strong> {business.plan == "F" ? "Free" : "Premium"}
            </p>

            {subscription && business.plan == "P" && (
              <Fragment>
                <p style={{ textTransform: "capitalize" }}>
                  <strong>Status:</strong> {subscription.status}
                </p>
                <p>
                  <strong>Interval:</strong>{" "}
                  {subscription.interval == "month" ? "Monthly" : "Yearly"}
                </p>
                {!subscription.cancel_at_period_end &&
                  subscription.current_period_end && (
                    <p>
                      <strong>Next Payment Due:</strong>{" "}
                      {format(
                        parseISO(subscription.current_period_end),
                        "dd MMMM yyyy"
                      )}
                    </p>
                  )}

                <p>
                  <strong>Amount:</strong> £{subscription.amount / 100}{" "}
                  {subscription.interval == "month" ? "per month" : "per year"}
                </p>
                {subscription.cancel_at_period_end ? (
                  <p className="error">
                    Your premium plan ends on{" "}
                    {format(
                      parseISO(subscription.current_period_end),
                      "dd MMMM yyyy"
                    )}
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(cancelSubscription(user.profile.stripe_id));
                    }}
                    className="btn-4"
                    style={{
                      width: "300px",
                      marginTop: "40px",
                      marginLeft: "0",
                      padding: "15px 0",
                    }}
                  >
                    Cancel subscription
                  </button>
                )}
              </Fragment>
            )}
          </div>
          {business.plan == "F" && (
            <Link to="/premium">
              <button
                className="btn-4"
                style={{
                  width: "300px",
                  marginTop: "40px",
                  marginLeft: "0",
                  padding: "15px 0",
                }}
              >
                Upgrade to Premium
              </button>
            </Link>
          )}
        </div>
      </div>
      <DepartmentPicker />
      {currentDepartment != 0 && (
        <PositionPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      {currentDepartment != 0 && (
        <StaffPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      {business.plan != "F" && (
        <div className="container-2">
          <HolidayRequest holidays={holidays} business={true} />
        </div>
      )}
    </Fragment>
  );
};

export default BusinessProfile;
