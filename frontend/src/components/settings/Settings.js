import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { updateSite } from "../../actions/employees";
import { toast } from "react-toastify";
import Title from "../common/Title";
import PasswordSettings from "./PasswordSettings";
import AccountSettings from "./AccountSettings";
import EmailSettings from "./EmailSettings";

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
    <Fragment>
      <div className="banner">
        <div className="wrapper--sm">
          <h1 className="header">
            <Title name="Settings" breakWord={true} />
          </h1>
        </div>
      </div>
      <div className="settings wrapper--sm">
        <div className="settings__right">
          <AccountSettings />
          <hr className="separator--alt-3" />
          <EmailSettings />
          <hr className="separator--alt-3" />
          <PasswordSettings />
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
