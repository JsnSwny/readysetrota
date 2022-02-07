import React, { useState } from "react";
import { setSite } from "../../actions/employees";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MobileLink from "./MobileLink";
import MobileSublink from "./MobileSublink";
import { logout } from "../../actions/auth";

const MobileNav = ({ siteOptions, mobileNav, setMobileNav }) => {
  const sites = useSelector((state) => state.employees.sites);
  const current = useSelector((state) => state.employees.current);
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeNav = () => {
    setOpenDropdown(false);
    setMobileNav(false);
  };

  if (auth.isAuthenticated) {
    return (
      <nav className={`mobile-nav ${mobileNav ? "open" : ""}`}>
        <div className="mobile-nav__wrapper wrapper--md">
          <div className="mobile-nav__heading">
            <h4>
              {auth.user.first_name}{" "}
              {!auth.user.business && auth.user.last_name}{" "}
              <Link to="/settings" onClick={() => closeNav()}>
                <i class="fas fa-cog"></i>
              </Link>
            </h4>
            <i className="fas fa-times" onClick={() => closeNav()}></i>
          </div>
          <Select
            className="react-select-container--mobile"
            classNamePrefix="nav-select"
            value={siteOptions.find((item) => item.value == current.site.id)}
            onChange={(e) => {
              e.value != current.site.id &&
                dispatch(setSite(sites.find((item) => item.id == e.value)));
              closeNav();
            }}
            options={siteOptions}
            placeholder={"Select a site"}
          />
          <hr className="mobile-nav__separator" />
          <ul className="mobile-nav__links">
            <MobileLink
              closeNav={closeNav}
              icon={"fa-th-large"}
              title="Dashboard"
              link="/"
            />

            <MobileLink
              closeNav={closeNav}
              icon={"fa-briefcase"}
              title="Rota"
              link="/rota"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              perms={["manage_timeclock"]}
            >
              <MobileSublink
                title="Timesheet"
                link="/timesheet"
                closeNav={closeNav}
                perm="manage_timeclock"
              />
            </MobileLink>

            <MobileLink
              closeNav={closeNav}
              icon={"fa-users"}
              title="Employees"
              link="/employees"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              perms={[
                "manage_sites",
                "manage_departments",
                "manage_positions",
                "manage_employees",
              ]}
            >
              <MobileSublink
                title="Sites"
                link="/sites"
                closeNav={closeNav}
                perm="manage_sites"
              />
              <MobileSublink
                title="Departments"
                link="/departments"
                closeNav={closeNav}
                perm="manage_departments"
              />
              <MobileSublink
                title="Positions"
                link="/positions"
                closeNav={closeNav}
                perm="manage_positions"
              />
              <MobileSublink
                title="Employees"
                link="/employees"
                closeNav={closeNav}
                perm="manage_employees"
              />
            </MobileLink>

            <MobileLink
              closeNav={closeNav}
              icon={"fa-chart-line"}
              title="Reporting"
              link="/reports"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              perms={["manage_positions", "manage_forecast"]}
            >
              <MobileSublink
                title="Forecasting"
                link="/forecasting"
                closeNav={closeNav}
                perm="manage_forecast"
              />
              <MobileSublink
                title="Reports"
                link="/reports"
                closeNav={closeNav}
                perm="view_report"
              />
            </MobileLink>
            <MobileLink
              closeNav={closeNav}
              icon={"fa-calendar"}
              title="Availability"
              link="/availability"
              perms={["manage_availabilities"]}
            />
            <div className="mobile-nav__bottom-links">
              <MobileLink
                closeNav={closeNav}
                icon={"fa-power-off"}
                title="Log out"
                link="/"
                onClick={() => {
                  dispatch(logout());
                }}
              />
            </div>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className={`mobile-nav ${mobileNav ? "open" : ""}`}>
        <div className="mobile-nav__wrapper wrapper--md">
          <div className="mobile-nav__heading">
            <h4>readysetrota</h4>
            <i className="fas fa-times" onClick={() => setMobileNav(false)}></i>
          </div>
          <hr className="mobile-nav__separator" />
          <ul className="mobile-nav__links">
            <MobileLink
              closeNav={closeNav}
              icon={"fa-sign-in-alt"}
              title="Login"
              link="/login"
            />
            <MobileLink
              closeNav={closeNav}
              icon={"fa-user-edit"}
              title="Register"
              link="/register"
            />
          </ul>
        </div>
      </nav>
    );
  }
};

export default MobileNav;
