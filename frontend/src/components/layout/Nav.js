import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import GuestLinks from "./GuestLinks";
import { setSite } from "../../actions/employees";

import NavLink from "./NavLink";
import Select from "react-select";
import MobileNav from "./MobileNav";

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

  const [mobileNav, setMobileNav] = useState(false);

  const siteOptions = [...sites].map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const dispatch = useDispatch();
  return (
    <Fragment>
      <MobileNav
        siteOptions={siteOptions}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />
      <nav className="nav">
        <div className="nav__container flex-container wrapper--md">
          <div className="nav__section">
            <Link to="/" className="flex-container--align-center">
              <img
                className="nav__logo"
                src="/static/media/logo-with-text.svg"
              />
            </Link>
          </div>
          {isAuthenticated ? (
            <Fragment>
              <div className="nav__section nav__section--links">
                <ul className="nav__list">
                  <NavLink
                    title="Home"
                    link=""
                    dropdown={
                      !user.business && [
                        {
                          name: "Your Shifts",
                          link: "/shifts",
                          perm: false,
                        },
                      ]
                    }
                  ></NavLink>
                  <NavLink
                    title="Rota"
                    link="rota"
                    dropdown={[
                      {
                        name: "Rota",
                        link: "/rota",
                      },
                      {
                        name: "Timesheet",
                        link: "/timesheet",
                        perm: "manage_timeclock",
                      },
                      {
                        name: "Timeclock App",
                        link: "/timeclock",
                        perm: "open_timeclock_app",
                      },
                    ]}
                  ></NavLink>
                  <NavLink
                    title="People"
                    link="employees"
                    perms={[
                      "manage_departments",
                      "manage_positions",
                      "manage_employees",
                    ]}
                    dropdown={[
                      {
                        name: "Employees",
                        link: "/employees",
                        perm: "manage_employees",
                      },
                      { name: "Sites", link: "/sites", perm: "manage_sites" },
                      {
                        name: "Departments",
                        link: "/departments",
                        perm: "manage_departments",
                      },
                      {
                        name: "Positions",
                        link: "/positions",
                        perm: "manage_positions",
                      },
                    ]}
                  ></NavLink>
                  <NavLink
                    title="Reporting"
                    link="reports"
                    perms={["manage_forecast", "view_report"]}
                    dropdown={[
                      {
                        name: "Reports",
                        link: "/reports",
                        perm: "view_report",
                      },
                      {
                        name: "Forecasting",
                        link: "/forecasting",
                        perm: "manage_forecast",
                      },
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
                <div className="nav__hamburger">
                  <i
                    class="fas fa-bars"
                    onClick={() => setMobileNav(!mobileNav)}
                  ></i>
                </div>
                <div className="nav__section-content flex-container">
                  <div>
                    <Select
                      className="react-select-container"
                      classNamePrefix="nav-select"
                      value={siteOptions.find(
                        (item) => item.value == current.site.id
                      )}
                      onChange={(e) => {
                        e.value != current.site.id &&
                          dispatch(
                            setSite(sites.find((item) => item.id == e.value))
                          );
                      }}
                      options={siteOptions}
                      placeholder={"Select a site"}
                    />
                  </div>
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
                        {user.business ? (
                          <Link
                            className="nav__profileDropdown-link"
                            to="/billing"
                          >
                            Subscription & Billing
                          </Link>
                        ) : (
                          ""
                        )}
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
              </div>
            </Fragment>
          ) : (
            <GuestLinks mobileNav={mobileNav} setMobileNav={setMobileNav} />
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Nav;
