import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import {
  getEmployees,
  uuidReset,
  getAllAvailability,
} from "../../actions/employees";
import { format, parseISO, eachDayOfInterval, addDays } from "date-fns";
import Dates from "./Dates";
import CreateShift from "../layout/CreateShift";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import AddShiftButton from "./AddShiftButton";
import Employee from "./Employee";

const ShiftList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState("");
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
  let business = useSelector((state) => state.auth.business);
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

  let currentBusiness = useSelector(
    (state) => state.employees.current_business
  );

  let width = useSelector((state) => state.responsive.width);
  let parsedDate = parseISO(date, "dd-MM-yyyy");

  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(currentBusiness, start_date, end_date));
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
    if (user && !user.business) {
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
        ? business
          ? !obj.published || obj.published
          : obj.published
        : "";
    });

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

  const isAvailable = (employee, date) => {
    let available = availability.filter(
      (item) => item.employee.id == employee && item.date == date
    )[0];
    if (!available) {
      return false;
    } else {
      return {
        name: available.name,
        start: available.start_time,
        end: available.end_time,
        approved: available.approved,
      };
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
        employee={employee}
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
              <Employee
                employee={employee}
                current_employee={current_employee}
                shifts_list={shifts_list}
                user={user}
                currentDepartment={currentDepartment}
              />
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
                      } ${
                        result <= addDays(new Date(), -1) ? "date-before" : ""
                      } `}
                    >
                      <AddShiftButton
                        employee={employee}
                        date={format(result, "YYY-MM-dd")}
                        white={true}
                      />
                      {getEmployeeShift(
                        employee.id,
                        format(result, "YYY-MM-dd")
                      ).map((shift) => (
                        <Fragment key={shift.id}>
                          {!business && shift.published == false ? (
                            ""
                          ) : (
                            <div
                              onClick={() => {
                                if (business) {
                                  setOpen(true);
                                  setEmployee(employee);
                                  setType("shift");
                                  setShift(shift);
                                }
                              }}
                              className={`shift__wrapper ${
                                business ? "edit" : ""
                              }`}
                            >
                              <div className="flex">
                                <p className="shift__time">
                                  {shift.start_time.substr(0, 5)} -{" "}
                                  {shift.end_time}{" "}
                                </p>
                                <span>
                                  {
                                    business ? (
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
                                    //     className="fas fa-exchange-alt"
                                    //   ></i>
                                  }
                                </span>
                                <span>
                                  {/* {permissions.includes(
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
                                    ))} */}
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
                          .name
                      } ${
                        showAvailabilities &&
                        isAvailable(employee.id, format(result, "YYY-MM-dd"))
                          .name == "holiday" &&
                        !isAvailable(employee.id, format(result, "YYY-MM-dd"))
                          .approved
                          ? "not-approved"
                          : ""
                      } ${
                        filterDate == format(result, "YYY-MM-dd")
                          ? "filtered"
                          : ""
                      } ${
                        result <= addDays(new Date(), -1) ? "date-before" : ""
                      }`}
                    >
                      <AddShiftButton
                        employee={employee}
                        date={format(result, "YYY-MM-dd")}
                      />
                      {showAvailabilities && (
                        <Fragment>
                          <p className={`shift__text`}>
                            {
                              isAvailable(
                                employee.id,
                                format(result, "YYY-MM-dd")
                              ).name
                            }
                          </p>
                          {console.log(
                            isAvailable(
                              employee.id,
                              format(result, "YYY-MM-dd")
                            )
                          )}
                          {isAvailable(employee.id, format(result, "YYY-MM-dd"))
                            .name == "holiday" &&
                            isAvailable(
                              employee.id,
                              format(result, "YYY-MM-dd")
                            ).approved != true && (
                              <p className="shift__text">Not Approved</p>
                            )}
                          {isAvailable(employee.id, format(result, "YYY-MM-dd"))
                            .start && (
                            <p className="shift__text">
                              {isAvailable(
                                employee.id,
                                format(result, "YYY-MM-dd")
                              ).start.substr(0, 5)}{" "}
                              -{" "}
                              {
                                isAvailable(
                                  employee.id,
                                  format(result, "YYY-MM-dd")
                                ).end
                              }
                            </p>
                          )}
                        </Fragment>
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
