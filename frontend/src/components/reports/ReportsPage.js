import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addMonths,
  eachDayOfInterval,
  format,
  parseISO,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";
import { getForecast } from "../../actions/employees";
import { getReportData } from "../../actions/stats";
import ReportStatItem from "./ReportStatItem";
import Select from "react-select";
import CountUp from "react-countup";
import axios from "axios";
import ReportItem from "./ReportItem";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(subMonths(new Date(), 3));
  const [endDate, setEndDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({
    value: "3 months",
    label: "Last 3 months",
  });
  const [range, setRange] = useState([]);
  const forecast = useSelector((state) => state.employees.forecast);
  const report = useSelector((state) => state.report.data);
  const loading = useSelector((state) => state.loading);
  const [activeGraph, setActiveGraph] = useState(false);
  const current = useSelector((state) => state.employees.current);
  const [basedOn, setBasedOn] = useState({ value: "actual", label: "Actual" });
  const auth = useSelector((state) => state.auth);

  const options = [
    { value: "actual", label: "Actual" },
    { value: "predicted", label: "Predicted" },
  ];

  useEffect(() => {
    dispatch(
      getForecast(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      )
    );
    dispatch(getReportData(startDate, endDate, basedOn.value));
    setRange(eachDayOfInterval({ start: startDate, end: endDate }).reverse());
  }, [startDate, endDate]);

  useEffect(() => {
    dispatch(getReportData(startDate, endDate, basedOn.value));
  }, [basedOn, current.site]);

  const exportReport = () => {
    const token = auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .get(
        `api/report/?site_id=${current.site.id}&start_date=${format(
          startDate,
          "dd/MM/yyyy"
        )}&end_date=${format(endDate, "dd/MM/yyyy")}&based_on=${
          basedOn.value
        }&exportData=true`,
        config
      )
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
  };

  return (
    <div className="wrapper--md">
      <Title
        name="Reports"
        subtitle="Financial overview based on shift information"
        customButtons={
          <>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              value={dateRange}
              onChange={(e) => {
                setDateRange(e);
                switch (e.value) {
                  case "7 days":
                    setStartDate(subDays(new Date(), 6));
                    break;
                  case "4 weeks":
                    setStartDate(subDays(new Date(), 27));
                    break;
                  case "3 months":
                    setStartDate(addDays(subMonths(new Date(), 3), 1));
                    break;
                  case "6 months":
                    setStartDate(addDays(subMonths(new Date(), 6), 1));
                    break;
                  case "12 months":
                    setStartDate(addDays(subMonths(new Date(), 12), 1));
                    break;
                }
              }}
              options={[
                { value: "7 days", label: "Last 7 days" },
                { value: "4 weeks", label: "Last 4 weeks" },
                { value: "3 months", label: "Last 3 months" },
                { value: "6 months", label: "Last 6 months" },
                { value: "12 months", label: "Last 12 months" },
              ]}
            />
            <Select
              className="react-select-container ml-2"
              classNamePrefix="react-select"
              value={basedOn}
              onChange={(e) => setBasedOn(e)}
              options={[
                { value: "actual", label: "Actual" },
                { value: "predicted", label: "Predicted" },
              ]}
              placeholder={"Select which values to use"}
            />
            <button onClick={exportReport} className="btn-3 ml-2">
              Export
            </button>
          </>
        }
      />
      <ul className="flex flex-wrap justify-between list-none mb-4 sm:mb-2 xl:mb-6">
        <ReportItem
          name="Shifts"
          value={report.reduce((a, b) => a + b.total_shifts, 0)}
          icon="fa-calendar-alt"
        />
        <ReportItem
          name="Labour cost"
          value={`£${report.reduce((a, b) => a + b.total_cost, 0)}`}
          icon="fa-briefcase"
        />
        <ReportItem
          name="Revenue"
          value={`£${report.reduce((a, b) => a + b.revenue, 0)}`}
          icon="fa-money-bill"
        />
        <ReportItem
          name="Labour percentage"
          value={`${(
            report.reduce((a, b) => a + b.labour_percentage, 0) / report.length
          ).toFixed(2)}
        %`}
          icon="fa-percentage"
        />
      </ul>
      <ReportStatItem
        data={[...report].reverse().map((item) => parseInt(item.total_cost))}
        data2={[...report].reverse().map((item) => parseInt(item.revenue))}
        range={[...range].reverse()}
        color="rgb(239,12,68)"
      />
      <div className="overflow-x-auto mb-16">
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
            {report.map((item) => {
              if (report) {
                return (
                  <tr>
                    <td className="text-black font-bold">
                      {format(parseISO(item.date), "dd/MM/yyyy")}
                    </td>
                    <td>
                      {item.total_shifts} / {item.total_hours}hrs
                    </td>
                    <td>£{item.total_cost}</td>
                    <td>£{item.revenue}</td>
                    <td>
                      {item.labour_percentage}% (
                      <span
                        className={`${
                          item.labour_diff > 0
                            ? "percentage--red"
                            : "percentage--green"
                        }`}
                      >
                        {item.labour_diff}%
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
    </div>
  );
};

export default ReportsPage;
