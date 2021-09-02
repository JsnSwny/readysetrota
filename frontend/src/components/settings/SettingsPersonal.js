import React, { Fragment } from "react";
import Title from "../common/Title";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const SettingsPersonal = ({ setSettingsView }) => {
  return (
    <Fragment>
      <div className="banner">
        <div className="wrapper--sm">
          <h1 className="header">
            <Title name="Personal Settings" breakWord={true} />
          </h1>
          <p className="banner__link" onClick={() => setSettingsView("Site")}>
            View Site Settings
          </p>
        </div>
      </div>

      <div className="settings wrapper--sm">
        <div className="settings__right">
          <AccountSettings />
          {/* <hr className="separator--alt-3" />
          <EmailSettings /> */}
          <hr className="separator--alt-3" />
          <PasswordSettings />
        </div>
      </div>
    </Fragment>
  );
};

export default SettingsPersonal;
