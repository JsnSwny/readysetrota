import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { updateSite } from "../../actions/employees";
import { toast } from "react-toastify";
import Title from "../common/Title";
import FeaturesSettings from "./FeaturesSettings";

const SettingsSite = ({ setSettingsView }) => {
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
      <Title name={`${current.site.name} Settings`} />
      <p className="banner__link" onClick={() => setSettingsView("Personal")}>
        View Personal Settings
      </p>
      <div className="settings wrapper--sm">
        <div className="settings__right">
          <FeaturesSettings />
        </div>
      </div>
    </Fragment>
  );
};

export default SettingsSite;
