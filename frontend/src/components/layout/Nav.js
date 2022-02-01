import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import GuestLinks from "./GuestLinks";
import { setSite } from "../../actions/employees";

import NavLink from "./NavLink";

const Nav = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let user = useSelector((state) => state.auth.user);
  let sites = useSelector((state) => state.employees.sites);
  let current = useSelector((state) => state.employees.current);
  const location = useLocation().pathname;

  const isActive = (link) => {
    return link == "" && location == "/"
      ? "active"
      : link && location.includes(link)
      ? "active"
      : "";
  };

  const dispatch = useDispatch();
  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__container flex-container wrapper--md">
          <div className="nav__section">
            <Link to="/" className="flex-container--align-center">
              <img className="nav__logo" src="/static/media/logo-3.svg" />
            </Link>
          </div>
          {isAuthenticated ? (
            <Fragment>
              <div className="nav__section nav__section--links">
                <ul className="nav__list">
                  <NavLink title="Dashboard" link="" />
                  <NavLink
                    title="Rota"
                    link="rota"
                    dropdown={[
                      { name: "Timesheet", link: "/timesheet" },
                      { name: "Timeclock App", link: "/timeclock" },
                    ]}
                  ></NavLink>
                  <NavLink
                    title="People"
                    link="departments"
                    perms={[
                      "manage_departments",
                      "manage_positions",
                      "manage_employees",
                    ]}
                    dropdown={[
                      { name: "Departments", link: "/departments" },
                      { name: "Positions", link: "/positions" },
                      { name: "Employees", link: "/employees" },
                    ]}
                  ></NavLink>
                  <NavLink
                    title="Reporting"
                    link="reports"
                    dropdown={[
                      { name: "Forecasting", link: "/forecasting" },
                      { name: "Reports", link: "/reports" },
                    ]}
                  ></NavLink>

                  <NavLink
                    title="Availability"
                    link="availability"
                    perms={["manage_availabilities"]}
                  />
                </ul>
              </div>

              <div className="nav__section">
                <div className="nav__profile">
                  <i class="far fa-user"></i>
                  <i class="fas fa-angle-down"></i>
                  <div className="nav__profileDropdown-container">
                    <div className="nav__profileDropdown">
                      <div>
                        {user.business
                          ? user.business.name
                          : `${user.first_name} ${user.last_name}`}
                      </div>
                      <div>{user.email}</div>
                      <hr className="separator--alt-2"></hr>
                      {sites.map((item) => (
                        <div
                          className={`nav__site ${
                            current.site.id == item.id ? "active" : ""
                          }`}
                          onClick={() =>
                            current.site.id != item.id &&
                            dispatch(setSite(item))
                          }
                        >
                          {item.name}
                        </div>
                      ))}
                      <hr className="separator--alt-2"></hr>
                      {user.business ? (
                        <Link
                          className="nav__profileDropdown-link"
                          to="/settings"
                        >
                          Settings
                        </Link>
                      ) : (
                        ""
                      )}

                      <Link
                        className="nav__profileDropdown-link"
                        to="/changepassword"
                      >
                        Change Password
                      </Link>

                      <div
                        onClick={() => {
                          dispatch(logout());
                        }}
                        className="nav__profileDropdown-link"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <GuestLinks />
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Nav;
