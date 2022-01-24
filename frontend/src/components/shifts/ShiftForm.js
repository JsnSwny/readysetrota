import React, { useState, useEffect } from "react";
import { addShift, updateShift } from "../../actions/shifts";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const ShiftForm = ({ shiftFormInfo, setOpen, editShift }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");
  const [breakLength, setBreakLength] = useState(0);
  const [absence, setAbsence] = useState("None");
  const [absenceInfo, setAbsenceInfo] = useState("");
  let popular_times = useSelector((state) => state.shifts.popular_times);
  const [startTimeClock, setStartTimeClock] = useState("");
  const [endTimeClock, setEndTimeClock] = useState("");
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  const [breakLengthClock, setBreakLengthClock] = useState(0);

  useEffect(() => {
    setStartTime(
      hours.find((e) => {
        return e.value == editShift.start_time;
      })
    );
    setEndTime(
      hours.find((e) => {
        return e.value == editShift.end_time;
      })
    );
    setBreakLength(
      breaks.find((e) => {
        return e.value == editShift.break_length;
      })
    );
    setInfo(editShift.info);
  }, [editShift]);

  const onSubmit = (e) => {
    e.preventDefault();

    const shiftObj = {
      employee_id: shiftFormInfo.employee.id,
      start_time: startTime.value,
      end_time: endTime.value,
      break_length: breakLength.value,
      date: shiftFormInfo.date,
      stage: "Published",
      info,
      position_id: [],
      department_id: shiftFormInfo.shiftDepartment,
    };

    editShift
      ? dispatch(updateShift(editShift.id, shiftObj))
      : dispatch(addShift(shiftObj));

    setOpen(false);
  };

  let minutes = ["00"];
  if (settings.time_increment > 0) {
    while (minutes[minutes.length - 1] + settings.time_increment < 60) {
      minutes.push(
        parseInt(minutes[minutes.length - 1]) +
          parseInt(settings.time_increment)
      );
    }
  }

  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) =>
            hours.push({
              value: `0${i.toString()}:${minute}`,
              label: `0${i.toString()}:${minute}`,
            })
          )
        : minutes.map((minute) =>
            hours.push({
              value: `${i.toString()}:${minute}`,
              label: `${i.toString()}:${minute}`,
            })
          )
    );
  }

  //   hours = hours.filter((item) => timeInRange(item));

  const breaks = [
    { label: "No break", value: 0 },
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "1 hour", value: 60 },
    { label: "1hr 15mins", value: 75 },
    { label: "1hr 30mins", value: 90 },
    { label: "1hr 45mins", value: 105 },
    { label: "2 hours", value: 120 },
  ];

  return (
    <form onSubmit={onSubmit} className="form__form shift-form">
      <div className="flex-container--between form__wrapper">
        <div className="form__control--third">
          <label className="form__label">Start Time*:</label>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={setStartTime}
            options={hours}
            autoFocus
            placeholder={"Select start time"}
            value={startTime}
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">Break:</label>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={setBreakLength}
            options={breaks}
            placeholder={"Select break length"}
            value={breakLength}
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">End Time*:</label>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={setEndTime}
            options={hours}
            placeholder={"Select end time"}
            value={endTime}
          />
        </div>
      </div>
      <ul className="tag-container--sm">
        {popular_times.map((item, i) => (
          <li
            key={i}
            className="tag clickable"
            onClick={() => {
              setStartTime({ value: item.start_time, label: item.start_time });
              setEndTime({ value: item.end_time, label: item.end_time });
              setBreakLength({
                value: item.break_length,
                label: breaks.find(
                  (breakItem) => breakItem.value == item.break_length
                ).label,
              });
            }}
          >
            {item.start_time} - {item.end_time}{" "}
            {item.break_length > 0 && `(${item.break_length})`}
          </li>
        ))}
      </ul>
      <div className="form__control">
        <label className="form__label">Info:</label>
        <textarea
          className="form__input textarea"
          type="text"
          name="info"
          onChange={(e) => setInfo(e.target.value)}
          value={info}
          rows="2"
        ></textarea>
      </div>
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Shift">
          {editShift ? "Save" : "Add Shift"}
        </button>
      </div>
    </form>
  );
};

export default ShiftForm;
