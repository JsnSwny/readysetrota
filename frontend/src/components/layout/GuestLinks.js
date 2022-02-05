import React, { Fragment } from "react";
import NavLink from "./NavLink";

const GuestLinks = ({ setMobileNav, mobileNav }) => {
  return (
    <Fragment>
      <div className="nav__section">
        <ul className="nav__list">
          {/* <NavLink title="Dashboard" link="" /> */}
        </ul>
      </div>

      <div className="nav__section">
        <div className="nav__hamburger">
          <i class="fas fa-bars" onClick={() => setMobileNav(!mobileNav)}></i>
        </div>
        <div className="nav__section-content flex-container">
          <NavLink alignRight={true} link="login" title="Login" />
          <NavLink alignRight={true} link="register" title="Register" />
        </div>
      </div>
    </Fragment>
  );
};

export default GuestLinks;
