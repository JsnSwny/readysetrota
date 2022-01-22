import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { getAvailability } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import AvailabilityCalendar from "../availability/AvailabilityCalendar";
import HolidayRequest from "./dashboard/HolidayRequest";
import UpcomingShifts from "./UpcomingShifts";
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
  addMonths,
} from "date-fns";
import Title from "../common/Title";
import { GET_LEAVE } from "../../actions/types";
import { Bar, Line } from "react-chartjs-2";
import { getStats } from "../../actions/stats";
import StatsItem from "./dashboard/StatsItem";

const StaffProfile = ({ modalProps, setDashboardView }) => {
  const dispatch = useDispatch();

  const { setOpen, setType, setExtra } = modalProps;
  let user = useSelector((state) => state.auth.user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let leave = useSelector((state) => state.availability.leave);
  let stats = useSelector((state) => state.stats.stats);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  const [interval, setInterval] = useState([]);

  const [currentEmployee, setCurrentEmployee] = useState(false);

  let employee_id = parseInt(id_param) || user.id;

  let employee = user.employee.find(
    (item) => item.business.id == current.business.id
  );

  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);

  useEffect(() => {
    setInterval(
      eachDayOfInterval({
        start: startDate,
        end: endDate,
      })
    );
    if (employee) {
      dispatch(
        getStats(
          "employee",
          employee.id,
          format(startDate, "dd/MM/yyyy"),
          format(endDate, "dd/MM/yyyy"),
          "site"
        )
      );
    }
  }, [startDate, endDate, current.site, employee]);

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
  }, [current]);

  useEffect(() => {
    if (typeof employee !== "undefined") {
      setCurrentEmployee(employee);
    }
    if (employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getUserLeave(employee.id));
    }
  }, [employee]);

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

  return (
    <Fragment>
      <div className="banner wrapper--md">
        <div className="flex-container--between-start">
          <h1 className="header">
            <Title
              name={`${employee ? `Welcome, ${employee.first_name}` : ""}`}
              subtitle="Staff Dashboard"
              breakWord={false}
            />
          </h1>
        </div>
        {permissions &&
          permissions.includes("manage_shifts") &&
          permissions.includes("manage_wages") && (
            <p
              className="banner__link"
              onClick={() => setDashboardView("business")}
            >
              View Site Dashboard
            </p>
          )}
      </div>

      <div className="dashboard wrapper--md">
        <h2 className="title-sm title--margin-top">Your PIN</h2>
        <hr class="separator" />
        {employee && (
          <p>
            Your PIN is <strong>{employee.pin ? employee.pin : "None"}</strong>
          </p>
        )}
        <h2 className="title-sm title--margin-top">Your Shifts</h2>
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
                    {differenceInCalendarDays(
                      parseISO(shifts[0].date),
                      new Date()
                    ) == 1
                      ? "day"
                      : "days"}
                  </strong>
                </Fragment>
              )}
            </p>
            <div className="dashboardShiftList">
              <ul className="dashboardShiftList__list--heading">
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
        <div className="flex-container--between">
          <AvailabilityCalendar employee={employee} />
          <div className="dashboardHolidays">
            <div className="flex-container--between">
              <h3 className="title-sm title--margin-top">Requests</h3>
              <button
                onClick={() => {
                  setOpen(true);
                  setType("holiday");
                  setExtra({ employee: employee });
                }}
                class="dashboardHolidays__request"
              >
                Make Request
              </button>
            </div>

            <hr className="separator"></hr>

            <div className="dashboardHolidays__list">
              {leave.map((item) => (
                <div className="dashboardHolidays__item">
                  <div>
                    <h4 className="flex-container--align-center dashboardHolidays__type">
                      <span className="dashboardHolidays__indicator--blue"></span>
                      {item.leave_type}{" "}
                      <span
                        className={`dashboardHolidays__status--${item.status.toLowerCase()}`}
                      >
                        ({item.status})
                      </span>
                    </h4>
                    <p className="dashboardHolidays__date">
                      <i class="fas fa-calendar-alt"></i>
                      {format(parseISO(item.start_date), "do MMMM yyyy")} -{" "}
                      {format(parseISO(item.end_date), "do MMMM yyyy")}
                    </p>
                  </div>
                  <i
                    onClick={() => dispatch(deleteLeave(item.id))}
                    className="dashboardHolidays__delete fas fa-times"
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dashboard__header">
          <h2 className="title-sm title--margin-top">Analytics Overview</h2>
          <select
            onChange={(e) => {
              let values = e.target.value.split(" ");
              let num = parseInt(values[0]);
              if (num < 0) {
                setStartDate(new Date());
                if (values[1] == "D") {
                  setEndDate(addDays(new Date(), -num));
                } else if (values[1] == "M") {
                  setEndDate(addMonths(new Date(), -num));
                }
              } else {
                setEndDate(new Date());
                if (values[1] == "D") {
                  setStartDate(addDays(new Date(), -num));
                } else if (values[1] == "M") {
                  setStartDate(addMonths(new Date(), -num));
                }
              }
            }}
          >
            <option value="-7 D">This week</option>
            <option value="7 D">Last week</option>
            <option value="14 D">Last 2 weeks</option>
            <option value="30 D">Last 30 Days</option>
            <option value="3 M">Last 3 Months</option>
            <option value="6 M">Last 6 Months</option>
            <option value="12 M">Last 12 Months</option>
          </select>
        </div>
        <hr class="separator" />
        {stats && interval.length > 0 && (
          <div className="stats-graph__container">
            <StatsItem
              title="Number of Shifts Worked"
              decimals={0}
              data={interval.map((item) =>
                stats.hours.find(
                  (stat) => stat.day == format(item, "yyyy-MM-dd")
                )
                  ? stats.hours.find(
                      (stat) => stat.day == format(item, "yyyy-MM-dd")
                    ).c
                  : 0
              )}
              interval={interval}
            />
            <StatsItem
              title="Hours Worked"
              decimals={1}
              data={Object.values(stats.total_hours).map((item) =>
                parseInt(item)
              )}
              interval={interval}
            />
            <StatsItem
              title="Estimated Pay"
              decimals={2}
              data={Object.values(stats.total_cost).map((item) =>
                parseInt(item)
              )}
              interval={interval}
              prefix={"£"}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default StaffProfile;
