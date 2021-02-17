import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, deleteShift, updateShift } from "../../actions/shifts";
import { toast } from "react-toastify";
import PositionField from "../employees/PositionField";
import { getErrors } from "../../actions/errors";

const AddShift = (props) => {
  const { date, employee, onClose, update } = props;
  let updating = update ? true : false;

  let errors = useSelector((state) => state.errors.msg);
  let current = useSelector((state) => state.employees.current);
  const [position, setPosition] = useState([]);
  let departments = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.all_positions);
  let employees = useSelector((state) => state.employees.employees);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");
  const [openEmployee, setOpenEmployee] = useState("");
  const [shiftEmployee, setShiftEmployee] = useState(
    employee ? employee.id : ""
  );
  const [breakLength, setBreakLength] = useState(0);
  const [absence, setAbsence] = useState("None");

  let error_obj = {};

  const dispatch = useDispatch();

  let popular_times = useSelector((state) => state.shifts.popular_times);

  useEffect(() => {
    if (update) {
      setStartTime(update.start_time);
      setEndTime(update.end_time);
      setInfo(update.info);
      setPosition(
        update.positions.map((item) => positions.find((pos) => pos.id == item))
      );
      setBreakLength(update.break_length);
      setAbsence(update.absence);
    }
  }, [update]);

  const compareShift = (shift1, shift2) => {
    return (
      shift1.start_time == shift2.start_time &&
      shift1.end_time == shift2.end_time &&
      shift1.absence == shift2.absence &&
      shift1.absence_info == shift2.absence_info &&
      shift1.info == shift2.info &&
      shift1.employee_id == shift2.employee_id &&
      (shift2.position_id.length > 0 || shift1.positions.length > 0
        ? shift1.positions == shift2.positions
        : true)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const shiftObj = {
      employee_id: shiftEmployee
        ? shiftEmployee
        : openEmployee
        ? openEmployee
        : null,
      start_time: startTime,
      end_time: endTime,
      info,
      date: update ? update.date : date,
      break_length: breakLength,
      absence: absence,
      department_id: current.department,
      stage: shiftEmployee || openEmployee ? "Unpublished" : "Published",
      position_id: shiftEmployee ? [] : position.map((pos) => pos.id),
    };
    error_obj = {
      start_time: startTime != "" ? true : "This field is required",
      end_time: endTime != "" ? true : "This field is required",
    };
    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      update
        ? compareShift(update, shiftObj)
          ? ""
          : dispatch(updateShift(update.id, shiftObj))
        : dispatch(addShift(shiftObj));

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

  const breaks = [
    { title: "No break", val: 0 },
    { title: "15 minutes", val: 15 },
    { title: "30 minutes", val: 30 },
    { title: "45 minutes", val: 45 },
    { title: "1 hour", val: 60 },
    { title: "1hr 15mins", val: 75 },
    { title: "1hr 30mins", val: 90 },
    { title: "1hr 45mins", val: 105 },
    { title: "2 hours", val: 120 },
  ];

  const absences = [
    "None",
    "Authorised",
    "Unauthorised",
    "Compassionate",
    "Other",
  ];
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
        {update ? "Update Shift" : "Create Shift"}
      </h1>
      <form onSubmit={onSubmit} className="staffForm__form">
        <div className="staffForm__control">
          <label className="staffForm__label">Employee:</label>
          {employee ? (
            <select
              value={shiftEmployee}
              onChange={(e) => setShiftEmployee(e.target.value)}
              className="staffForm__input"
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={openEmployee}
              onChange={(e) => setOpenEmployee(e.target.value)}
              className="staffForm__input"
            >
              <option value="">All Staff</option>
              {employees.map((employee) => (
                <option value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </select>
          )}
        </div>

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
            <p className="error">{errors.start_time}</p>
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
        <div className="staffForm__control">
          <label className="staffForm__label">Break:</label>
          <select
            onChange={(e) => setBreakLength(e.target.value)}
            className="staffForm__input"
            value={breakLength}
          >
            {breaks.map((item) => (
              <option value={item.val}>{item.title}</option>
            ))}
          </select>
        </div>
        {update && (
          <div className="staffForm__control">
            <label className="staffForm__label">Absence:</label>
            <select
              onChange={(e) => setAbsence(e.target.value)}
              className="staffForm__input"
              value={absence}
            >
              {absences.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        )}
        {!employee && (
          <div className="staffForm__control">
            <label className="staffForm__label">Position(s):</label>
            <PositionField
              many={true}
              shift={update}
              departments={departments}
              position={position}
              setPosition={setPosition}
              positions={positions}
            />
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
            {update ? "Update" : "Create"}
          </button>
          <button
            onClick={() => {
              update ? deleteShiftByID(update.id) : onClose();
            }}
            className="btn-modal--cancel"
          >
            {update ? "Delete" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShift;
