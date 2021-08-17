import React, { Fragment } from "react";
import NavLink from "./NavLink";

const GuestLinks = () => {
  return (
    <Fragment>
      <div className="nav__section">
        <ul className="nav__list">
          {/* <NavLink title="Dashboard" link="" /> */}
        </ul>
      </div>

      <div className="nav__section">
        <NavLink alignRight={true} link="login" title="Login" />
        <NavLink alignRight={true} link="register" title="Register" />
      </div>
    </Fragment>
  );
};

export default GuestLinks;
