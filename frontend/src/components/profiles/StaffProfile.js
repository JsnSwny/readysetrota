import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getOpenShifts } from "../../actions/shifts";
import { getAvailability } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import AvailabilityCalendar from "../availability/AvailabilityCalendar";
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
  addMonths,
} from "date-fns";
import Title from "../common/Title";
import { GET_LEAVE } from "../../actions/types";
import { Bar, Line } from "react-chartjs-2";
import { getStats } from "../../actions/stats";

const StaffProfile = ({ modalProps }) => {
  const dispatch = useDispatch();

  const { setOpen, setType } = modalProps;
  let user = useSelector((state) => state.auth.user);
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(new Date());
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector((state) => state.employees.current);
  let loading = useSelector((state) => state.loading);
  let leave = useSelector((state) => state.availability.leave);
  let stats = useSelector((state) => state.stats.stats);

  const [interval, setInterval] = useState([]);

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

  const data = {
    // labels: stats.hours.map((item, idx) => item.day),
    labels: interval.map((item) => format(item, "d MMM yyyy")),
    datasets: [
      {
        label: "Shifts Worked",
        data: interval.map((item) =>
          stats.hours.find((stat) => stat.day == format(item, "yyyy-MM-dd"))
            ? stats.hours.find((stat) => stat.day == format(item, "yyyy-MM-dd"))
                .c
            : 0
        ),
        backgroundColor: ["rgba(236, 112, 201, 1)"],
        borderColor: ["rgba(236, 112, 201, 1)"],
        borderWidth: 2,
      },
    ],
  };

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

  let maxValueOfY = Math.max(...stats.hours.map((o) => o.c), 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    interaction: {
      intersect: false,
    },
    // tooltips: {
    //   mode: "nearest",
    // },
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Shifts Worked",
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        suggestedMax: maxValueOfY + maxValueOfY / 10,
      },
      x: {
        ticks: {
          stepSize: 4,
        },
      },
    },
  };

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
                    days
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
        {loading.availability ? (
          <div class="dot-pulse"></div>
        ) : (
          <div className="flex-container--between">
            {employees.length > 0 && (
              <AvailabilityCalendar
                employee={employees.find((item) => item.user == user.id)}
              />
            )}
            <div className="dashboardHolidays">
              <div className="flex-container--between">
                <h3 className="title-sm title--margin-top">Requests</h3>
                <button
                  onClick={() => {
                    setOpen(true);
                    setType("holiday");
                  }}
                  class="dashboardHolidays__request"
                >
                  Make Request
                </button>
              </div>

              <hr className="separator"></hr>

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
        <div className="flex-container--between">
          <h2 className="title-sm title--margin-top">Analytics Overview</h2>
          <select
            onChange={(e) => {
              let values = e.target.value.split(" ");
              if (values[1] == "D") {
                setStartDate(addDays(new Date(), -values[0]));
              } else if (values[1] == "M") {
                setStartDate(addMonths(new Date(), -values[0]));
              }
            }}
          >
            <option value="7 D">Last week</option>
            <option value="14 D">Last 2 weeks</option>
            <option value="30 D">Last 30 Days</option>
            <option value="3 M">Last 3 Months</option>
            <option value="6 M">Last 6 Months</option>
            <option value="12 M">Last 12 Months</option>
          </select>
        </div>
        <hr class="separator" />
        <Stats
          title="Admin Panel"
          type="employee"
          startDate={startDate}
          endDate={endDate}
        />
        <div className="stats-graph">
          <div className="stats-graph__item">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StaffProfile;
