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
    filterDate,
    format_date,
    limit,
    admin,
    employee,
    setOpen,
    setUpdate,
    setType,
    setShiftInfo,
    current_employee,
    setConfirmOpen,
    setOnConfirm,
    setMessage,
  } = props;

  const [shiftDate, setShiftDate] = useState("");

  let modalProps = { setOpen, setUpdate, setType, setShiftInfo };
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );

  return (
    <Fragment>
      <div
        key={result}
        className={`item-block shift__shift ${
          filterDate == format_date ? "filtered" : ""
        } ${
          shifts.some((item) => item.stage != "Published") ? "unpublished" : ""
        } ${result <= addDays(new Date(), -1) ? "date-before" : ""} `}
      >
        {admin && (
          <AddShiftButton
            employee={employee}
            date={format_date}
            white={true}
            limit={limit}
            setUpdate={setUpdate}
            {...modalProps}
          />
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
                  }
                }}
                className={`shift__wrapper ${admin ? "edit" : ""}`}
              >
                <div
                  className="flex-container--align-center"
                  onClick={() => {
                    if (!employee && !admin) {
                      setConfirmOpen(true);
                      setMessage("Are you sure you want to take this shift?");
                      setOnConfirm(() => () => {
                        setConfirmOpen(false);
                        dispatch(
                          updateShift(shift.id, {
                            ...shift,
                            employee_id: current_employee.id,
                          })
                        );
                        toast.success("You have accepted this shift");
                      });
                    }
                  }}
                >
                  <p
                    className={`shift__time ${!employee ? "open-shift" : ""} ${
                      shift.stage
                    }`}
                  >
                    {shift.start_time} - {shift.end_time}{" "}
                    {permissions.include("manage_shifts") && (
                      <i
                        className={`fas fa-clock ${
                          shift.stage == "Published"
                            ? shift.timeclock
                              ? "active"
                              : ""
                            : "hide"
                        }`}
                      ></i>
                    )}
                  </p>
                </div>
                {shift.break_length > 0 && (
                  <p className="shift__info">
                    Break: {shift.break_length} minutes
                  </p>
                )}
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
