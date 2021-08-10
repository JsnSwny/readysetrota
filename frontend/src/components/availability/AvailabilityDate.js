import React, { Fragment } from "react";
import { format, addMonths } from "date-fns";

const AvailabilityDate = ({
  setAvailabilityMonth,
  availabilityMonth,
  dateRange,
}) => {
  return (
    <Fragment>
      <div className="dashboardAvailability__month">
        <span
          onClick={() => {
            setAvailabilityMonth(addMonths(availabilityMonth, -1));
          }}
        >
          <i className="fas fa-caret-left"></i>
        </span>
        <p>{format(availabilityMonth, "MMMM yyyy")}</p>
        <span
          onClick={() => {
            setAvailabilityMonth(addMonths(availabilityMonth, 1));
          }}
        >
          <i className="fas fa-caret-right"></i>
        </span>
      </div>
      <ul className="dashboardShiftList__list--heading">
        {dateRange.map(
          (date, i) => i < 7 && <li key={i}>{format(date, "iii")}</li>
        )}
      </ul>
    </Fragment>
  );
};

export default AvailabilityDate;
