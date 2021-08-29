import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { updateSite } from "../../actions/employees";
import { toast } from "react-toastify";
import Title from "../common/Title";

const Settings = () => {
  let sites = useSelector((state) => state.employees.sites);
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

  return (
    <div className="wrapper--lg">
      <div className="banner">
        <div className="wrapper--md">
          <h1 className="header">
            <Title name="Site Settings" breakWord={true} />
          </h1>
        </div>
      </div>
      <div className="settings wrapper--md">
        <div className="flex-container--between settings__wrapper">
          <div className="settings__item">
            <h2>Shift Approval</h2>
            <p>
              The business owner has to approve incoming shifts from site
              managers
            </p>
          </div>
          <Switch
            onChange={() => {
              setShiftApproval(!shiftApproval);
            }}
            checked={shiftApproval}
            onColor={"#EE6DE7"}
          />
        </div>

        <hr />
        <div className="flex-container--between settings__wrapper">
          <div className="settings__item">
            <h2>Forecasting</h2>
            <p>Set the start and end times for shift creation</p>
          </div>
          <Switch
            onChange={() => {
              setForecasting(!forecasting);
            }}
            checked={forecasting}
            onColor={"#EE6DE7"}
          />
        </div>
        <hr />
        <div className="flex-container--between settings__wrapper">
          <div className="settings__item">
            <h2>Shift Times</h2>
            <p>Set the start and end times for shift creation</p>
          </div>
          <div className="form__wrapper">
            <div className="form__control">
              <label className="form__label">Minimum Time:</label>
              <select
                className="form__input"
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
            <div className="form__control">
              <label className="form__label">Maximum Time:</label>
              <select
                className="form__input"
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
        </div>
        <hr />
        <div className="flex-container--between settings__wrapper">
          <div className="settings__item">
            <h2>Shift Time Interval</h2>
            <p>Set the interval between shift times</p>
          </div>
          <select
            className="form__input"
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
          {/* <input
            type="number"
            onChange={(e) => {
              setIncremental(e.target.value);
            }}
            value={incremental}
          /> */}
        </div>
        <button
          className="form__save"
          onClick={() => {
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
            toast.success("Settings Applied!");
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Settings;
