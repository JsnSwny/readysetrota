import React, { Fragment } from "react";
import { format } from "date-fns";

const ShiftTemplate = (props) => {
  const { shifts, result } = props;
  let obj = {};
  for (let i = 0; i < result.length; i++) {
    obj[format(result[i], "yyyy-MM-dd")] = shifts.filter(
      (item) => item.date == format(result[i], "yyyy-MM-dd")
    );
  }

  const max_shifts = Object.values(obj)
    .map((a) => a.length)
    .reduce((a, b) => Math.max(a, b));

  return (
    <Fragment>
      <div className="shiftList container">
        {[...Array(max_shifts)].map((e, i) => (
          <div className="rota__container">
            <div className="container-right">
              {result.map((date) => {
                const shift = obj[format(date, "yyyy-MM-dd")][i];
                return shift ? (
                  <div
                    className={`item-block ${
                      shift.employee ? "shift__shift" : "shift__shift gray"
                    }`}
                  >
                    <p className="shift__time">
                      {shift.start_time} - {shift.end_time}
                    </p>
                    {shift.employee ? (
                      <p>
                        {shift.employee.first_name} {shift.employee.last_name}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div className="item-block shift__shift hidden"></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ShiftTemplate;
