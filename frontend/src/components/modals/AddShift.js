import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, deleteShift, updateShift } from "../../actions/shifts";
import { toast } from "react-toastify";
import PositionField from "../employees/PositionField";

const AddShift = (props) => {
  const { date, employee, onClose, shift, template } = props;
  let updating = shift ? true : false;

  let errors = useSelector((state) => state.errors.msg);
  let current = useSelector(
    (state) => state.employees.current
  );
  const [position, setPosition] = useState([]);
  let departments = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.all_positions);

  let employees = useSelector((state) => state.employees.employees);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");

  const dispatch = useDispatch();

  let popular_times = useSelector((state) => state.shifts.popular_times);

  useEffect(() => {
    if (shift) {
      setStartTime(shift.start_time);
      setEndTime(shift.end_time);
      setInfo(shift.info);
      setPosition(shift.positions)
    }
  }, [shift]);

  const compareShift = (shift1, shift2) => {
    return (
      shift1.start_time == shift2.start_time &&
      shift1.end_time == shift2.end_time &&
      shift1.info == shift2.info && (shift2.position_id.length > 0 ? shift1.positions == shift2.positions : true)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const shiftObj = {
      employee_id: employee ? employee.id : null,
      start_time: startTime,
      end_time: endTime,
      info,
      date: shift ? shift.date : date,
      department_id: current.department,
      published: employee ? false : true,
      position_id: employee ? [] : position.map(pos => pos.id),
    };
    shift
      ? compareShift(shift, shiftObj)
        ? ""
        : dispatch(updateShift(shift.id, shiftObj))
      : dispatch(addShift(shiftObj));
    if (startTime && endTime) {
      setStartTime("");
      setEndTime("");
      setInfo("");
      onClose();
      updating
        ? toast.success("Shift updated!")
        : toast.success("Shift added!");
    }
  };

  const deleteShiftByID = (id) => {
    dispatch(deleteShift(id));
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
    <div className="staffForm">
      <h1 style={{ fontSize: "28px", textAlign: "center", color: "black" }}>
        Create Shift
      </h1>
      <form onSubmit={onSubmit} className="staffForm__form">
        {employee && (
          <div className="staffForm__control">
          <label className="staffForm__label">Employee:</label>
          {employee ? (
            <input
              className="staffForm__input"
              type="text"
              name="employee"
              onChange={(e) => setEmployee(e.target.value)}
              value={`${employee.first_name} ${employee.last_name}`}
              disabled
            />
          ) : (
            <select value="" className="staffForm__input">
              <option value="" disabled>
                Select an Employee
              </option>
              {employees.map((employee) => (
                <option value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </select>
          )}
        </div>
        )}
        
        <div className="staffForm__times">
          <div className="staffForm__control">
            <label className="staffForm__label">Start Time:</label>
            <select
              className="staffForm__input"
              onChange={(e) => setStartTime(e.target.value)}
              name="starttime"
              value={startTime}
            >
              <option value="" disabled>
                Select a start time
              </option>
              {hours.map((time) => (
                <option key={time} value={`${time}`}>
                  {time}
                </option>
              ))}
            </select>
            {errors.start_time &&
            errors.start_time[0].includes("Time has wrong format") ? (
              <p className="error">This field may not be blank.</p>
            ) : (
              <p className="error">{errors.start_time}</p>
            )}
          </div>
          <div className="staffForm__control">
            <label className="staffForm__label">End Time:</label>
            <select
              className="staffForm__input"
              onChange={(e) => setEndTime(e.target.value)}
              name="endtime"
              value={endTime}
            >
              <option value="" disabled>
                Select an end time
              </option>
              <option value="Finish">Finish</option>
              {hours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <p className="error">{errors.end_time}</p>
          </div>
        </div>
        {popular_times.length > 0 && (
          <small className="staffForm__popular-title">Most Used Times</small>
        )}

        <div className="staffForm__popular-container">
          {popular_times.map((item, i) => (
            <p
              key={i}
              className="staffForm__popular"
              onClick={() => {
                setStartTime(item.start_time);
                setEndTime(item.end_time);
              }}
            >
              {item.start_time} - {item.end_time}
            </p>
          ))}
        </div>
        {!employee && (
          <div className="staffForm__control">
            <label className="staffForm__label">Position(s):</label>
            <PositionField many={true} departments={departments} position={position} setPosition={setPosition} positions={positions} />
        </div>
        )}
        

        <div className="staffForm__control">
          <label className="staffForm__label">Info:</label>
          <textarea
            className="staffForm__input"
            type="text"
            name="info"
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            rows="2"
          ></textarea>
        </div>
        <div className="staffForm__buttons">
          <button type="submit" className="btn-modal--confirm">
            {shift ? "Update" : "Create"}
          </button>
          <button
            onClick={() => {
              shift ? deleteShiftByID(shift.id) : onClose();
            }}
            className="btn-modal--cancel"
          >
            {shift ? "Delete" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShift;
