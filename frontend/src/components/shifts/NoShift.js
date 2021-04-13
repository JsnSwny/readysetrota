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
    admin,
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
  } = props;
  const format_date = format(result, "yyyy-MM-dd");
  let modalProps = { setOpen, setUpdate, setType, setShiftInfo };
  let showAdd = true;
  if (available) {
    if (available.name == "holiday" || available.name == "unavailable") {
      if (available.approved == true) {
        showAdd = false;
      }
    }
  }

  return (
    <div
      key={result}
      className={`item-block shift__shift-noshift ${
        showAvailabilities &&
        ((available.name == "holiday" || available.name == "unmarked") &&
        available.approved == null
          ? "unmarked"
          : available.approved == false
          ? "not-approved"
          : available.name)
      } ${filterDate == format_date ? "filtered" : ""} ${
        result <= addDays(new Date(), -1) ? "date-before" : ""
      }`}
    >
      {showAdd && admin && (
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
            {available.name != "unselected" &&
              available.approved != false &&
              available.name}
          </p>
          {(available.name == "holiday" || available.name == "unavailable") &&
            available.approved == null && (
              <p className="shift__text">Unmarked</p>
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
