import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, addDays, eachDayOfInterval, format } from "date-fns";
import { getForecast } from "../../actions/employees";
import ForecastModal from "../modals/ForecastModal";
import { getReportData } from "../../actions/stats";
import { numberWithCommas } from "../Utilities";
import ReportStatItem from "./ReportStatItem";
import CountUp from "react-countup";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(addDays(new Date(), -3));
  const [endDate, setEndDate] = useState(new Date());
  const [range, setRange] = useState([]);
  const forecast = useSelector((state) => state.employees.forecast);
  const report = useSelector((state) => state.report.data);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(
      getForecast(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      )
    );
    dispatch(getReportData(startDate, endDate));
    setRange(eachDayOfInterval({ start: startDate, end: endDate }).reverse());
  }, [startDate, endDate]);

  const getForecastValues = (date) => {
    return forecast.find((item) => item.date == format(date, "yyyy-MM-dd"));
  };

  const getTotalRevenue = () => {
    let val = forecast.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b.actual);
    }, 0);

    return val;
  };

  const sumValues = (obj) =>
    parseFloat(
      Object.values(obj)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );

  const dailyLabourPercentage = (date) => {
    const formattedDateAlt = format(date, "yyyy-MM-dd");
    const labourPercentage = (
      (report.total_cost[formattedDateAlt] / getForecastValues(date)?.actual) *
      100
    ).toFixed(2);

    return labourPercentage;
  };

  const totalLabourPercentage = () => {
    const labourPercentage = (
      (sumValues(report.total_cost) / getTotalRevenue()) *
      100
    ).toFixed(2);

    return labourPercentage ? parseFloat(labourPercentage) : 0.0;
  };

  return (
    <div className="wrapper--md">
      <div className="banner">
        <Title name="Reports" breakWord={false} />
      </div>
      <div className="list-banner">
        <div className="date-range-selector flex-container--align-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form__input"
            dateFormat="MMMM do yyyy"
          />
          <p>to</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form__input"
            dateFormat="MMMM do yyyy
            "
          />
        </div>
        <div className="list-banner__right">
          <button
            className="btn-3"
            onClick={() => {
              false;
            }}
          >
            Export
          </button>
        </div>
      </div>
      <ul className="report-boxes">
        <li className="report-boxes__item report-boxes__item--yellow">
          <h3>Shifts</h3>
          {!loading.stats ? (
            <CountUp
              start={0}
              end={report.shifts.reduce((a, b) => a + b.c, 0)}
              duration={1}
              decimals={0}
              separator={","}
            />
          ) : (
            <span>0</span>
          )}
          <ReportStatItem
            data={report.shifts.map((item) => item.c)}
            range={range}
            color="rgb(255,211,0)"
          />
        </li>
        <li className="report-boxes__item report-boxes__item--orange">
          <h3>Labour Cost</h3>
          {/* <p>£{numberWithCommas(sumValues(report.total_cost))}</p> */}
          {!loading.stats ? (
            <CountUp
              start={0}
              end={sumValues(report.total_cost)}
              duration={1}
              decimals={2}
              prefix={"£"}
              separator={","}
            />
          ) : (
            <span>£0</span>
          )}
          <ReportStatItem
            data={Object.values(report.total_cost).map((item) =>
              parseInt(item)
            )}
            range={range}
            color="rgb(34,198,240)"
          />
        </li>
        <li className="report-boxes__item report-boxes__item--green">
          <h3>Revenue</h3>
          {!loading.stats ? (
            <CountUp
              start={0}
              end={getTotalRevenue()}
              duration={1}
              decimals={2}
              prefix={"£"}
              separator={","}
            />
          ) : (
            <span>£0</span>
          )}
          <ReportStatItem
            data={forecast.map((item) => parseInt(item.actual))}
            range={range}
            color="rgb(91,208,117)"
          />
        </li>
        <li className="report-boxes__item report-boxes__item--pink">
          <h3>Labour %</h3>
          {!loading.stats ? (
            <CountUp
              start={0}
              end={totalLabourPercentage()}
              duration={1}
              decimals={2}
            />
          ) : (
            <span>0.00%</span>
          )}

          <ReportStatItem
            data={range.map((item) => dailyLabourPercentage(item))}
            range={range}
            color="rgb(253,128,158)"
          />
        </li>
      </ul>
      <table className="listing">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shifts / Hours</th>
            <th>Labour Cost</th>
            <th>Revenue</th>
            <th>Labour Percentage (% Diff)</th>
          </tr>
        </thead>
        <tbody>
          {range.map((date) => {
            const formattedDate = format(date, "dd/MM/yyyy");
            const formattedDateAlt = format(date, "yyyy-MM-dd");
            const labourPercentage = (
              (report.total_cost[formattedDateAlt] /
                getForecastValues(date)?.actual) *
              100
            ).toFixed(2);

            const labourDiff = (
              labourPercentage - getForecastValues(date)?.labourGoal
            ).toFixed(2);

            if (report) {
              return (
                <tr>
                  {/* (getWeeklyCost([date], getCost) / getWeeklyCost([date],
                  getAmount)) * 100 ).toFixed(2); */}
                  <td className="bold">{formattedDate}</td>
                  <td>
                    {report.shifts.find((d) => d.day == formattedDateAlt)?.c} /{" "}
                    {report.total_hours[formattedDateAlt]}hrs
                  </td>
                  <td>£{report.total_cost[formattedDateAlt]}</td>
                  <td>£{getForecastValues(date)?.actual}</td>
                  <td>
                    {labourPercentage}% (
                    <span
                      className={`${
                        labourDiff > 0 ? "percentage--red" : "percentage--green"
                      }`}
                    >
                      {labourDiff}%
                    </span>
                    )
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
