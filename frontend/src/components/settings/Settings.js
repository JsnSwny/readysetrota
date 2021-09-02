import React, { Fragment, useState, useEffect } from "react";
import SettingsPersonal from "./SettingsPersonal";
import SettingsSite from "./SettingsSite";

const Settings = () => {
  const [settingsView, setSettingsView] = useState("Personal");

  if (settingsView == "Personal") {
    return <SettingsPersonal setSettingsView={setSettingsView} />;
  } else {
    return <SettingsSite setSettingsView={setSettingsView} />;
  }
};

export default Settings;
