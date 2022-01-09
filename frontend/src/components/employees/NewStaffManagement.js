import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getPositions } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";
import Employees from "./Employees";
import Departments from "./Departments";
import Positions from "./Positions";

const NewStaffManagement = () => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let [currentEmployee, setCurrentEmployee] = useState(false);
  let [currentEmployeeObj, setCurrentEmployeeObj] = useState({});
  const employees = useSelector((state) => state.employees.employees);

  const [currentSection, setCurrentSection] = useState("Departments");

  useEffect(() => {
    if (!loading.departments && !loading.sites) {
      if (sites.length > 0) {
        dispatch(getPositions(false));
        dispatch(getEmployees(true, false));
      }
    }
  }, [current.department, current.site]);

  const getSection = () => {
    switch (currentSection) {
      case "Departments":
        return <Departments />;
      case "Positions":
        return <Positions />;
      case "Employees":
        return <Employees />;
    }
  };

  return (
    <div className="wrapper--md">
      <div className="banner">
        <div className="list-title">
          <h2
            onClick={() => setCurrentSection("Departments")}
            className={`${currentSection == "Departments" ? "active" : ""}`}
          >
            <i class="fas fa-building"></i> Departments
          </h2>
          <h2
            onClick={() => setCurrentSection("Positions")}
            className={`${currentSection == "Positions" ? "active" : ""}`}
          >
            <i class="fas fa-tags"></i> Positions
          </h2>
          <h2
            onClick={() => setCurrentSection("Employees")}
            className={`${currentSection == "Employees" ? "active" : ""}`}
          >
            <i class="fas fa-user-tie"></i> Employees
          </h2>
        </div>
        <Title name={currentSection} breakWord={false} />
      </div>
      <div className="sidebar-list flex-container">
        {/* <div className="sidebar">
        <h4>Staff Management</h4>
        <ul className="sidebar__list">
          <li
            onClick={() => setCurrentSection("Departments")}
            className={`${currentSection == "Departments" ? "active" : ""}`}
          >
            <i class="fas fa-building"></i> Departments
          </li>
          <li
            onClick={() => setCurrentSection("Positions")}
            className={`${currentSection == "Positions" ? "active" : ""}`}
          >
            <i class="fas fa-tags"></i> Positions
          </li>
          <li
            onClick={() => setCurrentSection("Employees")}
            className={`${currentSection == "Employees" ? "active" : ""}`}
          >
            <i class="fas fa-user-tie"></i> Employees
          </li>
        </ul>
      </div> */}
        <div className="sidebar-list__right">{getSection()}</div>
      </div>
    </div>
  );
};

export default NewStaffManagement;
