import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyUUID from "../../common/CopyUUID";
import { toast } from "react-toastify";

const StaffPicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  let business = useSelector((state) => state.employees.business);
  let user = useSelector((state) => state.auth.user);
  let current = useSelector(
    (state) => state.employees.current
  );
  let plan = useSelector((state) => state.employees.business.plan);
  let total_employees = useSelector(
    (state) => state.employees.business.total_employees
  );
  let employees = useSelector(state => state.employees.employees)
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites)
  let departments = useSelector((state) => state.employees.departments)

  let current_site = sites.find(item => item.id == current.site) ? sites.find(item => item.id == current.site) : false;

  const isSiteAdmin = (user_id) => {
    return sites.find(site => site.id == current.site) ? sites.find(site => site.id == current.site).admins.includes(user_id) : false;
  }

  const isDepartmentAdmin = (user_id) => {
    return departments.find(dep => dep.id == current.department) ? departments.find(dep => dep.id == current.department).admins.includes(user_id) : false;
  }


  return (
    <Fragment>
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">
              Staff ({business.number_of_employees} / {total_employees})
            </p>

            <i
              onClick={() => {
                if (plan == "F" && business.number_of_employees >= 10) {
                  toast.warning(
                    "Upgrade to premium to create more than 10 employees"
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
                setType("Staff");
              }}
              className="fas fa-plus-square"
            ></i>
          </div>
          {loading.employees && <small class="loading-text">Loading staff...</small>}
          <div className="dashboard__wrapper">
            {employees.map((item) => (
              <div key={item.id} className="dashboard__item--sm">
                <div className={`title-md bold ${isSiteAdmin(item.user) ? "admin" : ""}`}>
                  <Link to={`/profile/${item.id}`}>
                    {item.first_name} <strong>{item.last_name}</strong>
                  </Link>
                  <div>
                    {item.user && (
                      <i
                      class={`fas fa-crown ${isSiteAdmin(item.user) ? "site-admin" : isDepartmentAdmin(item.user) ? "department-admin" : ""}`}></i>
                    )}
                    
                    {business && !item.user && <CopyUUID employee={item} />}
                    {item.user != user.id && (
                    <i
                      onClick={() => {
                        setOpen(true);
                        setUpdate(item);
                        setType("Staff");
                      }}
                      class="fas fa-edit"
                    ></i>)}
                  </div>
                  
                </div>

                <p className="subtitle-sm">
                  {item.position.map(
                    (position) =>
                      position.department.id == current.department && (
                        <span key={position.id}>{position.name}</span>
                      )
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StaffPicker;
