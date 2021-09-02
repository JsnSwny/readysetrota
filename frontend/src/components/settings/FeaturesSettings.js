import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBusinessName } from "../../actions/employees";
import Switch from "react-switch";
import { updateSite } from "../../actions/employees";

const FeaturesSettings = () => {
  const user = useSelector((state) => state.auth.user);

  let current = useSelector((state) => state.employees.current);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );

  const [shiftApproval, setShiftApproval] = useState(false);
  const [forecasting, setForecasting] = useState(false);
  const [minTime, setMinTime] = useState("00:00");
  const [maxTime, setMaxTime] = useState("23:45");
  const [incremental, setIncremental] = useState("15");
  const dispatch = useDispatch();

  useEffect(() => {
    if (settings) {
      setShiftApproval(settings.shift_approval);
      setForecasting(settings.forecasting);
      setMinTime(settings.min_time);
      setMaxTime(settings.max_time);
      setIncremental(settings.time_increment);
    }
  }, [settings]);

  let incrementalList = [0, 5, 10, 15, 20, 30, 45];

  let minutes = ["00", "15", "30", "45"];

  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSite(current.site.id, {
        sitesettings: {
          ...settings,
          forecasting,
          shift_approval: shiftApproval,
          min_time: minTime,
          max_time: maxTime,
          time_increment: incremental,
        },
      })
    );
    toast.success("Submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Features</h3>
      <ul className="flex-container">
        <li
          onClick={() => setShiftApproval(!shiftApproval)}
          className="settings__check"
        >
          <span className={`checkbox ${shiftApproval ? "checked" : ""}`}>
            <i className="fas fa-check"></i>
          </span>{" "}
          Shift Approval
        </li>
        <li
          onClick={() => setForecasting(!forecasting)}
          className="settings__check"
        >
          <span className={`checkbox ${forecasting ? "checked" : ""}`}>
            <i className="fas fa-check"></i>
          </span>{" "}
          Forecasting
        </li>
      </ul>

      <hr className="separator--alt-3" />

      <h3>Times</h3>

      <div className="settings__control">
        <div className="settings__group">
          <label>Minimum Time</label>
          <select
            className="input"
            onChange={(e) => setMinTime(e.target.value)}
            name="starttime"
            value={minTime}
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
        </div>

        <div className="settings__group">
          <label>Maximum Time</label>
          <select
            className="input"
            onChange={(e) => setMaxTime(e.target.value)}
            name="endtime"
            value={maxTime}
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
        </div>
      </div>

      <div className="settings__control">
        <div className="settings__group">
          <label>Time Interval</label>
          <select
            className="input"
            onChange={(e) => setIncremental(e.target.value)}
            name="incremental"
            value={incremental}
          >
            <option value="" disabled>
              Select an incremental
            </option>
            {incrementalList.map((inc) => (
              <option key={inc} value={inc}>
                {inc} minutes
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn-3" type="submit">
        Apply
      </button>
    </form>
  );
};

export default FeaturesSettings;
