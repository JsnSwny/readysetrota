import React, { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getPositions,
  getDepartments,
  getDailyShifts,
} from "../../actions/employees";

import { addShift } from "../../actions/shifts";

const AddShift = (props) => {
  const { date } = props;

  let employees = useSelector((state) => state.employees.employees);

  const dispatch = useDispatch();
  useEffect(() => {
    employees = dispatch(getEmployees());
  }, []);

  const [employee, setEmployee] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const shift = {
      employee_id: employee,
      start_time: startTime + ":00",
      end_time: endTime,
      info,
      date: date,
    };
    dispatch(addShift(shift));
    setEmployee("");
    setStartTime("");
    setEndTime("");
    setInfo("");
  };

  let minutes = ["00", "15", "30", "45"];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }

  return (
    <Fragment>
      <div className="staffForm">
        <h1 style={{ fontSize: "20px" }}>Create Shift</h1>
        <form onSubmit={onSubmit} className="staffForm__form">
          <div className="staffForm__control">
            <label className="staffForm__label">Employee:</label>
            <select
              className="staffForm__input"
              onChange={(e) => setEmployee(e.target.value)}
              name="employee"
              value={employee}
            >
              <option value="" disabled selected>
                Select an employee
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="staffForm__control">
            <label className="staffForm__label">Start Time:</label>
            <select
              className="staffForm__input"
              onChange={(e) => setStartTime(e.target.value)}
              name="starttime"
              value={startTime}
            >
              <option value="" disabled selected>
                Select a start time
              </option>
              {hours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="staffForm__control">
            <label className="staffForm__label">End Time:</label>
            <select
              className="staffForm__input"
              onChange={(e) => setEndTime(e.target.value)}
              name="endtime"
              value={endTime}
            >
              <option value="" disabled selected>
                Select an end time
              </option>
              <option value="Finish">Finish</option>
              {hours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="staffForm__control">
            <label className="staffForm__label">Info:</label>
            <input
              className="staffForm__input"
              type="text"
              name="info"
              onChange={(e) => setInfo(e.target.value)}
              value={info}
            ></input>
          </div>
          <button className="btn-1">Create</button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddShift;
