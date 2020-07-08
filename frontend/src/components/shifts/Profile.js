import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShiftsByID } from "../../actions/shifts";
import { getEmployees } from "../../actions/employees";
import { useParams } from "react-router-dom";
import { format, parse, parseISO } from "date-fns";
import Pagination from "./Pagination";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;
  let { id } = useParams();
  if (!id) {
    id = user.employee[0].id;
  }
  id = parseInt(id);
  let shifts = useSelector((state) => state.shifts.user_shifts);
  useEffect(() => {
    dispatch(getShiftsByID(id));
    dispatch(getEmployees());
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

  if (employee) {
    let user_set = employee.user ? true : false;
    return (
      <div className="dashboard container-2">
        <h1 className="title">
          {user_set && user.id == employee.user.id
            ? "Your "
            : employee.name + "'s "}
          Profile
        </h1>
        {employee.position.map((item) => (
          <p className="subtitle">{item.name}</p>
        ))}
        {user_set && (
          <small className="dashboard__contact">
            <i class="fas fa-envelope"></i>
            {employee.user.email}
          </small>
        )}

        <div className="dashboard__block">
          <p className="dashboard__block-title">Upcoming Shifts</p>
          <div className="dashboard__block-container">
            <div className="dashboard__table-heading table">
              <p className="short">Date</p>
              <p className="short">Time</p>
              <p className="long">Info</p>
              <p className="short">Department</p>
              <p className="short">Created</p>
            </div>

            {currentShifts.map((item) => (
              <Fragment>
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
                      {format(parseISO(item.date, "dd-MM-yyyy"), "MMMM d YYY")}
                    </p>
                    <p className="short">
                      {item.start_time.substr(0, 5)} - {item.end_time}
                    </p>
                    <p className={`long ${item.info ? "" : "info"}`}>
                      {item.info ? item.info : "N/A"}
                    </p>
                    <p className="short extra">{item.department.name}</p>
                    <p className="short extra">
                      {format(new Date(item.created_at), "MMMM dd YYY HH:mm")}
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
      </div>
    );
  } else {
    return true;
  }
};

export default Profile;
