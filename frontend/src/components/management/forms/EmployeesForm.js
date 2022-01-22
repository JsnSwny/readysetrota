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
import { parseISO, format } from "date-fns";
import Roles from "./employees-form/Roles";
import { getPositions } from "../../../actions/employees";
import Wage from "./employees-form/Wage";
import Status from "./employees-form/Status";
import { isInViewport } from "../../../utils/hooks/isInViewport";

const EmployeesForm = () => {
  const dispatch = useDispatch();
  const personalRef = useRef(null);
  const wageRef = useRef(null);
  const statusRef = useRef(null);
  const rolesRef = useRef(null);

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
  const [wageType, setWageType] = useState("N");
  const [positionList, setPositionList] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [siteAdmin, setSiteAdmin] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [startWorkingDate, setStartWorkingDate] = useState(new Date());
  const [endWorkingDate, setEndWorkingDate] = useState("");

  useEffect(() => {
    if (employeeId && employees.length > 0) {
      let employee = employees.find((item) => item.id == employeeId);

      setCurrentEmployee(employee);
      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setPositionList(employee.position.map((item) => item));
      setSelectedDepartments([
        ...new Set(employee.position.map((item) => item.department)),
      ]);
      setWage(employee.current_wage ? employee.current_wage.amount : 0);
      setWageType(employee.current_wage ? employee.current_wage.type : "N");
      setPermissions(employee.site_permissions);

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
      wage: wage,
      wage_type: wageType,
      position_id: positionList.map((pos) => pos.id),
      business_id: current.business.id,
      default_availability: availability,
      permissions,
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
            current={false}
            setCurrent={setCurrentSection}
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

            <div className="employees-form" ref={wageRef}>
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

            <div className="form-bottom-banner">
              <div className="wrapper--sm">
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
