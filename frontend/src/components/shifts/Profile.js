import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getShiftsByID,
  getSwapRequests,
  updateShiftSwap,
  updateShift,
} from "../../actions/shifts";
import { getEmployees } from "../../actions/employees";
import { useParams } from "react-router-dom";
import { format, parse, parseISO } from "date-fns";
import Pagination from "./Pagination";
import { Link, Redirect } from "react-router-dom";
import DepartmentPicker from "./DepartmentPicker";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;
  let swap_requests = useSelector((state) => state.shifts.swap_requests);
  let { id } = useParams();

  let id_param = id;

  if (!id) {
    id = user.id;
  }
  id = parseInt(id);
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
  let employees = useSelector((state) => state.employees.employees);
  // if (employees.some((item) => item.id != id)) {
  //   return false;
  // }
  const [currentPage, setCurrentPage] = useState(1);
  const [shiftsPerPage, setShiftsPerPage] = useState(5);

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);

  let employee = employees.filter((item) => item.id == id)[0];

  // let user_set = employee.user ? true : false;

  if (employee || !id_param) {
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
                    {format(parseISO(request.shift_from.date), "MMMM dd YYY")}{" "}
                    {request.shift_from.start_time.substr(0, 5)} -{" "}
                    {request.shift_from.end_time}
                  </p>
                </div>

                <i class="fas fa-exchange-alt"></i>
                <div
                  className={`dashboard__request ${
                    request.swap_to.employee[0].user.id == user.id ? "bold" : ""
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
                    {format(parseISO(request.shift_to.date), "MMMM dd YYY")}{" "}
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
                  <p className="success">This request has been approved.</p>
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
                        updateShift(request.shift_from.id, request.shift_from)
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
      </Fragment>
    );
  } else {
    return true;
  }
};

export default Profile;
