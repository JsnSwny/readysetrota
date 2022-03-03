import React, { Fragment } from "react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

const GuestLinks = ({ setMobileNav, mobileNav }) => {
  return (
    <Fragment>
      <div className="nav__section">
        <ul className="nav__list">
          {/* <NavLink title="Dashboard" link="" /> */}
        </ul>
      </div>

      <div className="nav__section nav__section--links nav__section--guest">
        <div className="nav__hamburger">
          <i class="fas fa-bars" onClick={() => setMobileNav(!mobileNav)}></i>
        </div>
        <div className="nav__section-content flex-container--end-center">
          <Link className="guest-link" to="/login">
            Login
          </Link>
          <Link className="btn-3" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default GuestLinks;
