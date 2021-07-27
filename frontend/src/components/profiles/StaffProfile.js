import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getOpenShifts } from "../../actions/shifts";
import { getAvailability, getHolidays } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import Availability from "./Availability";
import HolidayRequest from "./dashboard/HolidayRequest";
import UpcomingShifts from "./UpcomingShifts";
import Stats from "./dashboard/stats/Stats";
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

const StaffProfile = (props) => {
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector((state) => state.employees.current);

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
      [`${format(startRange, "dd MMM")} - ${format(endRange, "dd MMM")}`],
      range.map((item, idx) =>
        filteredShifts.find((shift) => shift.date == format(item, "yyyy-MM-dd"))
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
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <h1 className="header">
            <Title
              name="Welcome Back, Jason"
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
                  <strong>
                    {differenceInCalendarDays(
                      parseISO(shifts[0].date),
                      new Date()
                    )}{" "}
                    days
                  </strong>
                </Fragment>
              )}
            </p>
            <div className="userShifts">
              <div className="userShifts__today flex-container--between">
                <h4 className="userShifts__today-date">
                  {format(parseISO(shifts[0].date), "iiii do MMMM")}
                </h4>
                <div className="userShifts__today-time">
                  <h4>
                    {shifts[0].start_time} - {shifts[0].end_time}
                  </h4>
                  {/* <p>in 30 Minutes</p> */}
                </div>
              </div>
            </div>
            {/* <p className="title--wide">Upcoming Shifts</p> */}
            <div className="dashboardShiftList">
              <ul className="dashboardShiftList__list--heading">
                <li></li>
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
              {shiftRanges.map((item) => (
                <ul className="dashboardShiftList__list--content">
                  <li>{item[0]}</li>
                  {item[1].map((shift, idx) =>
                    shift ? (
                      <li className="dashboardShiftList__shift active">
                        <span className="dashboardShiftList__date active">
                          {format(item[2][idx], "d")}
                          <sup>{format(item[2][idx], "do").slice(-2)}</sup>
                        </span>
                        {shift.start_time}{" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                        {shift.end_time}
                      </li>
                    ) : (
                      <li className="dashboardShiftList__shift">
                        <span className="dashboardShiftList__date">
                          {format(item[2][idx], "d")}
                          <sup>{format(item[2][idx], "do").slice(-2)}</sup>
                        </span>
                      </li>
                    )
                  )}
                </ul>
              ))}
            </div>
          </Fragment>
        ) : (
          <p>You have no upcoming shifts</p>
        )}
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Availability</h2>
        </div>
        <hr class="separator" />
      </div>
    </Fragment>
  );
};

export default StaffProfile;
