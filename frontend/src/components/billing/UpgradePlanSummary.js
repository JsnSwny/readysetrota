import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { fromUnixTime, format } from "date-fns";

const UpgradePlanSummary = ({ numberOfEmployees, invoiceData }) => {
  const business = useSelector((state) => state.employees.current.business);
  return (
    <Fragment>
      <div className="flex-container--between">
        <p>Employees:</p>
        <p>{Math.ceil(numberOfEmployees / 5) * 5}</p>
      </div>
      <hr />
      <div className="flex-container--between">
        <p>Cost:</p>
        <p>
          £{(Math.ceil(numberOfEmployees / 5) * 5).toFixed(2)}
          <span>/per month</span>
        </p>
      </div>
    </Fragment>
  );
};

export default UpgradePlanSummary;
