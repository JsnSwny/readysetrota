import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { format, addDays } from "date-fns";

const NoShift = (props) => {
  const {
    result,
    showAvailabilities,
    available,
    employee,
    shiftDepartment,
    financialMode,
    setOpen,
    setShiftFormInfo,
    setEditShift,
  } = props;
  const date = format(result, "yyyy-MM-dd");
  const permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let leave = useSelector((state) => state.availability.leave);
  let showAdd = true;
  let isHoliday = leave.some(
    (item) =>
      item.start_date <= date &&
      item.end_date >= date &&
      item.employee.id == employee.id &&
      item.status == "Approved"
  );

  if (available) {
    if (available.name == "unavailable") {
      if (available.status == "Approved") {
        showAdd = false;
      }
    }
  }

  return (
    <div
      key={result}
      className={`item-block shift__shift-noshift ${
        showAvailabilities &&
        available &&
        ((available.name == "holiday" || available.name == "unmarked") &&
        available.status == "Pending"
          ? "unmarked"
          : available.status == "Denied"
          ? "not-approved"
          : available.name)
      } ${result <= addDays(new Date(), -1) ? "date-before" : ""} ${
        showAvailabilities && isHoliday ? "holiday" : ""
      }`}
    >
      {!isHoliday &&
        showAdd &&
        permissions.includes("manage_shifts") &&
        financialMode == "predicted" && (
          <i
            class="fas fa-plus"
            onClick={() => {
              setEditShift(false);
              setOpen(true);
              setShiftFormInfo({ employee, date, shiftDepartment });
            }}
          ></i>
        )}
      {showAvailabilities && (
        <Fragment>
          <p className={`shift__text`}>
            {isHoliday
              ? "Holiday"
              : available &&
                available.name != "unselected" &&
                available.status != "Denied" &&
                available.name}
          </p>
          {available &&
            available.name == "unavailable" &&
            available.status == "Pending" && (
              <p className="shift__text">Unmarked</p>
            )}
          {!isHoliday && available && available.start_time && (
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
