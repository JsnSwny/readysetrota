import React, { useState, useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TabItem from "../../common/TabItem";
import PersonalDetails from "./employees-form/PersonalDetails";
import {
  addEmployee,
  updateEmployee,
  getEmployees,
} from "../../../actions/employees";
import { parseISO, format, addDays } from "date-fns";
import Roles from "./employees-form/Roles";
import { getPositions } from "../../../actions/employees";
import Wage from "./employees-form/Wage";
import Status from "./employees-form/Status";
import { isInViewport } from "../../../utils/hooks/isInViewport";
import Permissions from "./employees-form/Permissions";

const EmployeesForm = () => {
  const dispatch = useDispatch();
  const personalRef = useRef(null);
  const wageRef = useRef(null);
  const statusRef = useRef(null);
  const rolesRef = useRef(null);
  const permissionsRef = useRef(null);

  const history = useHistory();
  const { formType, employeeId } = useParams();
  let [currentEmployee, setCurrentEmployee] = useState(false);
  const [currentSection, setCurrentSection] = useState("Personal Details");
  const employees = useSelector((state) => state.employees.employees);
  const sites = useSelector((state) => state.employees.sites);
  const current = useSelector((state) => state.employees.current);
  const loading = useSelector((state) => state.loading);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [wage, setWage] = useState(0.0);
  const [wageType, setWageType] = useState("H");
  const [positionList, setPositionList] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [startWorkingDate, setStartWorkingDate] = useState(new Date());
  const [endWorkingDate, setEndWorkingDate] = useState("");
  const [wageDate, setWageDate] = useState(new Date());

  useEffect(() => {
    if (employeeId && employees.length > 0) {
      let employee = employees.find((item) => item.id == employeeId);

      setCurrentEmployee(employee);
      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setPositionList(employee.position.map((item) => item));
      if (employee.wage) {
        setWageDate(addDays(parseISO(employee.wage[0].start_date), 1));
      }
      setSelectedDepartments([
        ...new Set(employee.position.map((item) => item.department)),
      ]);
      setPermissions(employee.permissions.map((item) => item.id));

      setStartWorkingDate(
        employee.current_status.start_date
          ? parseISO(employee.current_status.start_date)
          : new Date()
      );

      setEndWorkingDate(
        employee.current_status.end_date
          ? parseISO(employee.current_status.end_date)
          : ""
      );
    }
  }, [employees]);

  const personalDetailsProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  };

  const wageProps = {
    wage,
    setWage,
    wageType,
    setWageType,
    currentEmployee,
    wageDate,
    setWageDate,
  };

  const statusProps = {
    startWorkingDate,
    setStartWorkingDate,
    endWorkingDate,
    setEndWorkingDate,
  };

  const [availability, setAvailability] = useState({
    0: { name: "unselected", start_time: null, end_time: null },
    1: { name: "unselected", start_time: null, end_time: null },
    2: { name: "unselected", start_time: null, end_time: null },
    3: { name: "unselected", start_time: null, end_time: null },
    4: { name: "unselected", start_time: null, end_time: null },
    5: { name: "unselected", start_time: null, end_time: null },
    6: { name: "unselected", start_time: null, end_time: null },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const employee = {
      first_name: firstName,
      last_name: lastName,
      wage: {
        wage: parseFloat(wage),
        wage_type: wageType,
        start_date: format(wageDate, "yyyy-MM-dd"),
      },

      position_id: positionList.map((pos) => pos.id),
      business_id: current.business.id,
      default_availability: availability,
      permissions_id: permissions,
      start_working_date: format(startWorkingDate, "yyyy-MM-dd"),
      end_working_date: endWorkingDate
        ? format(endWorkingDate, "yyyy-MM-dd")
        : "",
    };

    if (formType == "edit") {
      dispatch(updateEmployee(currentEmployee.id, employee));
      // toast.success("Employee updated!");
    } else {
      dispatch(addEmployee(employee));
      // toast.success("Employee added!");
    }
    history.push("/employees");
  };

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Fragment>
      <div className={`employees__section tab active`}>
        <h3>
          {currentEmployee ? currentEmployee.full_name : "Add a new employee"}
        </h3>
        <Link
          to="/employees"
          className="tab__link"
          params={{ sectionParam: "Employees" }}
        >
          Back to employees
        </Link>
        <div className="tab__list">
          <TabItem
            title="Personal Details"
            current={isInViewport(personalRef)}
            setCurrent={setCurrentSection}
            scroll={() => scrollToRef(personalRef)}
          />
          <TabItem
            title="Roles"
            current={isInViewport(rolesRef)}
            setCurrent={setCurrentSection}
            scroll={() => scrollToRef(rolesRef)}
          />
          <TabItem
            title="Wage"
            current={isInViewport(wageRef)}
            setCurrent={setCurrentSection}
            scroll={() => scrollToRef(wageRef)}
          />
          <TabItem
            title="Status"
            current={isInViewport(statusRef)}
            setCurrent={setCurrentSection}
            scroll={() => scrollToRef(statusRef)}
          />

          <TabItem
            title="Permissions"
            current={isInViewport(permissionsRef)}
            setCurrent={setCurrentSection}
            scroll={() => scrollToRef(permissionsRef)}
          />
          <TabItem
            title="Availability and Holidays"
            current={false}
            setCurrent={setCurrentSection}
          />
        </div>
      </div>

      <div className="form-block">
        <div className="wrapper--xs">
          <form onSubmit={onSubmit}>
            <div className="employees-form" ref={personalRef}>
              <div className="form-block__heading">
                <h3>Personal Details</h3>
              </div>
              <PersonalDetails {...personalDetailsProps} />
            </div>

            <div className="employees-form" ref={rolesRef}>
              <div className="form-block__heading">
                <h3>Roles</h3>
              </div>
              <Roles
                positionList={positionList}
                setPositionList={setPositionList}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
              />
            </div>

            <div className="employees-form employees-form--wage" ref={wageRef}>
              <div className="form-block__heading">
                <h3>Wage</h3>
              </div>
              <Wage {...wageProps} />
            </div>

            <div className="employees-form" ref={statusRef}>
              <div className="form-block__heading">
                <h3>Status</h3>
              </div>
              <Status {...statusProps} />
            </div>

            <div className="employees-form" ref={permissionsRef}>
              <div className="form-block__heading">
                <h3>Permissions</h3>
              </div>
              <Permissions
                permissions={permissions}
                setPermissions={setPermissions}
              />
            </div>

            <div className="form-bottom-banner">
              <div className="wrapper--xs flex-container--end">
                <button type="submit" className="btn-3">
                  {formType == "create" ? "Create Employee" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeesForm;
