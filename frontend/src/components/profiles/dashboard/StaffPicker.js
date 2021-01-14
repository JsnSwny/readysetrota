import React, { useState } from "react";
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
  let positions = useSelector((state) => state.employees.positions)

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const isSiteAdmin = (user_id) => {
    return sites.find(site => site.id == current.site) ? sites.find(site => site.id == current.site).admins.includes(user_id) : false;
  }

  const isDepartmentAdmin = (user_id) => {
    return departments.find(dep => dep.id == current.department) ? departments.find(dep => dep.id == current.department).admins.includes(user_id) : false;
  }

  const [staffSort, setStaffSort] = useState(localStorage.getItem("staff_sort") ? localStorage.getItem("staff_sort") : "alphabetical");

  const sortEmployees = () => {
    if(positions.length > 0) {
      switch(staffSort) {
        case "position":
          return employees.sort((a,b) => positions.find(pos => pos.id == a.position.find(item => item.department.id == current.department).id).order - positions.find(pos => pos.id == b.position.find(item => item.department.id == current.department).id).order)
          
        default:
          return employees.sort((a,b) => a.first_name.localeCompare(b.first_name));
      }
    } else {
      return employees;
    }
    
  }

  return (
    <div className="dashboard__block">
      <div className="dashboard__block-title-container">
        <div className="flex-container--align-center">
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
          className="fas fa-plus"
        ></i>
        </div>
        

        
      </div>
      {loading.employees && <small class="loading-text">Loading staff...</small>}
      <div className="flex-container--wrap">
        <span onClick={() => {
          setStaffSort("alphabetical")
          localStorage.setItem("staff_sort", "alphabetical")
        }} className={`btn-toggle--sm ${staffSort == "alphabetical" ? "active" : ""}`}>Sort Alphabetically</span>
        <span onClick={() => {
          setStaffSort("position")
          localStorage.setItem("staff_sort", "position")
        }} className={`btn-toggle--sm ${staffSort == "position" ? "active" : ""}`}>Sort by Position</span>
      </div>

      <div className="dashboard__wrapper">
        {sortEmployees().map((item) => (
          <div key={item.id} className="dashboard__item--sm">
            <div className={`title-md bold flex-container--between-center ${isSiteAdmin(item.user) ? "admin" : ""}`}>
              <Link to={`/profile/${item.id}`}>
                {item.first_name} <strong>{item.last_name}</strong>
              </Link>
              <div className="flex">
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
            <p className="subtitle-sm">{item.wage_type == "H" ? "Hourly" : "Salary"}</p>
            <p className="subtitle-sm">£{numberWithCommas(item.wage)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPicker;
