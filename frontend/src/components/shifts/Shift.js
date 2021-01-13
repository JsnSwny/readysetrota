import React, { Fragment, useState } from "react";
import { addDays } from "date-fns";
import AddShiftButton from "./AddShiftButton";
import CreateShift from "../modals/CreateShift";

const Shift = (props) => {
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
    setShiftInfo
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
                <div className="flex-container--align-center">
                  <p className="shift__time">
                    {shift.start_time} - {shift.end_time}{" "}
                  </p>
                  <span>
                    {admin ? (
                      shift.published ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-times"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
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
