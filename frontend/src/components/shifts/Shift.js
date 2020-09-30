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
  } = props;

  const [shift, setShift] = useState(false);
  const [shiftDate, setShiftDate] = useState("");
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <CreateShift
        open={open}
        type={type}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        employee={employee}
        date={shiftDate}
        shift={shift}
      />

      <div
        key={result}
        className={`item-block shift__shift ${
          filterDate == format_date ? "filtered" : ""
        } ${
          shifts.some((item) => item.published == false) ? "unpublished" : ""
        } ${result <= addDays(new Date(), -1) ? "date-before" : ""} `}
      >
        <AddShiftButton
          employee={employee}
          date={format_date}
          white={true}
          limit={limit}
        />
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
                    setShift(shift);
                  }
                }}
                className={`shift__wrapper ${admin ? "edit" : ""}`}
              >
                <div className="flex-container">
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
