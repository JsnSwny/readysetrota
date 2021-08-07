import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSites } from "../../../actions/employees";
import HolidayRequest from "./HolidayRequest";
import Stats from "./stats/Stats";
import SiteOverview from "./SiteOverview";
import Title from "../../common/Title";
import { Link } from "react-router-dom";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  addDays,
  startOfWeek,
  addMonths,
  eachDayOfInterval,
} from "date-fns";
import { getTodayShifts } from "../../../actions/shifts";
import { Bar, Line } from "react-chartjs-2";
import { getStats } from "../../../actions/stats";

const AdminPanel = (props) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(new Date());

  let current = useSelector((state) => state.employees.current);
  let user = useSelector((state) => state.auth.user);
  let holidays = useSelector((state) => state.employees.holidays);
  let business = useSelector((state) => state.employees.business);
  let sites = useSelector((state) => state.employees.sites);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let stats = useSelector((state) => state.stats.stats);
  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let notifications = [];
  const [interval, setInterval] = useState([]);

  useEffect(() => {
    setInterval(
      eachDayOfInterval({
        start: startDate,
        end: endDate,
      })
    );
    dispatch(
      getStats(
        "business",
        current.site.id,
        format(startDate, "dd/MM/yyyy"),
        format(endDate, "dd/MM/yyyy"),
        "site"
      )
    );
  }, [startDate, endDate, current.site]);

  const [beforeIncrement, setBeforeIncrement] = useState(0);
  const [afterIncrement, setAfterIncrement] = useState(0);

  let today = new Date();

  useEffect(() => {
    dispatch(getSites());
  }, []);

  useEffect(() => {
    dispatch(
      getTodayShifts(
        format(new Date(), "yyyy-MM-dd"),
        format(new Date(), "yyyy-MM-dd")
      )
    );
  }, [current.department]);

  const data = {
    // labels: stats.hours.map((item, idx) => item.day),
    labels: interval.map((item) => format(item, "d MMM yyyy")),
    datasets: [
      {
        label: "Hours Worked",
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

  const getPositionByDepartment = (shift) => {
    return shift.employee.position.find(
      (item) => item.department.id == shift.department
    );
  };

  let items = [];

  const getTime = (shift) => {
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift.start_time.substr(0, 2),
      shift.start_time.substr(3, 4),
      0
    );
  };

  const getBeforeAfterShifts = (before, increment) => {
    let tempShifts = shifts;

    if (before == true) {
      tempShifts = tempShifts.filter((item) => getTime(item) < new Date());
      tempShifts = tempShifts.slice(
        tempShifts.length - (3 + increment),
        tempShifts.length - increment
      );
    } else {
      tempShifts = tempShifts.filter((item) => getTime(item) >= new Date());
      tempShifts = tempShifts.slice(0 + increment, 3 + increment);
    }

    return tempShifts.map((item) => (
      <div className="todayShifts__item flex-container--between">
        <div className="todayShifts__item-left">
          <p className="todayShifts__item-title">{item.employee.full_name}</p>
          <p className="todayShifts__item-subtitle">
            {getPositionByDepartment(item).name} (
            {getPositionByDepartment(item).department.name})
          </p>
        </div>
        <div className="todayShifts__item-right">
          <p className="todayShifts__item-title">
            {item.start_time} - {item.end_time}
          </p>
          <p className="todayShifts__item-subtitle">
            {before ? "" : "In"}{" "}
            {Math.abs(differenceInHours(getTime(item), new Date())) > 0 &&
              `${Math.abs(differenceInHours(getTime(item), new Date()))} Hour${
                Math.abs(differenceInHours(getTime(item), new Date())) > 1
                  ? "s"
                  : ""
              } `}
            {Math.abs(differenceInMinutes(getTime(item), new Date())) -
              60 * Math.abs(differenceInHours(getTime(item), new Date()))}{" "}
            Minutes {before ? "Ago" : ""}
          </p>
        </div>
      </div>
    ));
  };

  const sortArrow = ({ before, direction, increment, value, setIncrement }) => {
    return (
      <i
        class={`fas fa-sort-${direction} ${
          getBeforeAfterShifts(before, increment + value).length == 3
            ? "pink"
            : ""
        }`}
        onClick={() =>
          getBeforeAfterShifts(before, increment + value).length == 3 &&
          setIncrement(increment + value)
        }
      ></i>
    );
  };

  return (
    <Fragment>
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <h1 className="header">
            <Title
              name="Welcome Back, Jason"
              subtitle="Dashboard"
              breakWord={false}
            />
          </h1>
          {/* <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div> */}
        </div>
      </div>
      <div className="dashboard wrapper--md">
        <div className="flex-container--between">
          <div class="dashboard__left">
            <h2 className="title-sm">Previous Shifts</h2>
            <hr class="separator" />
            <div className="todayShifts">
              {isLoading ? (
                <div class="dot-pulse"></div>
              ) : (
                <Fragment>
                  <div className="todayShifts__container">
                    {getBeforeAfterShifts(true, beforeIncrement).length > 0 ? (
                      <Fragment>
                        {sortArrow({
                          before: true,
                          direction: "up",
                          increment: beforeIncrement,
                          value: 1,
                          setIncrement: setBeforeIncrement,
                        })}

                        <div className="todayShifts__list">
                          {getBeforeAfterShifts(true, beforeIncrement)}
                        </div>

                        {sortArrow({
                          before: true,
                          direction: "down",
                          increment: beforeIncrement,
                          value: -1,
                          setIncrement: setBeforeIncrement,
                        })}
                      </Fragment>
                    ) : (
                      <p className="error--lg">No shifts have passed today</p>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
          </div>

          <div class="dashboard__right">
            <h2 className="title-sm">Upcoming Shifts</h2>
            <hr class="separator" />
            <div className="todayShifts">
              {isLoading ? (
                <div class="dot-pulse"></div>
              ) : (
                <Fragment>
                  <div className="todayShifts__container">
                    <h3 className="todayShifts__title">Upcoming Shifts</h3>
                    {getBeforeAfterShifts(false, afterIncrement).length > 0 ? (
                      <Fragment>
                        {sortArrow({
                          before: false,
                          direction: "up",
                          increment: afterIncrement,
                          value: -1,
                          setIncrement: setAfterIncrement,
                        })}

                        <div className="todayShifts__list">
                          {getBeforeAfterShifts(false, afterIncrement)}
                        </div>

                        {sortArrow({
                          before: false,
                          direction: "down",
                          increment: afterIncrement,
                          value: 1,
                          setIncrement: setAfterIncrement,
                        })}
                      </Fragment>
                    ) : (
                      <p className="error--lg">
                        There are no upcoming shifts today
                      </p>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
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
        {permissions.includes("view_stats") && (
          <Stats
            title="Admin Panel"
            type="business"
            startDate={startDate}
            endDate={endDate}
          />
        )}
        <div className="stats-graph">
          <div className="stats-graph__item">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminPanel;
