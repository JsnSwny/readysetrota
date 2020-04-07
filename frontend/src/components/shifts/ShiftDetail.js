import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDailyShifts } from "../../actions/shifts";
import { format, parseISO, addHours } from "date-fns";
import AddShift from "./AddShift";

const Shifts = () => {
  let { date } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyShifts(date));
  }, []);
  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let shifts = useSelector((state) => state.shifts.daily_shifts);
  let hours = [];
  for (let i = 0; i <= 24; i++) {
    i.toString().length == 1
      ? hours.push("0" + i.toString())
      : hours.push(i.toString());
  }

  var getEmployeeShift = (employee) =>
    shifts.filter((obj) => {
      return obj.start_time.substr(0, 2) === employee;
    });

  return (
    <div class="shiftDetail">
      <h1 className="title">Edit Rota</h1>
      <p className="subtitle">{format(parseISO(date), "cccc do MMMM YYY")}</p>
      <div className="shiftDetail__buttons">
        <button
          onClick={() => {
            setAddButtonToggle(!addButtonToggle);
          }}
          className={`btn-1 ${addButtonToggle == true ? " active" : ""}`}
        >
          Create Shift
        </button>
      </div>
      {addButtonToggle == true && <AddShift date={date} />}
      {hours.map((hour) => (
        <div>
          {getEmployeeShift(hour).length > 0 && (
            <div className="shiftDetail__timeContainer">
              <h1 className="shiftDetail__time">
                {format(new Date().setHours(hour), "haaaaa'm'")} -{" "}
                {format(addHours(new Date().setHours(hour), 1), "haaaaa'm'")}
              </h1>
              <div className="shiftDetail__container">
                {getEmployeeShift(hour).map((shift) => (
                  <div className="shiftDetail__shift">
                    <p className="shiftDetail__employee">
                      {shift.employee.name.split(" ")[0]}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {shift.employee.name.split(" ")[1]}
                      </span>
                    </p>
                    <div className="shiftDetail__shiftTime">
                      <h2>
                        {shift.start_time.substr(0, 5)} - {shift.end_time}
                      </h2>
                      <p>{shift.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Shifts;
