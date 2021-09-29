import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import {
  getAllAvailability,
  getForecast,
  getEmployees,
  getPositions,
} from "../../actions/employees";
import { publish, sendForApproval, approveShifts } from "../../actions/shifts";
import { format, parseISO, eachDayOfInterval, addDays, getDay } from "date-fns";
import Dates from "./Dates";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import Employee from "./Employee";
import { Redirect } from "react-router-dom";
import RotaBar from "./RotaBar";
import NoShift from "./NoShift";
import Shift from "./Shift";
import OpenShifts from "./OpenShifts";
import Title from "../common/Title";
import { getLeave } from "../../actions/availability";
import RotaDatePicker from "./RotaDatePicker";
import FinancialBar from "./FinancialBar";

const Rota = ({ modalProps, confirmProps }) => {
  const dispatch = useDispatch();

  // State Selectors
  let user = useSelector((state) => state.auth.user);
  let business = useSelector((state) => state.employees.business);
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let availability = useSelector((state) => state.employees.availability);
  let positions = useSelector((state) => state.employees.positions);
  let loading = useSelector((state) => state.loading);
  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let current = useSelector((state) => state.employees.current);
  let width = useSelector((state) => state.responsive.width);
  let departments = useSelector((state) => state.employees.departments);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );

  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let siteAdmin = permissions.includes("manage_shifts");
  let shiftPerm = permissions.includes("manage_shifts");

  let published_shifts = shifts.filter((item) => item.stage == "Published");

  // Use State
  const [employeesList, setEmployeesList] = useState(employees);
  const [filterDate, setFilterDate] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");
  const [showAvailabilities, setShowAvailabilities] = useState(false);
  const [publishDropdown, setPublishDropdown] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);
  const [template, setTemplate] = useState(false);
  const [limit, setLimit] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [financialMode, setFinancialMode] = useState("predicted");

  // Update Shifts
  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(current.site.id, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
    dispatch(getForecast(start_date, end_date));
    dispatch(getEmployees(true, false, start_date, end_date));
    dispatch(getPositions());
  };

  // Set Current Employee
  let current_employee = null;
  if (user.employee) {
    current_employee = employees.find((item) => item.user == user.id);
  }

  // Update shifts based on width
  const widthUpdate = (force = false) => {
    let currentDate = format(new Date(), "yyyy-MM-dd");
    if (width > 960) {
      if (currentDevice != "Desktop" || force) {
        updateShifts(
          date,
          format(addDays(parseISO(date, "dd-MM-yyyy"), 6), "yyyy-MM-dd")
        );
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet" || force) {
        updateShifts(currentDate, format(addDays(new Date(), 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet" || force) {
        updateShifts(currentDate, format(addDays(new Date(), 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile" || force) {
        updateShifts(currentDate, currentDate);
        setCurrentDevice("Mobile");
      }
    }
  };

  // Width initial update
  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    widthUpdate();
  }, [width]);

  // Update Shifts and Popular Times
  useEffect(() => {
    dispatch(getPopularTimes());
    widthUpdate(true);
  }, [current.site]);

  // Initialise employee list
  useEffect(() => {
    if (user && !user.business && current_employee) {
      if (employees.length > 0) {
        employees = employees.filter(
          (employee) => employee.id !== current_employee.id
        );
        employees.unshift(current_employee);
      }
    }
    setEmployeesList(employees);
    if (employees.length > business.total_employees) {
      let num = employees.length - business.total_employees;
      let id_list = employees
        .map((item) => item.id)
        .sort()
        .reverse();

      setLimit(id_list[num]);
    }
  }, [employees]);

  // Filter employees after shift update
  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate, true);
    }
    dispatch(getLeave(date, enddate));
  }, [shifts]);

  // Date range
  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date, department) =>
    shifts.filter((obj) => {
      return obj.employee &&
        obj.employee.id === employee &&
        obj.date === date &&
        obj.department == department
        ? siteAdmin
          ? true
          : obj.stage == "Published"
        : "";
    });

  const filterEmployees = (date, update = false) => {
    if (filterDate == date && update == false) {
      setFilterDate("");
      setEmployeesList(employees);
      return true;
    }
    let employeesOnDay = shifts.filter((obj) => {
      return obj.date == date && obj.employee && obj.employee.id;
    });
    let newEmployees = [];
    employeesOnDay.map((obj) => {
      !newEmployees.some((item) => item.id === obj.employee.id) &&
        newEmployees.push(employees.find((item) => item.id == obj.employee.id));
    });
    employees.map((obj) => {
      !newEmployees.some((item) => item.id === obj.id) &&
        newEmployees.push(obj);
    });
    setEmployeesList(newEmployees);
    setFilterDate(date);
  };

  const isAvailable = (employee, date) => {
    let available = availability.filter(
      (item) => item.employee.id == employee.id && item.date == date
    )[0];
    if (!available) {
      date = parseISO(date);
      available =
        employee.default_availability[getDay(date) == 0 ? 6 : getDay(date) - 1];
    }

    return available;
  };

  // Handle Scrolling
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [staffSort, setStaffSort] = useState(
    localStorage.getItem("staff_sort")
      ? localStorage.getItem("staff_sort")
      : "alphabetical"
  );

  const sortEmployees = () => {
    if (positions.length > 0 && filterDate == "") {
      switch (staffSort) {
        case "position":
          return employeesList.sort(
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
          return employeesList;
      }
    } else {
      return employeesList;
    }
  };

  return (
    <div>
      {permissions.includes("manage_wages") && (
        <FinancialBar
          {...modalProps}
          dates={result}
          financialMode={financialMode}
        />
      )}
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <h1 className="header">
            <Title name="Rota" breakWord={false} />
          </h1>
        </div>
      </div>
      <div className="rotaFunctions flex-container--between wrapper--md">
        <div className="rotaFunctions__wrapper">
          <div className="rotaFunctions__button-list">
            {permissions.includes("manage_shifts") && (
              <div className="dropdown">
                <div className="dropdown__wrapper">
                  <div
                    onClick={() => dispatch(publish())}
                    className={`dropdown__button ${
                      !user.business && settings.shift_approval
                        ? shifts.some(
                            (item) =>
                              parseISO(item.date) >= addDays(new Date(), -1) &&
                              item.stage == "Unpublished" &&
                              item.employee
                          )
                          ? ""
                          : "disabled"
                        : !shifts.some(
                            (item) =>
                              parseISO(item.date) >= addDays(new Date(), -1) &&
                              item.stage != "Published" &&
                              item.employee
                          )
                        ? "disabled"
                        : ""
                    }`}
                  >
                    Publish
                  </div>
                  <div
                    className={`dropdown__dropper ${
                      publishDropdown ? "active" : ""
                    }`}
                  >
                    {permissions.includes("manage_shifts") &&
                      !user.business &&
                      settings.shift_approval && (
                        <div
                          className={`dropdown__item ${
                            !shifts.some((item) => item.stage == "Creation")
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(sendForApproval());
                            setPublishDropdown(!publishDropdown);
                          }}
                        >
                          Send for Approval
                        </div>
                      )}
                    {permissions.includes("approve_shifts") &&
                      settings.shift_approval && (
                        <div
                          className={`dropdown__item ${
                            !shifts.some((item) => item.stage == "Approval")
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(approveShifts());
                            setPublishDropdown(!publishDropdown);
                          }}
                        >
                          Approve Shifts
                        </div>
                      )}
                  </div>
                </div>
                <i
                  onClick={() => setPublishDropdown(!publishDropdown)}
                  className="fas fa-caret-down"
                ></i>
              </div>
            )}
            {permissions.includes("manage_availabilities") &&
              business.plan != "F" && (
                <div
                  onClick={() => {
                    setShowAvailabilities(!showAvailabilities);
                  }}
                  className="rotaFunctions__button"
                >
                  Availabilities{" "}
                  <i
                    className={`fas ${
                      showAvailabilities ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </div>
              )}

            <a
              className={`rotaFunctions__button ${
                published_shifts.length == 0 ? "disabled" : ""
              }`}
              href={`${`/exportall?start_date=${date}&end_date=${enddate}&id=${current.site.id}`}`}
              target="_blank"
            >
              Export <i className="fas fa-file-download"></i>
            </a>
          </div>
        </div>
        <div className="rotaFunctions__wrapper">
          <RotaDatePicker updateShifts={updateShifts} />
        </div>

        <div className="rotaFunctions__wrapper">
          {permissions.includes("manage_wages") && (
            <div className={`rotaFunctions__selector ${financialMode}`}>
              <p
                onClick={() => setFinancialMode("predicted")}
                className={`${financialMode == "predicted" ? "selected" : ""}`}
              >
                Predicted
              </p>
              <p
                onClick={() => setFinancialMode("actual")}
                className={`${financialMode == "actual" ? "selected" : ""}`}
              >
                Actual
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        {(isLoading || loading.employees) && <Loading />}
        {current.department != 0 && (
          <div
            className={`rota ${isLoading ? "loading" : ""} wrapper--md ${
              filterDate ? "filtered" : ""
            }`}
          >
            {employees.length > 0 &&
              departments.map((dep, i) => (
                <div className="rota__department">
                  <div className="rota__heading flex-container--between-end">
                    <h2
                      className={`title-sm container-left ${
                        i > 0 ? "title--margin-top" : ""
                      }`}
                    >
                      {dep.name}
                    </h2>
                    <div className="container-right">
                      {result.map((date) => (
                        <div className="item-block">
                          <p>{format(date, "ccc")}</p>
                          <p>{format(date, "d MMM")}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="separator" />
                  {positions
                    .filter(
                      (posFilter) =>
                        posFilter.department.id == dep.id &&
                        employees.filter((employee) =>
                          employee.position.some(
                            (position) => posFilter.id == position.id
                          )
                        ).length > 0
                    )
                    .map((position) => (
                      <Fragment>
                        <h4 className="rota__position">{position.name}</h4>
                        {employees
                          .filter((emp) =>
                            emp.position.some((pos) => pos.id == position.id)
                          )
                          .map((employee, i) => (
                            <div key={employee.id} className="rota__container">
                              <Employee
                                employee={employee}
                                current_employee={current_employee}
                                shifts={shifts}
                                user={user}
                                department={dep.id}
                                result={result}
                                financialMode={financialMode}
                              />
                              <div className="container-right">
                                {result.map((result) => {
                                  const format_date = format(
                                    result,
                                    "yyyy-MM-dd"
                                  );
                                  let shifts = getEmployeeShift(
                                    employee.id,
                                    format_date,
                                    dep.id
                                  );
                                  if (financialMode == "actual") {
                                    shifts = shifts.filter(
                                      (item) => item.stage == "Published"
                                    );
                                  }
                                  let props = {
                                    format_date,
                                    result,
                                    available: isAvailable(
                                      employee,
                                      format_date
                                    ),
                                    limit,
                                    employee,
                                    showAvailabilities,
                                    filterDate,
                                    admin: shiftPerm,
                                  };

                                  return shifts.length > 0 ? (
                                    <Shift
                                      key={result}
                                      {...modalProps}
                                      {...props}
                                      shifts={shifts}
                                      financialMode={financialMode}
                                      shiftDepartment={dep.id}
                                    />
                                  ) : (
                                    <NoShift
                                      key={result}
                                      {...modalProps}
                                      {...props}
                                      shiftDepartment={dep.id}
                                      financialMode={financialMode}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                      </Fragment>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rota;
