import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import {
  format,
  parseISO,
  getDay,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import AvailabilityCalendarAdmin from "./AvailabilityCalendarAdmin";
import { updateLeave, getLeave } from "../../actions/availability";
import { objectOf } from "prop-types";
import AvailabilityByDate from "./AvailabilityByDate";
import AvailabilityByEmployee from "./AvailabilityByEmployee";
import { getAllAvailability, getEmployees } from "../../actions/employees";

const Availability = ({ modalProps }) => {
  const dispatch = useDispatch();
  let leave = useSelector((state) => state.availability.leave);
  let availability = useSelector((state) => state.employees.availability);
  let employees = useSelector((state) => state.employees.employees);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [availabilityByDate, setAvailabilityByDate] = useState({});

  let current = useSelector((state) => state.employees.current);

  const [availabilityMonth, setAvailabilityMonth] = useState(new Date());

  useEffect(() => {
    if (dateRange.length > 0) {
      dispatch(
        getEmployees(
          true,
          false,
          format(dateRange[0], "yyyy-MM-dd"),
          format(dateRange[dateRange.length - 1], "yyyy-MM-dd")
        )
      );
    }
  }, [dateRange, current.site]);

  useEffect(() => {
    setAvailabilityByDate({});
    setSelectedDate("");
    setDateRange(
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(availabilityMonth), {
          weekStartsOn: 1,
        }),
        end: endOfWeek(endOfMonth(availabilityMonth), { weekStartsOn: 1 }),
      })
    );
    dispatch(
      getAllAvailability(
        current.site.id,
        format(startOfMonth(availabilityMonth), "yyyy-MM-dd"),
        format(endOfMonth(availabilityMonth), "yyyy-MM-dd")
      )
    );
    dispatch(getLeave());
  }, [availabilityMonth]);

  useEffect(() => {
    dateRange.forEach((date) => {
      let values = {
        leave: [],
        leavePending: [],
        available: [],
        unavailable: [],
        unavailablePending: [],
        none: [],
      };
      employees.forEach((item) => {
        getAvailability(item, format(date, "yyyy-MM-dd"), values);
      });
      let tempArr = availabilityByDate;
      tempArr[format(date, "yyyy-MM-dd")] = values;
      setAvailabilityByDate({ ...tempArr });
    });
  }, [employees, availability, leave]);

  const getAvailability = (employee, date, values) => {
    if (
      leave.some(
        (leave) =>
          leave.start_date <= date &&
          leave.end_date >= date &&
          leave.status == "Approved" &&
          leave.employee.id == employee.id
      )
    ) {
      values["leave"] = [...values.leave, employee.id];
      return true;
    } else if (
      leave.some(
        (leave) =>
          leave.start_date <= date &&
          leave.end_date >= date &&
          leave.status == "Pending" &&
          leave.employee.id == employee.id
      )
    ) {
      values["leavePending"] = [...values.leavePending, employee.id];
      return true;
    } else if (
      availability.some(
        (item) =>
          item.date == date &&
          item.name == "available" &&
          item.employee.id == employee.id
      )
    ) {
      values["available"] = [...values.available, employee.id];
      return true;
    } else if (
      availability.some(
        (item) =>
          item.date == date &&
          item.name == "unavailable" &&
          item.employee.id == employee.id &&
          item.status == "Approved"
      )
    ) {
      values["unavailable"] = [...values.unavailable, employee.id];
      return true;
    } else if (
      availability.some(
        (item) =>
          item.date == date &&
          item.name == "unavailable" &&
          item.employee.id == employee.id &&
          item.status == "Pending"
      )
    ) {
      values["unavailablePending"] = [
        ...values.unavailablePending,
        employee.id,
      ];
      return true;
    } else if (
      employee.default_availability[
        getDay(parseISO(date)) == 0 ? 6 : getDay(parseISO(date)) - 1
      ].name != "unselected"
    ) {
      if (
        employee.default_availability[
          getDay(parseISO(date)) == 0 ? 6 : getDay(parseISO(date)) - 1
        ].name == "available"
      ) {
        values["available"] = [...values.available, employee.id];
        return true;
      } else if (
        employee.default_availability[
          getDay(parseISO(date)) == 0 ? 6 : getDay(parseISO(date)) - 1
        ].name == "unavailable"
      ) {
        values["unavailable"] = [...values.unavailable, employee.id];
        return true;
      }
    } else {
      values["none"] = [...values.none, employee.id];
      return true;
    }
  };

  const getPerc = (val, comp) => {
    let result = (val / comp) * 100;
    if (result > 0) {
      result = result.toFixed(2);
      return parseFloat(result);
    } else {
      return 0;
    }
  };

  return (
    <Fragment>
      <div className="banner wrapper--md">
        <div className="flex-container--between-start">
          <h1 className="header">
            <Title
              name="Availability and Leave"
              subtitle="Staff Dashboard"
              breakWord={false}
            />
          </h1>
        </div>
      </div>
      <div className="wrapper--md">
        <div className="flex-container--between">
          <div className="dashboard__left">
            <div>
              <AvailabilityCalendarAdmin
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                getAvailability={getAvailability}
                dateRange={dateRange}
                availabilityMonth={availabilityMonth}
                setAvailabilityMonth={setAvailabilityMonth}
                getPerc={getPerc}
                availabilityByDate={availabilityByDate}
                setSelectedEmployee={setSelectedEmployee}
              />
            </div>

            <div>
              <h3 className="title-sm title--margin-top">Employees</h3>
              <hr className="separator"></hr>
              <div className="availabilityEmployee">
                {employees.map((item) => {
                  let obj = Object.entries(availabilityByDate);
                  if (selectedDate) {
                    obj = [[selectedDate, availabilityByDate[selectedDate]]];
                  }

                  let leaveList = obj.filter((date) =>
                    date[1].leave.some((val) => val == item.id)
                  );
                  let leavePendingList = obj.filter((date) =>
                    date[1].leavePending.some((val) => val == item.id)
                  );
                  let availabilityList = obj.filter((date) =>
                    date[1].available.some((val) => val == item.id)
                  );
                  let unavailabilityList = obj.filter((date) =>
                    date[1].unavailable.some((val) => val == item.id)
                  );
                  let unavailabilityPendingList = obj.filter((date) =>
                    date[1].unavailablePending.some((val) => val == item.id)
                  );
                  let noneList = obj.filter((date) =>
                    date[1].none.some((val) => val == item.id)
                  );

                  let availableVal = getPerc(
                    availabilityList.length,
                    dateRange.length
                  );
                  let unavailableVal = getPerc(
                    unavailabilityList.length,
                    dateRange.length
                  );
                  let unavailablePendingVal = getPerc(
                    unavailabilityPendingList.length,
                    dateRange.length
                  );
                  let leaveVal = getPerc(leaveList.length, dateRange.length);
                  let leavePendingVal = getPerc(
                    leavePendingList.length,
                    dateRange.length
                  );

                  if (selectedDate) {
                    availableVal *= dateRange.length;
                    unavailableVal *= dateRange.length;
                    unavailablePendingVal *= dateRange.length;
                    leaveVal *= dateRange.length;
                    leavePendingVal *= dateRange.length;
                  }

                  return (
                    <div
                      className={`availabilityEmployee__item ${
                        selectedEmployee.id == item.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        if (selectedEmployee == item) {
                          setSelectedEmployee("");
                        } else {
                          setSelectedDate("");
                          setSelectedEmployee(item);
                        }
                      }}
                    >
                      {Object.keys(availabilityByDate).length != 0 && (
                        <div className="tooltip">
                          <div class="tooltip__icons">
                            <div className="tooltip__icons-item">
                              <span className="circle-icon circle-icon--green"></span>
                              {availabilityList.length}
                            </div>
                            <div className="tooltip__icons-item">
                              <span className="circle-icon circle-icon--red"></span>
                              {unavailabilityList.length}
                            </div>
                            <div className="tooltip__icons-item">
                              <span className="circle-icon circle-icon--blue"></span>
                              {leaveList.length}
                            </div>
                            <div className="tooltip__icons-item">
                              <span className="circle-icon"></span>
                              {noneList.length}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="availabilityEmployee__bar">
                        <span
                          className="availabilityEmployee__bar--available"
                          style={{ width: `${availableVal}%` }}
                        ></span>
                        <span
                          className="availabilityEmployee__bar--unavailable"
                          style={{ width: `${unavailableVal}%` }}
                        ></span>
                        <span
                          className="availabilityEmployee__bar--unavailablePending"
                          style={{ width: `${unavailablePendingVal}%` }}
                        ></span>
                        <span
                          className="availabilityEmployee__bar--leave"
                          style={{ width: `${leaveVal}%` }}
                        ></span>
                        <span
                          className="availabilityEmployee__bar--leavePending"
                          style={{ width: `${leavePendingVal}%` }}
                        ></span>
                        <span className="availabilityEmployee__bar--none"></span>
                      </div>
                      <p>
                        {item.position.map((pos, idx) => (
                          <small>
                            {idx > 0 ? `, ` : ""}
                            {pos.name}
                          </small>
                        ))}
                      </p>
                      <h4>{item.full_name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="dashboardHolidays">
            <h3 className="title-sm">Requests</h3>
            <hr className="separator"></hr>
            <div className="dashboardHolidays__list">
              {selectedDate ? (
                <AvailabilityByDate
                  availabilityList={availabilityByDate[selectedDate]}
                  selectedDate={selectedDate}
                />
              ) : selectedEmployee ? (
                <AvailabilityByEmployee selectedEmployee={selectedEmployee} />
              ) : (
                leave
                  .filter((leave) => leave.status == "Pending")
                  .map((item) => (
                    <div className="dashboardHolidays__item">
                      <div>
                        <h4 className="flex-container--align-center dashboardHolidays__type">
                          <span className="dashboardHolidays__indicator--blue"></span>
                          {item.leave_type}
                        </h4>
                        <p>
                          <i class="fas fa-user"></i>
                          {item.employee.full_name}
                        </p>
                        <p>
                          <i class="fas fa-calendar-alt"></i>
                          {format(parseISO(item.start_date), "do MMMM yyyy")} -
                          {format(parseISO(item.end_date), "do MMMM yyyy")}
                        </p>
                        {item.reason && (
                          <p>
                            <i class="fas fa-info-circle"></i>
                            {item.reason}
                          </p>
                        )}
                      </div>
                      <div className="dashboardHolidays__buttons">
                        <button
                          onClick={() =>
                            dispatch(
                              updateLeave(item.id, {
                                ...item,
                                status: "Approved",
                              })
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              updateLeave(item.id, {
                                ...item,
                                status: "Denied",
                              })
                            )
                          }
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="dashboard wrapper--md">
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Your Shifts</h2>
        </div>
        <hr class="separator" />
      </div> */}
    </Fragment>
  );
};

export default Availability;
