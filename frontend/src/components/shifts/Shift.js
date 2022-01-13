import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDays } from "date-fns";
import AddShiftButton from "./AddShiftButton";
import { updateShift } from "../../actions/shifts";
import { toast } from "react-toastify";

const Shift = (props) => {
  const dispatch = useDispatch();
  const {
    result,
    shifts,
    format_date,
    admin,
    employee,
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
    setExtra,
    financialMode,
    shiftDepartment,
  } = props;

  const [shiftDate, setShiftDate] = useState("");

  let modalProps = { setOpen, setUpdate, setType, setShiftInfo, setExtra };

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
        {admin && financialMode == "predicted" && (
          <i
            class="fas fa-plus fa-plus--white"
            onClick={() => {
              setOpen(true);
              // setShiftFormInfo({ employee, date, shiftDepartment });
            }}
          ></i>
        )}

        {shifts.map((shift) => (
          <Fragment key={shift.id}>
            {!admin && shift.stage != "Published" ? (
              ""
            ) : (
              <div
                onClick={() => {
                  if (admin) {
                    setOpen(true);
                    setType("shift");
                    setUpdate(shift);
                    setShiftInfo({ employee, date: shiftDate });
                    setExtra({ financialMode, shiftDepartment });
                  }
                }}
                className={`shift__wrapper ${admin ? "edit" : ""}`}
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
