import React, { useState, useEffect } from "react";
import { addShift, updateShift } from "../../../actions/shifts";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addTimeclock } from "../../../actions/timeclock";
import { format } from "date-fns";

const TimeclockForm = ({ setOpen, extraInfo }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakLength, setBreakLength] = useState(0);
  const [employee, setEmployee] = useState("");
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );

  const employees = useSelector((state) => state.employees.employees);

  const onSubmit = (e) => {
    e.preventDefault();

    const timeclockObj = {
      employee_id: employee.value,
      clock_in: startTime,
      clock_out: endTime,
      break_length: breakLength,
      date: format(extraInfo.currentDate, "yyyy-MM-dd"),
      department_id: extraInfo.department.id,
    };

    dispatch(addTimeclock(timeclockObj));

    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form shift-form">
      <div className="flex-container--between form__wrapper">
        <div className="form__control">
          <label className="form__label">Employee*:</label>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={setEmployee}
            options={employees.map((item) => ({
              value: item.id,
              label: item.full_name,
            }))}
            placeholder={"Select an employee"}
            value={employee}
            autoFocus
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">Start Time*:</label>
          <input
            className="form__input"
            type="text"
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">Break:</label>
          <input
            className="form__input"
            type="number"
            onChange={(e) => setBreakLength(e.target.value)}
            value={breakLength}
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">End Time*:</label>
          <input
            className="form__input"
            type="text"
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />
        </div>
      </div>
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Timeclock">
          Add Timeclock
        </button>
      </div>
    </form>
  );
};

export default TimeclockForm;
