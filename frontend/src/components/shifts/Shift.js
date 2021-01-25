import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addDays } from "date-fns";
import AddShiftButton from "./AddShiftButton";
import CreateShift from "../modals/CreateShift";
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
    setMessage
  } = props;

  const [shiftDate, setShiftDate] = useState("");

  let modalProps = { setOpen, setUpdate, setType, setShiftInfo };
  return (
    <Fragment>
      <div
        key={result}
        className={`item-block shift__shift ${
          filterDate == format_date ? "filtered" : ""
        } ${
          shifts.some((item) => item.published == false) ? "unpublished" : ""
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
            {!admin && shift.published == false ? (
              ""
            ) : (
              <div
                onClick={() => {
                  if (admin) {
                    setOpen(true);
                    setType("shift");
                    setUpdate(shift);
                    setShiftInfo({employee, date: shiftDate})
                  }
                }}
                className={`shift__wrapper ${admin ? "edit" : ""}`}
              >
                <div className="flex-container--align-center" onClick={() => {
                  if(!employee && !admin) {
                    setConfirmOpen(true);
                    setMessage("Are you sure you want to take this shift?")
                    setOnConfirm(() => () => {
                      setConfirmOpen(false)
                      dispatch(updateShift(shift.id, {...shift, employee_id: current_employee.id}))
                      toast.success("You have accepted this shift")
                    })
                  }  
                    }}>
                  <p className={`shift__time ${!employee ? "open-shift" : ""}`}>
                    {shift.start_time} - {shift.end_time}{" "}
                  </p>
                </div>
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
