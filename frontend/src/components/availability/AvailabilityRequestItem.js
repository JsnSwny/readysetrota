import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";

const AvailabilityRequestItem = ({ list, type, updateAction }) => {
  const dispatch = useDispatch();
  return list.map((item) => (
    <div className="dashboardHolidays__item">
      <div>
        <h4 className="flex-container--align-center dashboardHolidays__type">
          <span
            className={`dashboardHolidays__indicator--${
              type == "leave" ? "blue" : "red"
            }`}
          ></span>
          {type == "leave"
            ? item.leave_type
            : item.name[0].toUpperCase() + item.name.substring(1)}
        </h4>
        <p>
          <i class="fas fa-user"></i>
          {item.employee.full_name}
        </p>
        <p>
          <i class="fas fa-calendar-alt"></i>
          {type == "leave" ? (
            <Fragment>
              {format(parseISO(item.start_date), "do MMMM yyyy")} -
              {format(parseISO(item.end_date), "do MMMM yyyy")}
            </Fragment>
          ) : (
            format(parseISO(item.date), "do MMMM yyyy")
          )}
        </p>
        {item.reason && (
          <p>
            <i class="fas fa-info-circle"></i>
            {item.reason}
          </p>
        )}
      </div>
      <div
        className={`dashboardHolidays__buttons ${item.status.toLowerCase()}`}
      >
        <button
          onClick={() =>
            dispatch(
              updateAction(item.id, {
                ...item,
                status: "Approved",
              })
            )
          }
        >
          Approve
        </button>
        <button
          onClick={() =>
            dispatch(
              updateAction(item.id, {
                ...item,
                status: "Denied",
              })
            )
          }
        >
          Deny
        </button>
      </div>
    </div>
  ));
};

export default AvailabilityRequestItem;
