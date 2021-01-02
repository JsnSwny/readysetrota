import React, { Fragment } from "react";
import { format, addDays } from "date-fns";
import AddShiftButton from "./AddShiftButton";

const NoShift = (props) => {
  const {
    result,
    showAvailabilities,
    available,
    filterDate,
    limit,
    employee,
    admin
  } = props;
  const format_date = format(result, "yyyy-MM-dd");
  return (
    <div
      key={result}
      className={`item-block shift__shift-noshift ${
        showAvailabilities && available.name
      } ${
        showAvailabilities && available.name == "holiday" && !available.approved
          ? "not-approved"
          : ""
      } ${filterDate == format_date ? "filtered" : ""} ${
        result <= addDays(new Date(), -1) ? "date-before" : ""
      }`}
    >
      {admin && (
        <AddShiftButton employee={employee} date={format_date} limit={limit} />
      )}
      {showAvailabilities && (
        <Fragment>
          <p className={`shift__text`}>
            {available.name != "unselected" && available.name}
          </p>
          {available.name == "holiday" && available.approved != true && (
            <p className="shift__text">Not Approved</p>
          )}
          {available.start_time && (
            <p className="shift__text">
              {available.start_time.substr(0, 5)} - {available.end_time}
            </p>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default NoShift;
