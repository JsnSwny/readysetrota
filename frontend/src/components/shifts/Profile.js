import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getShiftsByID,
  getSwapRequests,
  updateShiftSwap,
  updateShift,
} from "../../actions/shifts";
import {
  getEmployees,
  getAvailability,
  updateAvailability,
  addAvailability,
} from "../../actions/employees";
import { useParams } from "react-router-dom";
import {
  format,
  parse,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  differenceInWeeks,
} from "date-fns";
import Pagination from "./Pagination";
import { Link, Redirect } from "react-router-dom";
import DepartmentPicker from "./DepartmentPicker";
import { toast } from "react-toastify";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;
  let swap_requests = useSelector((state) => state.shifts.swap_requests);
  let { id } = useParams();
  let availability = useSelector((state) => state.employees.availability);
  const [availabilityMonth, setAvailabilityMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [currentSelector, setCurrentSelector] = useState("unselected");
  let employees = useSelector((state) => state.employees.employees);
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
    dispatch(getEmployees());
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
      dispatch(getAvailability(employee.id));
    }
  }, [employee]);

  // if (employees.some((item) => item.id != id)) {
  //   return false;
  // }
  const [currentPage, setCurrentPage] = useState(1);
  const [shiftsPerPage, setShiftsPerPage] = useState(5);

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);
  // let user_set = employee.user ? true : false;
  if (!employee) {
    return (
      <div className="shiftsloading">
        <span className="loader"></span>
      </div>
    );
  }

  if (!user.business && id_param) {
    return <Redirect to="" />;
  }
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
          {id_param &&
            employee.position.map((item) => (
              <p key={item.id} className="subtitle">
                {item.name}
              </p>
            ))}
        </div>
      </div>
      {!id_param && <DepartmentPicker />}
      {currentDepartment != 0 && (
        <div className="dashboard container-2">
          {/* {user_set && (
        <small className="dashboard__contact">
          <i class="fas fa-envelope"></i>
          {employee.user.email}
        </small>
      )} */}

          <div className="dashboard__block">
            <div className="dashboard__block-title-container">
              <p className="dashboard__block-title">Upcoming Shifts</p>
              {/* <a
                className="btn-4"
                target="_blank"
                href={`/export?id=${employee.id}`}
              >
                Export Shifts as PDF
              </a> */}
            </div>

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
                  {!item.published &&
                  !permissions.includes("can_view_unpublished_shifts") ? (
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
                            "MMMM d YYY"
                          )}
                        </span>
                      </p>
                      <p className="short">
                        {item.start_time.substr(0, 5)} - {item.end_time}
                      </p>
                      <p className={`long ${item.info ? "" : "info"}`}>
                        {item.info ? item.info : "N/A"}
                      </p>
                      <p className="short extra">{item.department.name}</p>
                      <p className="short extra">
                        {item.department.owner.business.name}
                      </p>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
            <Pagination
              shiftsPerPage={shiftsPerPage}
              totalShifts={shifts.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <div className="dashboard__block--half-container">
            <div className="dashboard__block--half">
              <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">Availability</p>
              </div>

              <div className="dashboard__block-container">
                <p className="dashboard__dates-title">
                  <span
                    onClick={() => {
                      setAvailabilityMonth(addMonths(availabilityMonth, -1));
                    }}
                  >
                    <i className="fas fa-caret-left"></i>
                  </span>
                  {format(availabilityMonth, "MMMM YYY")}
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
                    (date, i) => i < 7 && <p>{format(date, "EEEEE")}</p>
                  )}
                </div>
                <div className="dashboard__dates">
                  {dateRange.map((date) => (
                    <div key={date} className="dashboard__dates-item">
                      <p
                        onClick={() => {
                          let obj = {
                            name: currentSelector,
                            employee_id: employee.id,
                            date: format(date, "YYY-MM-dd"),
                          };
                          if (differenceInWeeks(date, new Date()) > 8) {
                            toast.warning(
                              "Availability dates must be selected within 8 weeks from the current date!",
                              {
                                position: "bottom-center",
                              }
                            );
                          } else if (date < new Date()) {
                            toast.warning(
                              "You cannot set availability for a date before the current date!",
                              {
                                position: "bottom-center",
                              }
                            );
                          } else {
                            availability.some((item) => item.date == obj.date)
                              ? dispatch(
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
                          availability.filter(
                            (item) => item.date == format(date, "YYY-MM-dd")
                          )[0]
                            ? availability.filter(
                                (item) => item.date == format(date, "YYY-MM-dd")
                              )[0].name
                            : ""
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
                  ))}
                </div>
              </div>
              <div className="dashboard__dates-colours">
                <span
                  onClick={() => {
                    setCurrentSelector("unselected");
                  }}
                  className={`dashboard__dates-colours-item gray ${
                    currentSelector == "unselected" ? "current" : ""
                  } `}
                ></span>
                <span
                  onClick={() => {
                    setCurrentSelector("available");
                  }}
                  className={`dashboard__dates-colours-item green ${
                    currentSelector == "available" ? "current" : ""
                  } `}
                ></span>
                <span
                  onClick={() => {
                    setCurrentSelector("unavailable");
                  }}
                  className={`dashboard__dates-colours-item red ${
                    currentSelector == "unavailable" ? "current" : ""
                  } `}
                ></span>
                {/* <span
                  className={`dashboard__dates-colours-item yellow ${
                    currentSelector == "unselected" && "current"
                  } `}
                ></span> */}
              </div>
            </div>
            <div className="dashboard__block--half">
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
                            "MMMM dd YYY"
                          )}{" "}
                          {request.shift_from.start_time.substr(0, 5)} -{" "}
                          {request.shift_from.end_time}
                        </p>
                      </div>

                      <i class="fas fa-exchange-alt"></i>
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
                            "MMMM dd YYY"
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
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
