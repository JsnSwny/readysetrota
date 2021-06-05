import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CopyUUID from "../../common/CopyUUID";
import { toast } from "react-toastify";
import DashboardBlock from "./DashboardBlock";
import Switch from "react-switch";
import { getEmployees } from "../../../actions/employees";
import { format } from "date-fns";

const StaffPicker = (props) => {
  const dispatch = useDispatch();
  const { setOpen, setUpdate, setType } = props;
  let business = useSelector((state) => state.employees.business);
  let user = useSelector((state) => state.auth.user);
  let current = useSelector((state) => state.employees.current);
  let plan = useSelector((state) => state.employees.business.plan);
  let total_employees = useSelector(
    (state) => state.employees.business.total_employees
  );
  let employees = useSelector((state) => state.employees.employees);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let departments = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.positions);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let [showAll, setShowAll] = useState(
    localStorage.getItem("show_all_employees")
      ? localStorage.getItem("show_all_employees") == "true"
        ? true
        : false
      : true
  );

  function numberWithCommas(x) {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const isSiteAdmin = (user_id) => {
    return sites.find((site) => site.id == current.site.id)
      ? sites
          .find((site) => site.id == current.site.id)
          .admins.includes(user_id)
      : false;
  };

  const isDepartmentAdmin = (user_id) => {
    return departments.find((dep) => dep.id == current.department.id)
      ? departments
          .find((dep) => dep.id == current.department.id)
          .admins.includes(user_id)
      : false;
  };

  const [staffSort, setStaffSort] = useState(
    localStorage.getItem("staff_sort")
      ? localStorage.getItem("staff_sort")
      : "alphabetical"
  );

  const sortEmployees = () => {
    if (positions.length > 0 && employees.length > 0) {
      switch (staffSort) {
        case "position":
          console.log(employees);
          console.log(positions);
          return employees.sort(
            (a, b) =>
              positions.find(
                (pos) =>
                  pos.id ==
                  a.position.find(
                    (item) => item.department.id == current.department.id
                  ).id
              ).order -
              positions.find(
                (pos) =>
                  pos.id ==
                  b.position.find(
                    (item) => item.department.id == current.department.id
                  ).id
              ).order
          );

        default:
          return employees.sort((a, b) =>
            a.first_name.localeCompare(b.first_name)
          );
      }
    } else {
      return employees;
    }
  };

  return (
    <DashboardBlock>
      <div className="dashboard__block-title-container">
        <div className="flex-container--align-center">
          <p className="dashboard__block-title">
            Staff ({business.number_of_employees} / {total_employees})
          </p>
          {permissions.includes("manage_employees") && (
            <i
              onClick={() => {
                if (plan == "F" && business.number_of_employees >= 15) {
                  toast.warning(
                    "Upgrade to premium to create more than 15 employees"
                  );
                  return false;
                } else if (business.number_of_employees >= total_employees) {
                  toast.warning(
                    `You have reached your max number of ${total_employees} employees!`
                  );
                  return false;
                }
                setOpen(true);
                setUpdate(false);
                setType("employeeprofile");
              }}
              className="fas fa-plus"
            ></i>
          )}
        </div>
      </div>
      <small className="helper-text">
        <i class="fas fa-info-circle"></i> Click the clipboard icon to copy the
        employee's unique ID which you can send to them to sign up.
      </small>
      {loading.employees && (
        <small className="loading-text">Loading staff...</small>
      )}
      {employees.length > 0 && (
        <Fragment>
          <div className="flex-container--align-center-wrap">
            <span
              onClick={() => {
                setStaffSort("alphabetical");
                localStorage.setItem("staff_sort", "alphabetical");
              }}
              className={`btn-toggle--sm ${
                staffSort == "alphabetical" ? "active" : ""
              }`}
            >
              Sort Alphabetically
            </span>
            <span
              onClick={() => {
                setStaffSort("position");
                localStorage.setItem("staff_sort", "position");
              }}
              className={`btn-toggle--sm ${
                staffSort == "position" ? "active" : ""
              }`}
            >
              Sort by Position
            </span>
            <div>
              <p>Show All Employees</p>
              <Switch
                onChange={() => {
                  localStorage.setItem("show_all_employees", !showAll);
                  dispatch(getEmployees());
                  setShowAll(!showAll);
                }}
                checked={showAll}
                onColor={"#EC70C9"}
              />
            </div>
          </div>
        </Fragment>
      )}

      <div className="dashboard__wrapper">
        {sortEmployees().map((item) => (
          <div key={item.id} className="dashboard__item--sm">
            <div
              className={`title-md bold flex-container--between-center ${
                isSiteAdmin(item.user) ? "admin" : ""
              }`}
            >
              <Link to={`/profile/${item.id}`}>
                {item.first_name} <strong>{item.last_name}</strong>
              </Link>

              <div className="flex dashboard__icons">
                {item.user && (
                  <i
                    className={`fas fa-crown ${
                      isSiteAdmin(item.user)
                        ? "site-admin"
                        : isDepartmentAdmin(item.user)
                        ? "department-admin"
                        : ""
                    }`}
                  ></i>
                )}

                {permissions.includes("manage_employees") && !item.user && (
                  <CopyUUID employee={item} />
                )}
                {item.user != user.id &&
                  permissions.includes("manage_employees") && (
                    <i
                      onClick={() => {
                        setOpen(true);
                        setUpdate(item);
                        setType("employeeprofile");
                      }}
                      className="fas fa-edit"
                    ></i>
                  )}
              </div>
            </div>

            <p className="subtitle-sm">
              {item.position.map(
                (position) =>
                  position.department.id == current.department.id && (
                    <span key={position.id}>{position.name}</span>
                  )
              )}
            </p>
            {permissions.includes("manage_wages") &&
              item.current_wage &&
              ["H", "S"].includes(item.current_wage.type) && (
                <Fragment>
                  <p className="subtitle-sm">
                    £{numberWithCommas(item.current_wage.amount)}{" "}
                    {item.current_wage.type == "H" ? "(Hourly)" : "(Yearly)"}
                  </p>
                </Fragment>
              )}
          </div>
        ))}
      </div>
    </DashboardBlock>
  );
};

export default StaffPicker;
