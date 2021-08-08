import React, { Fragment } from "react";
import { useSelector } from "react-redux";
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
    admin,
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
  } = props;
  const format_date = format(result, "yyyy-MM-dd");
  let modalProps = { setOpen, setUpdate, setType, setShiftInfo };
  let leave = useSelector((state) => state.availability.leave);
  let showAdd = true;
  let isHoliday = leave.some(
    (item) =>
      item.start_date <= format_date &&
      item.end_date >= format_date &&
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

  console.log(leave);

  return (
    <div
      key={result}
      className={`item-block shift__shift-noshift ${
        showAvailabilities &&
        ((available.name == "holiday" || available.name == "unmarked") &&
        available.status == "Pending"
          ? "unmarked"
          : available.status == "Denied"
          ? "not-approved"
          : available.name)
      } ${filterDate == format_date ? "filtered" : ""} ${
        result <= addDays(new Date(), -1) ? "date-before" : ""
      } ${showAvailabilities && isHoliday ? "holiday" : ""}`}
    >
      {!isHoliday && showAdd && admin && (
        <AddShiftButton
          {...modalProps}
          setUpdate={setUpdate}
          employee={employee}
          date={format_date}
          limit={limit}
        />
      )}
      {showAvailabilities && (
        <Fragment>
          <p className={`shift__text`}>
            {isHoliday
              ? "Holiday"
              : available.name != "unselected" &&
                available.status != "Denied" &&
                available.name}
          </p>
          {available.name == "unavailable" && available.status == "Pending" && (
            <p className="shift__text">Unmarked</p>
          )}
          {!isHoliday && available.start_time && (
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
