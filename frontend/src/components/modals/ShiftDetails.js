import { parseISO, format } from "date-fns";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const ShiftDetails = ({
  employee,
  shiftEmployee,
  setShiftEmployee,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  breakLength,
  setBreakLength,
  openEmployee,
  setOpenEmployee,
}) => {
  let popular_times = useSelector((state) => state.shifts.popular_times);
  let employees = useSelector((state) => state.employees.employees);
  let errors = useSelector((state) => state.errors.msg);
  let sites = useSelector((state) => state.employees.sites);
  let current = useSelector((state) => state.employees.current);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );

  const timeInRange = (item) => {
    let date = new Date();
    let itemTimeToDate = date.setHours(item.substr(0, 2), item.substr(3, 5), 0);
    let maxTimeToDate = date.setHours(
      settings.max_time.substr(0, 2),
      settings.max_time.substr(3, 5),
      0
    );
    let minTimeToDate = date.setHours(
      settings.min_time.substr(0, 2),
      settings.min_time.substr(3, 5),
      0
    );
    return itemTimeToDate <= maxTimeToDate && itemTimeToDate >= minTimeToDate;
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
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }
  hours = hours.filter((item) => timeInRange(item));

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
  return (
    <Fragment>
      <div className="form__control">
        <label className="form__label">Employee:</label>
        {employee ? (
          <select
            value={shiftEmployee}
            onChange={(e) => setShiftEmployee(e.target.value)}
            className="form__input"
            disabled
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
            className="form__input"
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

      <div className="flex-container--between form__wrapper">
        <div className="form__control--third">
          <label className="form__label">Start Time:</label>
          <select
            className="form__input"
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
        <div className="form__control--third">
          <label className="form__label">Break:</label>
          <select
            onChange={(e) => setBreakLength(e.target.value)}
            className="form__input"
            value={breakLength}
          >
            {breaks.map((item) => (
              <option value={item.val}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="form__control--third">
          <label className="form__label">End Time:</label>
          <select
            className="form__input"
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
    </Fragment>
  );
};

export default ShiftDetails;
