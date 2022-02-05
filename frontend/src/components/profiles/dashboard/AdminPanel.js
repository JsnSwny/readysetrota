import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSites } from "../../../actions/employees";
import Title from "../../common/Title";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  addDays,
  addMonths,
  eachDayOfInterval,
} from "date-fns";
import { getTodayShifts } from "../../../actions/shifts";
import { Bar, Line } from "react-chartjs-2";
import { getStats } from "../../../actions/stats";
import DashboardShifts from "./DashboardShifts";
import StatsItem from "./StatsItem";
import { Link } from "react-router-dom";

const AdminPanel = ({ setDashboardView }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));

  let current = useSelector((state) => state.employees.current);
  let stats = useSelector((state) => state.stats.stats);
  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let user = useSelector((state) => state.auth.user);
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

  useEffect(() => {
    dispatch(getSites());
  }, []);

  useEffect(() => {
    dispatch(
      getTodayShifts(
        format(addDays(new Date(), -1), "yyyy-MM-dd"),
        format(addDays(new Date(), 1), "yyyy-MM-dd")
      )
    );
  }, [current.department]);

  return (
    <Fragment>
      <Title name="Dashboard" />
      {!user.business && (
        <p
          className="banner__link"
          onClick={() => setDashboardView("employee")}
        >
          View Employee Dashboard
        </p>
      )}
      <div className="dashboard wrapper--md">
        <div className="flex-container--align-center">
          <h2 className="title-sm">Shifts</h2>
        </div>

        <hr class="separator" />

        <div className="todayShifts">
          {isLoading ? (
            <div class="dot-pulse"></div>
          ) : shifts.length > 0 ? (
            <DashboardShifts />
          ) : (
            <p>No shifts to display</p>
          )}
        </div>
        <div className="dashboard__header">
          <h2 className="title-sm title--margin-top">Analytics Overview</h2>
          <select
            className="dashboard__select"
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
              title="Estimated Outcome"
              decimals={2}
              data={Object.values(stats.total_cost).map((item) =>
                parseInt(item)
              )}
              interval={interval}
              prefix={"£"}
            />
            <StatsItem
              title="Estimated Turnover"
              decimals={2}
              data={Object.values(stats.forecast_dif).map((item) =>
                parseInt(item)
              )}
              interval={interval}
              prefix={"£"}
            />
            <StatsItem
              title="Hours Worked"
              decimals={1}
              data={Object.values(stats.total_hours).map((item) =>
                parseInt(item)
              )}
              interval={interval}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AdminPanel;
