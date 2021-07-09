import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHolidays, getSites } from "../../../actions/employees";
import HolidayRequest from "./HolidayRequest";
import Stats from "./stats/Stats";
import SiteOverview from "./SiteOverview";
import Title from "../../common/Title";
import { Link } from "react-router-dom";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import { getTodayShifts } from "../../../actions/shifts";
import { Bar, Line } from "react-chartjs-2";

const AdminPanel = (props) => {
  const dispatch = useDispatch();

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

  const [beforeIncrement, setBeforeIncrement] = useState(0);
  const [afterIncrement, setAfterIncrement] = useState(0);

  let today = new Date();

  useEffect(() => {
    dispatch(getHolidays(current.site.id));
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
    labels: stats.hours.map((item, idx) => item.day),
    datasets: [
      {
        label: "Hours Worked",
        data: stats.hours.map((item) => item.c),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
      <div className="dashboard wrapper--md">
        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Notifications</h2>
        </div>
        <hr class="separator" />
        <div className="notifications">
          <div className="flex-container">
            {current.site.unpublished_shifts > 0 && (
              <Link to="/rota" className="notifications__item">
                You have{" "}
                <strong>
                  {current.site.unpublished_shifts} unpublished shifts
                </strong>{" "}
                to publish
                <i class="fas fa-chevron-right"></i>
              </Link>
            )}

            {current.site.unmarked_holidays > 0 && (
              <Link to="/availability" className="notifications__item">
                You have{" "}
                <strong>
                  {current.site.unmarked_holidays} availability requests
                </strong>{" "}
                to review
                <i class="fas fa-chevron-right"></i>
              </Link>
            )}

            {current.site.number_of_employees == 0 && (
              <Link to="/staff-management" className="notifications__item">
                Create your
                <strong> first employee</strong>
                <i class="fas fa-chevron-right"></i>
              </Link>
            )}
          </div>
        </div>

        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Today's Shifts</h2>
        </div>
        <hr class="separator" />
        <div className="todayShifts">
          {isLoading ? (
            <div class="dot-pulse"></div>
          ) : (
            <Fragment>
              <div className="todayShifts__container">
                <h3 className="todayShifts__title">Previous Shifts</h3>
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

        <div className="dashboard__header">
          <h2 className="dashboard__header-title">Analytics Overview</h2>
        </div>
        <hr class="separator" />
        {permissions.includes("view_stats") && (
          <Stats title="Admin Panel" type="business" />
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
