import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getOpenShifts } from "../../actions/shifts";
import { getAvailability, getHolidays } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import Availability from "./Availability";
import HolidayRequest from "./dashboard/HolidayRequest";
import UpcomingShifts from "./UpcomingShifts";
import Stats from "./dashboard/stats/Stats";
import { getUserLeave, deleteLeave } from "../../actions/availability";
import {
  format,
  differenceInCalendarDays,
  parseISO,
  isToday,
  addDays,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import Title from "../common/Title";
import { GET_LEAVE } from "../../actions/types";

const StaffProfile = ({ modalProps }) => {
  const dispatch = useDispatch();

  const { setOpen, setType } = modalProps;
  let user = useSelector((state) => state.auth.user);
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let leave = useSelector((state) => state.availability.leave);

  let siteAdmin = useSelector((state) => state.employees.site_admin);

  const [currentEmployee, setCurrentEmployee] = useState(false);

  let employee_id = parseInt(id_param) || user.id;
  let holidays = useSelector((state) => state.employees.holidays);

  let employee =
    (id_param && employees.find((item) => item.id == employee_id)) ||
    employees.find((employee) => employee.user == user.id);

  let openShifts = useSelector((state) => state.shifts.open_shifts);
  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);

  useEffect(() => {
    dispatch(
      getShifts(
        format(new Date(), "yyyy-MM-dd"),
        "",
        true,
        user.id == employee_id,
        employee_id
      )
    );
    dispatch(getOpenShifts(format(new Date(), "yyyy-MM-dd")));
  }, [current]);

  useEffect(() => {
    if (typeof employee !== "undefined") {
      setCurrentEmployee(employee);
    }
    if (employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getHolidays(employee.business_id, employee.id));
      dispatch(getUserLeave(employee.id));
    }
  }, [employee]);

  // if(siteAdmin && !employees.some(item => item.id == employee_id)) {
  //   return <Redirect to="" />;
  // }

  if (!siteAdmin && id_param) {
    return <Redirect to="" />;
  }

  let startRange = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  let endRange = endOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  let shiftRanges = [];
  let tempShifts = [...shifts];

  while (tempShifts.length > 0) {
    let range = eachDayOfInterval({
      start: startRange,
      end: endRange,
    });
    let filteredShifts = tempShifts.filter(
      (item) =>
        parseISO(item.date) >= startRange && parseISO(item.date) <= endRange
    );

    shiftRanges.push([
      [`${format(startRange, "do MMM")} - ${format(endRange, "do MMM")}`],
      range.map((item, idx) =>
        filteredShifts.filter(
          (shift) => shift.date == format(item, "yyyy-MM-dd")
        )
      ),
      range,
    ]);

    tempShifts = tempShifts.filter(
      (item) => !filteredShifts.some((shift) => shift.id == item.id)
    );
    startRange = addDays(startRange, 7);
    endRange = addDays(endRange, 7);
  }

  let daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // console.log(shiftRanges);

  return (
    <Fragment>
      <div className="banner wrapper--md">
        <div className="flex-container--between-start">
          <h1 className="header">
            <Title
              name="Hello, Jason"
              subtitle="Staff Dashboard"
              breakWord={false}
            />
          </h1>
        </div>
      </div>

      <div className="dashboard wrapper--md">
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Your Shifts</h2>
        </div>
        <hr class="separator" />
        {isLoading ? (
          <div class="dot-pulse"></div>
        ) : shifts.length > 0 ? (
          <Fragment>
            <p>
              Your next shift is{" "}
              {shifts[0].date == format(new Date(), "yyyy-MM-dd") ? (
                <strong>today</strong>
              ) : (
                <Fragment>
                  in{" "}
                  <strong className="pink">
                    {differenceInCalendarDays(
                      parseISO(shifts[0].date),
                      new Date()
                    )}{" "}
                    days
                  </strong>
                </Fragment>
              )}
            </p>
            {/*
            <div className="userShifts">
              <div className="userShifts__today flex-container--between">
                <h4 className="userShifts__today-date">
                  {format(parseISO(shifts[0].date), "iiii do MMMM")}
                </h4>
                <div className="userShifts__today-time">
                  <h4>
                    {shifts[0].start_time} - {shifts[0].end_time}
                  </h4>
                </div>
              </div>
            </div> */}
            {/* <p className="title--wide">Upcoming Shifts</p> */}
            <div className="dashboardShiftList">
              <ul className="dashboardShiftList__list--heading">
                {/* <li></li> */}
                {daysList.map((item) => (
                  <li
                    className={`${
                      format(new Date(), "iiii") == item ? "active" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="dashboardShiftList__list--content">
                {shiftRanges.map((item) => (
                  <Fragment>
                    <div className="dashboardShiftList__range">
                      <h4>{item[0]}</h4>
                      {!item[1].some((shift) => shift.length > 0) && (
                        <p>No Shifts to Display</p>
                      )}
                    </div>

                    {item[1].map((shift, idx) =>
                      shift.length > 0 ? (
                        <li className="dashboardShiftList__shift active">
                          <span className="dashboardShiftList__date active">
                            {format(item[2][idx], "do MMM")}
                          </span>
                          <div className="dashboardShiftList__content">
                            {shift.map((shiftItem) => (
                              <div>
                                {shiftItem.start_time}{" "}
                                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                                {shiftItem.end_time}
                              </div>
                            ))}
                          </div>
                        </li>
                      ) : (
                        <li className="dashboardShiftList__shift">
                          <span className="dashboardShiftList__date">
                            {format(item[2][idx], "do MMM")}
                          </span>
                        </li>
                      )
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          </Fragment>
        ) : (
          <p>You have no upcoming shifts</p>
        )}
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Availability</h2>
        </div>
        <hr class="separator" />
        {loading.availability ? (
          <div class="dot-pulse"></div>
        ) : (
          <div className="flex-container--between">
            {employees.length > 0 && (
              <Availability
                employee={employees.find((item) => item.user == user.id)}
              />
            )}
            <div className="dashboardHolidays">
              <h2>Leave Requests</h2>
              <button
                onClick={() => {
                  setOpen(true);
                  setType("holiday");
                }}
                class="dashboardHolidays__request"
              >
                Make Request
              </button>
              <div className="dashboardHolidays__list">
                {leave.slice(0, 3).map((item) => (
                  <div className="dashboardHolidays__item">
                    <div>
                      <h4 className="flex-container--align-center dashboardHolidays__type">
                        <span className="dashboardHolidays__indicator--blue"></span>
                        {item.leave_type}
                      </h4>
                      <p className="dashboardHolidays__date">
                        <i class="fas fa-calendar-alt"></i>
                        {/* {console.log(leave)} */}
                        {format(parseISO(item.start_date), "do MMMM yyyy")} -
                        {format(parseISO(item.end_date), "do MMMM yyyy")}
                      </p>
                    </div>
                    <div>
                      <h4
                        className={`dashboardHolidays__status--${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </h4>
                      <p
                        className="dashboardHolidays__delete"
                        onClick={() => dispatch(deleteLeave(item.id))}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Statistics</h2>
        </div>
        <hr class="separator" />
      </div>
    </Fragment>
  );
};

export default StaffProfile;
