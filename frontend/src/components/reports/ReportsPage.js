import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, eachDayOfInterval, format, parseISO } from "date-fns";
import { getForecast } from "../../actions/employees";
import { getReportData } from "../../actions/stats";
import ReportStatItem from "./ReportStatItem";
import Select from "react-select";
import CountUp from "react-countup";
import axios from "axios";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
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
    <Fragment>
      <Title name="Reports" />
      <div className="wrapper--md">
        <div className="list-banner list-banner--report">
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
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              value={basedOn}
              onChange={(e) => setBasedOn(e)}
              options={[
                { value: "actual", label: "Actual" },
                { value: "predicted", label: "Predicted" },
              ]}
              placeholder={"Select which values to use"}
            />
            <button onClick={exportReport} className="btn-3 btn-3--export">
              Export
            </button>
          </div>
        </div>
        <ul className="report-boxes">
          <li
            className={`report-boxes__item report-boxes__item--yellow ${
              activeGraph == "Shifts" ? "active" : activeGraph ? "hide" : ""
            }`}
          >
            <div className="flex-container--between">
              <h3>Shifts</h3>
              <i
                class="fas fa-expand"
                onClick={() =>
                  setActiveGraph(activeGraph != "Shifts" ? "Shifts" : false)
                }
              ></i>
            </div>

            {!loading.stats ? (
              <CountUp
                start={0}
                end={report.reduce((a, b) => a + b.total_shifts, 0)}
                duration={1}
                decimals={0}
                separator={","}
              />
            ) : (
              <span>0</span>
            )}
            <ReportStatItem
              data={[...report].reverse().map((item) => item.total_shifts)}
              range={[...range].reverse()}
              color="rgb(255,211,0)"
            />
          </li>
          <li
            className={`report-boxes__item report-boxes__item--orange ${
              activeGraph == "Labour Cost"
                ? "active"
                : activeGraph
                ? "hide"
                : ""
            }`}
          >
            <div className="flex-container--between">
              <h3>Labour Cost</h3>
              <i
                class="fas fa-expand"
                onClick={() =>
                  setActiveGraph(
                    activeGraph != "Labour Cost" ? "Labour Cost" : false
                  )
                }
              ></i>
            </div>

            {/* <p>£{numberWithCommas(sumValues(report.total_cost))}</p> */}
            {!loading.stats ? (
              <CountUp
                start={0}
                end={report.reduce((a, b) => a + b.total_cost, 0)}
                duration={1}
                decimals={2}
                prefix={"£"}
                separator={","}
              />
            ) : (
              <span>£0</span>
            )}
            <ReportStatItem
              data={[...report]
                .reverse()
                .map((item) => parseInt(item.total_cost))}
              range={[...range].reverse()}
              color="rgb(34,198,240)"
            />
          </li>
          <li
            className={`report-boxes__item report-boxes__item--green ${
              activeGraph == "Revenue" ? "active" : activeGraph ? "hide" : ""
            }`}
          >
            <div className="flex-container--between">
              <h3>Revenue</h3>
              <i
                class="fas fa-expand"
                onClick={() =>
                  setActiveGraph(activeGraph != "Revenue" ? "Revenue" : false)
                }
              ></i>
            </div>

            {!loading.stats ? (
              <CountUp
                start={0}
                end={report.reduce((a, b) => a + b.revenue, 0)}
                duration={1}
                decimals={2}
                prefix={"£"}
                separator={","}
              />
            ) : (
              <span>£0</span>
            )}
            <ReportStatItem
              data={[...report].reverse().map((item) => parseInt(item.revenue))}
              range={[...range].reverse()}
              color="rgb(91,208,117)"
            />
          </li>
          <li
            className={`report-boxes__item report-boxes__item--pink ${
              activeGraph == "Labour %" ? "active" : activeGraph ? "hide" : ""
            }`}
          >
            <div className="flex-container--between">
              <h3>Labour % (Average)</h3>
              <i
                class="fas fa-expand"
                onClick={() =>
                  setActiveGraph(activeGraph != "Labour %" ? "Labour %" : false)
                }
              ></i>
            </div>

            {!loading.stats ? (
              <Fragment>
                <CountUp
                  start={0}
                  end={
                    report.reduce((a, b) => a + b.labour_percentage, 0) /
                    report.length
                  }
                  duration={1}
                  decimals={2}
                  suffix={"%"}
                />
                {/* <span>
                {report.reduce((a, b) => a + b.labour_diff, 0) / report.length}%
              </span> */}
              </Fragment>
            ) : (
              <span>0.00%</span>
            )}

            <ReportStatItem
              data={[...report].reverse().map((item) => item.labour_percentage)}
              range={[...range].reverse()}
              color="rgb(253,128,158)"
            />
          </li>
        </ul>
        <table className="listing">
          <thead>
            <tr>
              <th>Date</th>
              <th className="hide-mobile">Shifts / Hours</th>
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
                    <td className="bold">
                      {format(parseISO(item.date), "dd/MM/yyyy")}
                    </td>
                    <td className="hide-mobile">
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
    </Fragment>
  );
};

export default ReportsPage;
