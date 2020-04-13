import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShiftsByID } from "../../actions/shifts";
import { startOfWeek, addDays, format, eachDayOfInterval } from "date-fns";

const YourRota = () => {
  const dispatch = useDispatch();

  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), {
      weekStartsOn: 1,
    })
  );
  const [endOfWeek, setEndOfWeek] = useState(addDays(weekStart, 6));

  let user = useSelector((state) => state.auth.user);
  let shifts = useSelector((state) => state.shifts.user_shifts);

  let formatEndOfWeek = format(endOfWeek, "YYY-MM-dd");
  let formatStartOfWeek = format(weekStart, "YYY-MM-dd");

  useEffect(() => {
    shifts = dispatch(
      getShiftsByID(formatStartOfWeek, formatEndOfWeek, user.employee[0].id)
    );
  }, []);

  var result = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek,
  });

  var getEmployeeShift = (date) =>
    shifts.filter((obj) => {
      return obj.employee.id === user.employee[0].id && obj.date === date;
    });

  return (
    <Fragment>
      <div className="yourRota">
        <h1 className="title">Your Rota</h1>
        <select
          onChange={(e) => {
            dispatch(
              getShiftsByID(
                formatStartOfWeek,
                format(addDays(weekStart, e.target.value), "YYY-MM-dd"),
                user.employee[0].id
              )
            );
            setEndOfWeek(addDays(weekStart, e.target.value));
          }}
          className="yourRota__select"
        >
          <option value="6">Week View</option>
          <option value="31">Month View</option>
        </select>
      </div>

      <div className="userShift">
        <div className="userShift__container">
          {result.map((day) => (
            <Fragment>
              {getEmployeeShift(format(day, "YYY-MM-dd")).length > 0 ? (
                <div className="userShift__wrapper">
                  <p>{format(day, "cccc do MMMM")}</p>
                  {getEmployeeShift(format(day, "YYY-MM-dd")).map((shift) => (
                    <p className="userShift__time">
                      {shift.start_time.substr(0, 5)} - {shift.end_time}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="userShift__wrapper userShift__noshift">
                  <p>{format(day, "cccc do MMMM")}</p>
                  <p className="userShift__time">No Shift</p>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

// /* <div className="userShift__wrapper">
//

export default YourRota;
