import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDays, format } from "date-fns";
import AddShiftButton from "./AddShiftButton";
import { updateShift } from "../../actions/shifts";
import { toast } from "react-toastify";

const Shift = (props) => {
  const {
    result,
    shifts,
    employee,
    date,
    setOpen,
    financialMode,
    shiftDepartment,
    setShiftFormInfo,
    setEditShift,
  } = props;
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );

  return (
    <Fragment>
      <div
        key={result}
        className={`item-block shift__shift
          ${
            shifts.some((item) => item.stage != "Published")
              ? "unpublished"
              : ""
          } ${result <= addDays(new Date(), -1) ? "date-before" : ""} `}
      >
        {permissions.includes("create_shifts") && financialMode == "predicted" && (
          <i
            class="fas fa-plus fa-plus--white"
            onClick={() => {
              setOpen(true);
              setShiftFormInfo({
                employee,
                date: format(result, "yyyy-MM-dd"),
                shiftDepartment,
              });
            }}
          ></i>
        )}

        {shifts.map((shift) => (
          <Fragment key={shift.id}>
            {!permissions.includes("create_shifts") &&
            shift.stage != "Published" ? (
              ""
            ) : (
              <div
                onClick={() => {
                  if (permissions.includes("create_shifts")) {
                    setOpen(true);
                    setEditShift(shift);
                    setShiftFormInfo({
                      employee,
                      date: format(result, "yyyy-MM-dd"),
                      shiftDepartment,
                    });
                  }
                }}
                className={`shift__wrapper ${
                  permissions.includes("create_shifts") ? "edit" : ""
                }`}
              >
                <div className="flex-container--align-center">
                  <p
                    className={`shift__time ${!employee ? "open-shift" : ""} ${
                      shift.stage
                    }`}
                  >
                    {financialMode == "predicted"
                      ? `${shift.start_time} - ${
                          shift.end_time ? shift.end_time : "Finish"
                        }`
                      : shift.timeclock
                      ? `${shift.timeclock.clock_in} - ${
                          shift.timeclock.clock_out
                            ? shift.timeclock.clock_out
                            : "MISSING"
                        }`
                      : "Missing Timeclock"}
                  </p>
                </div>
                {financialMode == "predicted"
                  ? shift.break_length > 0 && (
                      <p className="shift__info">
                        Break: {shift.break_length} minutes
                      </p>
                    )
                  : shift.timeclock
                  ? shift.timeclock.break_length > 0 && (
                      <p className="shift__info">
                        Break: {shift.timeclock.break_length} minutes
                      </p>
                    )
                  : ""}
                {shift.info && (
                  <p className="shift__info">
                    <i className="fas fa-info-circle"></i>
                    {shift.info}
                  </p>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default Shift;
