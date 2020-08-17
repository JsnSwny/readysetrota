import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import {
  getEmployees,
  uuidReset,
  getAllAvailability,
} from "../../actions/employees";
import {
  format,
  parseISO,
  eachDayOfInterval,
  parse,
  differenceInMinutes,
  addDays,
} from "date-fns";
import Dates from "./Dates";
import CreateShift from "../layout/CreateShift";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const [shiftSwap, setShiftSwap] = useState({});
  const [showAvailabilities, setShowAvailabilities] = useState(false);

  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let availability = useSelector((state) => state.employees.availability);

  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let uuid_success = useSelector((state) => state.employees.uuid_success);

  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  let width = useSelector((state) => state.responsive.width);
  let parsedDate = parseISO(date, "dd-MM-yyyy");

  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(user.id, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
  };

  if (uuid_success) {
    toast.success("UUID accepted!");
    dispatch(uuidReset());
  }

  let current_employee = user.employee.filter((employee) =>
    employee.position.some((item) => item.department.id == currentDepartment)
  )[0];

  const widthUpdate = () => {
    if (width > 1200) {
      if (currentDevice != "Desktop") {
        updateShifts(date, format(addDays(parsedDate, 6), "yyyy-MM-dd"));
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet") {
        updateShifts(date, format(addDays(parsedDate, 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile") {
        updateShifts(date, format(addDays(parsedDate, 0), "yyyy-MM-dd"));
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
    updateShifts(start_date, end_date);
  }, [currentDepartment]);

  useEffect(() => {
    if (user && user.profile.role == "User") {
      if (employees.length > 0) {
        employees = employees.filter(
          (employee) => employee.id !== current_employee.id
        );
        employees.unshift(current_employee);
      }
    }
    setEmployeesList(employees);
  }, [employees]);

  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate, true);
    }
  }, [shifts_list]);

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

  const filterEmployees = (date, update = false) => {
    if (filterDate == date && update == false) {
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
      if (end < start) {
        end = addDays(end, 1);
      }

      if (end != "Invalid Date") hours += differenceInMinutes(end, start) / 60;
    }
    return hours;
  };

  const isAvailable = (employee, date) => {
    let available = availability.filter(
      (item) => item.employee.id == employee && item.date == date
    )[0];
    if (!available) {
      return false;
    } else {
      return available.name;
    }
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
        shiftSwap={shiftSwap}
      />
      <Dates
        filterEmployees={filterEmployees}
        dates={result}
        updateShifts={updateShifts}
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
      />
      {isLoading && <Loading />}
      {currentDepartment != 0 && (
        <div className={`shiftList container ${filterDate ? "filtered" : ""}`}>
          {employeesList.map((employee) => (
            <div key={employee.id} className="rota__container">
              <div className="container-left">
                <div
                  className={`employee__wrapper ${
                    user.profile.role == "User" &&
                    current_employee.id == employee.id
                      ? " active"
                      : ""
                  }`}
                >
                  <p className="employee__position">
                    {employee.position.map(
                      (item) =>
                        item.department.id == parseInt(currentDepartment) && (
                          <span key={item.id}>{item.name}</span>
                        )
                    )}
                  </p>
                  <div className="employee__name-container">
                    <Link to={`/profile/${employee.id}`}>
                      <p className="employee__name">
                        {employee.first_name}
                        <span className="employee__surname">
                          {" "}
                          {employee.last_name}
                        </span>
                      </p>
                    </Link>

                    {permissions.includes("can_view_uuid") && !employee.user && (
                      <Fragment>
                        <i
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          onClick={(e) => {
                            toast.info(
                              <div>
                                {employee.first_name + " " + employee.last_name}
                                <br /> UUID copied! <br /> <br />{" "}
                                <small>{employee.uuid}</small>
                              </div>
                            );
                            copyToClipboard(
                              `www.readysetrota.com/join/${employee.uuid}/`
                            );
                            setUUID(employee.uuid);
                          }}
                          className="fas fa-clipboard"
                        ></i>
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
                      key={result}
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
                      } `}
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
                        <Fragment key={shift.id}>
                          {!permissions.includes(
                            "can_view_unpublished_shifts"
                          ) && shift.published == false ? (
                            ""
                          ) : (
                            <div
                              onClick={() => {
                                if (permissions.includes("can_create_shift")) {
                                  setOpen(true);
                                  setEmployeeID(employee.id);
                                  setType("shift");
                                  setEmployeeName(
                                    employee.first_name +
                                      " " +
                                      employee.last_name
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
                              <div className="flex">
                                <p className="shift__time">
                                  {shift.start_time.substr(0, 5)} -{" "}
                                  {shift.end_time}{" "}
                                </p>
                                <span>
                                  {
                                    permissions.includes(
                                      "can_view_unpublished_shifts"
                                    ) ? (
                                      shift.published ? (
                                        <i className="fas fa-check"></i>
                                      ) : (
                                        <i className="fas fa-times"></i>
                                      )
                                    ) : (
                                      ""
                                    )
                                    // shift.employee.user &&
                                    // parseISO(shift.date, new Date()) >=
                                    //   addDays(new Date(), -1) &&
                                    // shift.employee.user.id != user.id && (
                                    //   <i
                                    //     onClick={() => {
                                    //       // setOpen(true);
                                    //       // setType("shiftswap");
                                    //       // setShiftSwap(shift);
                                    //     }}
                                    //     class="fas fa-exchange-alt"
                                    //   ></i>
                                  }
                                </span>
                                <span>
                                  {permissions.includes(
                                    "can_view_unpublished_shifts"
                                  ) &&
                                    (shift.published ? (
                                      shift.seen ? (
                                        <i className="far fa-eye"></i>
                                      ) : (
                                        <i className="far fa-eye-slash"></i>
                                      )
                                    ) : (
                                      ""
                                    ))}
                                </span>
                              </div>
                              {shift.info && (
                                <p className="shift__info">
                                  <i className="fas fa-info-circle"></i>
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
                        showAvailabilities &&
                        isAvailable(employee.id, format(result, "YYY-MM-dd"))
                      } ${
                        filterDate == format(result, "YYY-MM-dd")
                          ? "filtered"
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
                          className="shift__add"
                        >
                          +
                        </p>
                      )}
                      {showAvailabilities && (
                        <p
                          className={`shift__text ${isAvailable(
                            employee.id,
                            format(result, "YYY-MM-dd")
                          )}`}
                        >
                          {isAvailable(
                            employee.id,
                            format(result, "YYY-MM-dd")
                          )}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ShiftList;
