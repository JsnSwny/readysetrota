import { parseISO, format } from "date-fns";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TimePicker from "react-time-picker";

const TimeclockTab = ({
  startTimeClock,
  setStartTimeClock,
  endTimeClock,
  setEndTimeClock,
  breakLengthClock,
  setBreakLengthClock,
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

  return (
    <Fragment>
      <div className="flex-container--between form__wrapper">
        <div className="form__control--third">
          <label className="form__label">Start Time:</label>
          <input
            className="form__input"
            onChange={(e) => setStartTimeClock(e.target.value)}
            name="starttime"
            value={startTimeClock}
            type="time"
          />
          <p className="error">{errors.start_time}</p>
        </div>
        <div className="form__control--third">
          <label className="form__label">Break:</label>
          <input
            type="number"
            onChange={(e) => setBreakLengthClock(e.target.value)}
            className="form__input"
            value={breakLengthClock}
          />
        </div>
        <div className="form__control--third">
          <label className="form__label">End Time:</label>
          <input
            className="form__input"
            onChange={(e) => setEndTimeClock(e.target.value)}
            name="starttime"
            value={endTimeClock}
            type="time"
          />
          <p className="error">{errors.end_time}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default TimeclockTab;
