import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { fromUnixTime, format } from "date-fns";

const UpgradeSummary = ({ numberOfEmployees, invoiceData }) => {
  const business = useSelector((state) => state.employees.current.business);
  return (
    <Fragment>
      <div className="flex-container--between">
        <p>Current Employees:</p>
        <p>{business.total_employees}</p>
      </div>
      <div className="flex-container--between">
        <p>
          <strong>New Employees:</strong>
        </p>
        <p>
          <strong>{Math.ceil(numberOfEmployees / 5) * 5}</strong>
        </p>
      </div>
      <hr />
      <div className="flex-container--between">
        <p>Current Cost:</p>
        <p>
          £{business.total_employees.toFixed(2)}
          <span>/per month</span>
        </p>
      </div>
      <div className="flex-container--between">
        <p>
          <strong>New Cost:</strong>
        </p>
        <p>
          <strong>
            £{(Math.ceil(numberOfEmployees / 5) * 5).toFixed(2)}
            <span>/per month</span>
          </strong>
        </p>
      </div>
      <hr />
      <div className="billing__charge">
        <p>
          You will be charged{" "}
          <span>£{(invoiceData.immediate_total / 100).toFixed(2)}</span> today
        </p>
        <p>
          Your next payment of{" "}
          <span>£{(invoiceData.next_invoice_sum / 100).toFixed(2)}</span> will
          be due on{" "}
          <span>
            {Object.keys(invoiceData).length &&
              format(
                fromUnixTime(invoiceData.invoice.next_payment_attempt),
                "dd/MM/yyyy"
              )}
          </span>
        </p>
      </div>
    </Fragment>
  );
};

export default UpgradeSummary;
