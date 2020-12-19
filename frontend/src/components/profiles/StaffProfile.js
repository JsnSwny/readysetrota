import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShiftsByID, getSwapRequests } from "../../actions/shifts";
import {
  getEmployees,
  getAvailability,
  updateAvailability,
  addAvailability,
  deleteAvailability,
  getDepartments,
  getPositions,
  getHolidays,
  updateEmployee,
} from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  differenceInDays,
  getDay,
} from "date-fns";
import Pagination from "../common/Pagination";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import { toast } from "react-toastify";
import HolidayRequest from "./dashboard/HolidayRequest";

const StaffProfile = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  let business = useSelector((state) => state.auth.business);
  let swap_requests = useSelector((state) => state.shifts.swap_requests);
  let { id } = useParams();
  let availability = useSelector((state) => state.employees.availability);
  let holidays = useSelector((state) => state.employees.holidays);
  const [availabilityMonth, setAvailabilityMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [currentSelector, setCurrentSelector] = useState("unselected");
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let currentBusiness = useSelector(
    (state) => state.employees.current_business
  );
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );
  let employee = {};
  let id_param = id;

  if (!id) {
    id = user.id;
  }
  id = parseInt(id);
  if (!id_param) {
    employee = user.employee.filter((employee) =>
      employee.position.some((item) => item.department.id == currentDepartment)
    )[0];
  } else {
    employee = employees.filter((item) => item.id == id)[0];
  }

  let shifts = useSelector((state) => state.shifts.user_shifts);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getEmployees());
    dispatch(getPositions(true));
    dispatch(getPositions());
  }, [currentDepartment]);

  useEffect(() => {
    dispatch(getPositions(true));
    dispatch(getPositions());
  }, [currentBusiness]);

  useEffect(() => {
    if (!id_param) {
      dispatch(getShiftsByID(id, true));
      dispatch(getSwapRequests(id));
    } else {
      dispatch(getShiftsByID(id, false));
      dispatch(getSwapRequests(id));
    }
  }, []);

  useEffect(() => {
    setDateRange(
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(availabilityMonth), {
          weekStartsOn: 1,
        }),
        end: endOfWeek(endOfMonth(availabilityMonth), { weekStartsOn: 1 }),
      })
    );
  }, [availabilityMonth]);

  useEffect(() => {
    if (employee) {
      dispatch(getAvailability(employee.id, employee.business.id));
      dispatch(getHolidays(employee.business.id, employee.id));
    }
  }, [employee]);

  const [currentPage, setCurrentPage] = useState(1);
  const [shiftsPerPage, setShiftsPerPage] = useState(5);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);
  let minutes = ["00", "15", "30", "45"];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }

  if (!employee && id_param) {
    return true;
  }

  if (!business && id_param) {
    return <Redirect to="" />;
  }

  const days = { 1: "M", 2: "T", 3: "W", 4: "T", 5: "F", 6: "S", 7: "S" };

  return (
    <Fragment>
      <div className="dashboard__header">
        <div className="container-2">
          <h1 className="title">
            {!id_param
              ? "Your "
              : employee.first_name + " " + employee.last_name + "'s "}
            Profile
          </h1>
          {employee && employee.user && (
            <small className="dashboard__contact">
              <i className="fas fa-envelope"></i>
              {employee.user.email}
            </small>
          )}
          {id_param &&
            employee.position.map((item) => (
              <p key={item.id} className="subtitle">
                {item.name}
              </p>
            ))}
        </div>
      </div>
      {!id_param && <DepartmentPicker />}
      {!id_param && currentDepartment != 0 && business && (
        <PositionPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      {!id_param && currentDepartment != 0 && business && (
        <StaffPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      {currentDepartment != 0 && (
        <div className="dashboard container-2">
          <div className="dashboard__block">
            <div className="dashboard__block-title-container">
              <p className="dashboard__block-title">Upcoming Shifts</p>
              {currentShifts.filter((item) => item.published).length > 0 && (
                <a
                  className="btn-4"
                  target="_blank"
                  href={`/export?id=${employee && employee.id}`}
                >
                  Export Shifts as PDF
                </a>
              )}
            </div>
            {currentShifts.length > 0 ? (
              <div className="dashboard__block-container">
                <div className="dashboard__table-heading table">
                  <p className="short">Date</p>
                  <p className="short">Time</p>
                  <p className="long">Info</p>
                  <p className="short">Department</p>
                  <p className="short">Business</p>
                </div>

                {currentShifts.map((item) => (
                  <Fragment key={item.id}>
                    {!item.published && !business ? (
                      ""
                    ) : (
                      <div
                        className={`dashboard__table-row table ${
                          !item.published ? "unpublished" : ""
                        }`}
                      >
                        <p className="short">
                          <span className="block">
                            {format(parseISO(item.date, "dd-MM-yyyy"), "EEEE ")}
                          </span>
                          <span>
                            {format(
                              parseISO(item.date, "dd-MM-yyyy"),
                              "MMMM d yyyy"
                            )}
                          </span>
                        </p>
                        <p className="short">
                          {item.start_time} - {item.end_time}
                        </p>
                        <p className={`long ${item.info ? "" : "info"}`}>
                          {item.info ? item.info : "N/A"}
                        </p>
                        <p className="short extra">{item.department.name}</p>
                        <p className="short extra">
                          {item.department.business.name}
                        </p>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            ) : (
              <p className="dashboard__text">
                You currently have no upcoming shifts.
              </p>
            )}

            <Pagination
              itemsPerPage={shiftsPerPage}
              totalItems={shifts.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          {plan != "F" && (
            <div className="dashboard__block--half-container">
              <div className="dashboard__block--half">
                <div className="dashboard__block-title-container">
                  <p className="dashboard__block-title">Availability</p>
                </div>

                <div className="dashboard__block-container">
                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    Default Availability
                  </h4>
                  <div
                    className="dashboard__dates"
                    style={{ marginBottom: "60px" }}
                  >
                    {[...Array(7)].map((e, i) => (
                      <div key={i} className="dashboard__dates-item">
                        <p
                          onClick={() => {
                            if (
                              currentSelector == "partial" &&
                              !(startTime && endTime)
                            ) {
                              toast.warning(
                                "You must set a start and end time when creating a partial availability!"
                              );
                            } else if (currentSelector == "holiday") {
                              toast.warning(
                                "You can't set a holiday as a default availability!"
                              );
                            } else {
                              let temp_availability =
                                employee.default_availability;
                              temp_availability[i] = {
                                name: currentSelector,
                                start_time:
                                  currentSelector == "partial" && startTime
                                    ? startTime.substr(0, 5)
                                    : null,
                                end_time:
                                  currentSelector == "partial" && endTime
                                    ? endTime
                                    : null,
                              };

                              let obj = {
                                default_availability: temp_availability,
                              };
                              dispatch(
                                updateEmployee(employee.id, {
                                  ...employee,
                                  obj,
                                  position_id: employee.position.map(
                                    (item) => item.id
                                  ),
                                  business_id: employee.business.id,
                                })
                              );
                            }
                          }}
                          className={`${currentSelector} current-${employee.default_availability[i].name}`}
                        >
                          {days[i + 1]}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="dashboard__dates-title">
                    <span
                      onClick={() => {
                        setAvailabilityMonth(addMonths(availabilityMonth, -1));
                      }}
                    >
                      <i className="fas fa-caret-left"></i>
                    </span>
                    {format(availabilityMonth, "MMMM yyyy")}
                    <span
                      onClick={() => {
                        setAvailabilityMonth(addMonths(availabilityMonth, 1));
                      }}
                    >
                      <i className="fas fa-caret-right"></i>
                    </span>
                  </p>
                  <div className="dashboard__dates-date">
                    {dateRange.map(
                      (date, i) =>
                        i < 7 && <p key={i}>{format(date, "EEEEE")}</p>
                    )}
                  </div>
                  <div className="dashboard__dates stretch">
                    {dateRange.map((date) => {
                      const format_date = format(date, "yyyy-MM-dd");
                      return (
                        <div key={date} className="dashboard__dates-item">
                          <p
                            onClick={() => {
                              let obj = {
                                name: currentSelector,
                                employee_id: employee.id,
                                date: format_date,
                                start_time:
                                  currentSelector == "partial" && startTime
                                    ? startTime
                                    : null,
                                end_time:
                                  currentSelector == "partial" && endTime
                                    ? endTime
                                    : null,
                                business_id: currentBusiness,
                              };
                              if (differenceInDays(date, new Date()) > 365) {
                                toast.warning(
                                  "Availability dates must be selected within 365 days!"
                                );
                              } else if (date < new Date()) {
                                toast.warning(
                                  "You cannot set availability for a date before the current date!"
                                );
                              } else if (
                                currentSelector == "unselected" &&
                                !availability.some(
                                  (item) => item.date == format_date
                                )
                              ) {
                                toast.warning(
                                  "You can't reset a date that doesn't have a value!"
                                );
                              } else if (
                                currentSelector == "partial" &&
                                !(startTime && endTime)
                              ) {
                                toast.warning(
                                  "You must set a start and end time when creating a partial availability!"
                                );
                              } else if (
                                shifts.some((item) => item.date == format_date)
                              ) {
                                toast.warning(
                                  "You already have a shift for this date!"
                                );
                              } else {
                                availability.some(
                                  (item) => item.date == obj.date
                                )
                                  ? currentSelector == "unselected"
                                    ? dispatch(
                                        deleteAvailability(
                                          availability.filter(
                                            (item) => item.date == obj.date
                                          )[0].id
                                        )
                                      )
                                    : dispatch(
                                        updateAvailability(
                                          availability.filter(
                                            (item) => item.date == obj.date
                                          )[0].id,
                                          obj
                                        )
                                      )
                                  : dispatch(addAvailability(obj));
                              }
                            }}
                            className={`${currentSelector} current-${
                              !shifts.some((item) => item.date == format_date)
                                ? availability.filter(
                                    (item) => item.date == format_date
                                  )[0]
                                  ? availability.filter(
                                      (item) => item.date == format_date
                                    )[0].name
                                  : employee.default_availability[
                                      getDay(date) == 0 ? 6 : getDay(date) - 1
                                    ].name
                                : "shift"
                            } ${
                              date < new Date()
                                ? "hidden-2"
                                : date < startOfMonth(availabilityMonth) ||
                                  date > endOfMonth(availabilityMonth)
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {format(date, "d")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="dashboard__dates-colours">
                  <span
                    onClick={() => {
                      setCurrentSelector("unselected");
                      toast.info("Reset Selected", { autoClose: 2000 });
                    }}
                    className={`dashboard__dates-colours-item gray ${
                      currentSelector == "unselected" ? "current" : ""
                    } `}
                  ></span>
                  <span
                    onClick={() => {
                      setCurrentSelector("available");
                      toast.info("Available Selected", { autoClose: 2000 });
                    }}
                    className={`dashboard__dates-colours-item green ${
                      currentSelector == "available" ? "current" : ""
                    } `}
                  ></span>
                  <span
                    onClick={() => {
                      setCurrentSelector("partial");
                      toast.info("Partially Available Selected", {
                        autoClose: 2000,
                      });
                    }}
                    className={`dashboard__dates-colours-item yellow ${
                      currentSelector == "partial" ? "current" : ""
                    } `}
                  ></span>
                  <span
                    onClick={() => {
                      setCurrentSelector("unavailable");
                      toast.info("Unavailable Selected", { autoClose: 2000 });
                    }}
                    className={`dashboard__dates-colours-item red ${
                      currentSelector == "unavailable" ? "current" : ""
                    } `}
                  ></span>
                  <span
                    onClick={() => {
                      setCurrentSelector("holiday");
                      toast.info("Holiday Selected", { autoClose: 2000 });
                    }}
                    className={`dashboard__dates-colours-item blue ${
                      currentSelector == "holiday" ? "current" : ""
                    } `}
                  ></span>
                </div>
                <div className="dashboard__dates-colours">
                  <span className="dashboard__dates-colours-text">Reset</span>
                  <span className="dashboard__dates-colours-text">
                    Available
                  </span>
                  <span className="dashboard__dates-colours-text">
                    Partially Available
                  </span>
                  <span className="dashboard__dates-colours-text">
                    Unavailable
                  </span>
                  <span className="dashboard__dates-colours-text">Holiday</span>
                </div>
                {currentSelector == "partial" && (
                  <div className="dashboard__dates-times">
                    <div className="staffForm__times">
                      <div className="staffForm__control">
                        <label className="staffForm__label">Start Time:</label>
                        <select
                          className="staffForm__input"
                          onChange={(e) => setStartTime(e.target.value)}
                          name="starttime"
                          value={startTime}
                        >
                          <option value="" disabled>
                            Select a start time
                          </option>
                          {hours.map((time) => (
                            <option key={time} value={`${time}:00`}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="staffForm__control">
                        <label className="staffForm__label">End Time:</label>
                        <select
                          className="staffForm__input"
                          onChange={(e) => setEndTime(e.target.value)}
                          name="endtime"
                          value={endTime}
                        >
                          <option value="" disabled>
                            Select an end time
                          </option>
                          <option value="Finish">Finish</option>
                          {hours.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {console.log(holidays)}
              <HolidayRequest holidays={holidays} />
            </div>
          )}

          {/* <div className="dashboard__block--half">
              <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">Shift Swap Requests</p>
              </div>
              <div className="dashboard__block-container">
                {swap_requests.map((request) => (
                  <div className="dashboard__request-container">
                    <div className="dashboard__request-wrapper">
                      <div
                        className={`dashboard__request ${
                          request.swap_from.employee[0].user.id == user.id
                            ? "bold"
                            : ""
                        }`}
                      >
                        <p>
                          {request.swap_from.employee[0].user.id == user.id
                            ? "You"
                            : request.swap_from.employee[0].first_name +
                              " " +
                              request.swap_from.employee[0].last_name}
                        </p>
                        <p>
                          {format(
                            parseISO(request.shift_from.date),
                            "MMMM dd yyyy"
                          )}{" "}
                          {request.shift_from.start_time.substr(0, 5)} -{" "}
                          {request.shift_from.end_time}
                        </p>
                      </div>

                      <i className="fas fa-exchange-alt"></i>
                      <div
                        className={`dashboard__request ${
                          request.swap_to.employee[0].user.id == user.id
                            ? "bold"
                            : ""
                        }`}
                      >
                        <p>
                          {request.swap_to.employee[0].user.id == user.id
                            ? "You"
                            : request.swap_to.employee[0].first_name +
                              " " +
                              request.swap_to.employee[0].last_name}
                        </p>
                        <p>
                          {format(
                            parseISO(request.shift_to.date),
                            "MMMM dd yyyy"
                          )}{" "}
                          {request.shift_to.start_time.substr(0, 5)} -{" "}
                          {request.shift_to.end_time}
                        </p>
                      </div>
                    </div>

                    {!user.groups.some((item) => item.name == "Business") ? (
                      !request.employee_approved ? (
                        request.swap_from.employee[0].user.id != user.id ? (
                          <button
                            className="btn-4"
                            onClick={() => {
                              dispatch(
                                updateShiftSwap(request.id, {
                                  employee_approved: true,
                                })
                              );
                            }}
                          >
                            Accept
                          </button>
                        ) : (
                          <p className="error">
                            Your request hasn't been accepted yet
                          </p>
                        )
                      ) : request.admin_approved ? (
                        <p className="success">
                          This request has been approved.
                        </p>
                      ) : (
                        <p className="error">
                          This request has not been approved by an admin yet.
                        </p>
                      )
                    ) : !request.admin_approved ? (
                      request.employee_approved ? (
                        <button
                          className="btn-4"
                          onClick={() => {
                            dispatch(
                              updateShiftSwap(request.id, {
                                admin_approved: true,
                              })
                            );

                            request.shift_from["employee"] =
                              request.swap_to.employee[0];
                            request.shift_to["employee"] =
                              request.swap_from.employee[0];

                            request.shift_from.department_id =
                              request.shift_from.department;
                            request.shift_to.department_id =
                              request.shift_to.department;
                            request.shift_from.employee_id =
                              request.swap_to.employee[0].id;
                            request.shift_to.employee_id =
                              request.swap_from.employee[0].id;

                            dispatch(
                              updateShift(
                                request.shift_from.id,
                                request.shift_from
                              )
                            );
                            dispatch(
                              updateShift(request.shift_to.id, request.shift_to)
                            );
                          }}
                        >
                          Approve
                        </button>
                      ) : (
                        <p className="error">
                          This request has not been accepted by the employee
                        </p>
                      )
                    ) : (
                      <p className="error">This request was approved</p>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
        </div>
      )}
    </Fragment>
  );
};

export default StaffProfile;