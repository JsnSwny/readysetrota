import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import { getEmployees } from "../../actions/employees";
import {
  format,
  parseISO,
  eachDayOfInterval,
  parse,
  differenceInHours,
  addDays,
} from "date-fns";
import Dates from "./Dates";
import CreateShift from "../layout/CreateShift";

const ShiftList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [shift, setShift] = useState(false);
  const [shiftDate, setShiftDate] = useState("");
  const [type, setType] = useState(false);
  const [uuid, setUUID] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");

  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);

  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);

  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );
  let width = useSelector((state) => state.responsive.width);
  let parsedDate = parseISO(date, "dd-MM-yyyy");

  const widthUpdate = () => {
    if (width > 1000) {
      if (currentDevice != "Desktop") {
        dispatch(getShifts(date, format(addDays(parsedDate, 6), "yyyy-MM-dd")));
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet") {
        dispatch(getShifts(date, format(addDays(parsedDate, 2), "yyyy-MM-dd")));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile") {
        dispatch(getShifts(date, format(addDays(parsedDate, 0), "yyyy-MM-dd")));
        setCurrentDevice("Mobile");
      }
    }
  };

  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    widthUpdate();
  }, [width]);

  const firstUpdateDepartment = useRef(true);
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPopularTimes());
    if (firstUpdateDepartment.current) {
      widthUpdate();
      return;
    }
    dispatch(getShifts(date, enddate));
  }, [currentDepartment]);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate);
    }
  }, [shifts_list]);

  employees = useSelector((state) => state.employees.employees);
  if (user && user.profile.role == "User") {
    employees = employees.filter(
      (employee) => employee.id !== user.employee[0].id
    );
    user.employee.push;
    employees.unshift(user.employee[0]);
  }

  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date) =>
    shifts_list.filter((obj) => {
      return obj.employee.id === employee && obj.date === date
        ? permissions.includes("can_view_unpublished_shifts")
          ? !obj.published || obj.published
          : obj.published
        : "";
    });

  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const filterEmployees = (date) => {
    if (filterDate == date) {
      setFilterDate("");
      setEmployeesList(employees);
      return true;
    }
    let employeesOnDay = shifts_list.filter((obj) => {
      return obj.date == date;
    });
    let newEmployees = [];
    employeesOnDay.map((obj) => {
      !newEmployees.some((item) => item.id === obj.employee.id) &&
        newEmployees.push(obj.employee);
    });
    employees.map((obj) => {
      !newEmployees.some((item) => item.id === obj.id) &&
        newEmployees.push(obj);
    });
    setEmployeesList(newEmployees);
    setFilterDate(date);
  };

  const getAllShifts = (employee) => {
    let hours = 0;
    let shifts = shifts_list.filter((obj) => obj.employee.id === employee);
    for (let i = 0; i < shifts.length; i++) {
      let start = parse(shifts[i].start_time, "HH:mm:ss", new Date());
      let end = parse(shifts[i].end_time, "HH:mm", new Date());
      if (end != "Invalid Date") hours += differenceInHours(end, start);
    }
    return hours;
  };

  return (
    <Fragment>
      <CreateShift
        open={open}
        type={type}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        employeeID={employeeID}
        employeeName={employeeName}
        date={shiftDate}
        shift={shift}
      />
      <Dates filterEmployees={filterEmployees} dates={result} />
      {isLoading && (
        <div className="shiftsloading">
          <span className="loader"></span>
        </div>
      )}
      <div className="shiftList container">
        {employeesList.map((employee) => (
          <div key={employee.id} className="rota__container">
            <div className="container-left">
              <div
                className={`employee__wrapper ${
                  user.profile.role == "User" &&
                  user.employee[0].id == employee.id
                    ? " active"
                    : ""
                }`}
              >
                <p className="employee__position">
                  {employee.position.map(
                    (item) =>
                      item.department.id == parseInt(currentDepartment) && (
                        <p>{item.name}</p>
                      )
                  )}
                </p>
                <div className="employee__name-container">
                  <a
                    href={`/profile/${employee.id}`}
                    className="employee__name"
                  >
                    {employee.first_name}
                    <span className="employee__surname">
                      {" "}
                      {employee.last_name}
                    </span>
                  </a>
                  {permissions.includes("can_view_uuid") && !employee.user && (
                    <Fragment>
                      <i
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={(e) => {
                          copyToClipboard(employee.uuid);
                          setUUID(employee.uuid);
                        }}
                        class="fas fa-clipboard"
                      ></i>
                      <span
                        className={`employee__copied ${
                          uuid == employee.uuid ? " copied" : ""
                        }`}
                      >
                        UUID Copied!
                      </span>
                    </Fragment>
                  )}
                </div>
                <p className="employee__hours">
                  {getAllShifts(employee.id)} Hours
                </p>
              </div>
            </div>
            <div className="container-right">
              {result.map((result) =>
                getEmployeeShift(employee.id, format(result, "YYY-MM-dd"))
                  .length > 0 ? (
                  <div
                    className={`item-block shift__shift ${
                      filterDate == format(result, "YYY-MM-dd")
                        ? "filtered"
                        : ""
                    } ${
                      getEmployeeShift(
                        employee.id,
                        format(result, "YYY-MM-dd")
                      ).some((item) => item.published == false)
                        ? "unpublished"
                        : ""
                    }`}
                  >
                    {permissions.includes("can_create_shift") && (
                      <p
                        onClick={() => {
                          setOpen(true);
                          setType("shift");
                          setEmployeeID(employee.id);
                          setEmployeeName(
                            employee.first_name + " " + employee.last_name
                          );
                          setShiftDate(format(result, "YYY-MM-dd"));
                          setShift(false);
                        }}
                        className="shift__add--white"
                      >
                        +
                      </p>
                    )}
                    {getEmployeeShift(
                      employee.id,
                      format(result, "YYY-MM-dd")
                    ).map((shift) => (
                      <Fragment>
                        {!permissions.includes("can_view_unpublished_shifts") &&
                        shift.published == false ? (
                          ""
                        ) : (
                          <div
                            onClick={() => {
                              if (permissions.includes("can_create_shift")) {
                                setOpen(true);
                                setEmployeeID(employee.id);
                                setType("shift");
                                setEmployeeName(
                                  employee.first_name + " " + employee.last_name
                                );
                                setShift(shift);
                              }
                            }}
                            className={`shift__wrapper ${
                              permissions.includes("can_create_shift")
                                ? "edit"
                                : ""
                            }`}
                          >
                            <p className="shift__time">
                              {shift.start_time.substr(0, 5)} - {shift.end_time}{" "}
                              {permissions.includes(
                                "can_view_unpublished_shifts"
                              ) ? (
                                shift.published ? (
                                  <i class="fas fa-check"></i>
                                ) : (
                                  <i class="fas fa-times"></i>
                                )
                              ) : (
                                ""
                              )}
                            </p>
                            {shift.info && (
                              <p className="shift__info">
                                <i class="fas fa-info-circle"></i>
                                {shift.info}
                              </p>
                            )}
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <div
                    key={result}
                    className={`item-block shift__shift-noshift ${
                      filterDate == format(result, "YYY-MM-dd")
                        ? "filtered"
                        : ""
                    }`}
                  >
                    {permissions.includes("can_create_shift") && (
                      <span
                        onClick={() => {
                          setOpen(true);
                          setType("shift");
                          setEmployeeID(employee.id);
                          setEmployeeName(
                            employee.first_name + " " + employee.last_name
                          );
                          setShiftDate(format(result, "YYY-MM-dd"));
                          setShift(false);
                        }}
                        className="shift__add"
                      >
                        +
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ShiftList;
