import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

const FinancialBar = ({
  dates,
  financialMode,
  setOpen,
  setType,
  setUpdate,
  setForecastDate,
  setExtra,
}) => {
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let business = useSelector((state) => state.employees.business);
  let employees = useSelector((state) => state.employees.employees);
  let forecast = useSelector((state) => state.employees.forecast);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  let shifts = useSelector((state) => state.shifts.shifts);

  const getPercentage = (date) => {
    if (forecast.some((item) => item.date == format(date, "yyyy-MM-dd"))) {
      if (
        forecast.find((item) => item.date == format(date, "yyyy-MM-dd"))[
          financialMode
        ] > 0
      )
        if (settings.forecasting) {
          return (
            (getWeeklyCost([date], getCost) /
              getWeeklyCost([date], getAmount)) *
            100
          ).toFixed(2);
        }
    }
    return false;
  };

  const getWeeklyCost = (dateList, fun) => {
    return dateList
      .map((item) =>
        parseFloat(fun(item, financialMode == "actual" ? "p" : ""))
      )
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  };

  const getWage = (date, employee) => {
    let result = employee.wage;
    if (result) {
      result.sort((a, b) => {
        return (
          Math.abs(date - parseISO(a.start_date)) -
          Math.abs(date - parseISO(b.start_date))
        ); // sort a before b when the distance is smaller
      });
      result = result.filter((item) => parseISO(item.start_date) <= date);
      if (result.length > 0) {
        result = result[0];
      }
      if (result.wage_type == "S") {
        return parseFloat((result.wage / 52 / 7).toFixed(2));
      } else if (result.wage_type == "H") {
        return 0;
      }
    }
    return 0;
  };

  const getHours = (dateList) => {
    let shifts_filtered = shifts.filter((item) =>
      dateList.some((date) => format(date, "yyyy-MM-dd") == item.date)
    );
    if (financialMode == "actual") {
      shifts_filtered = shifts_filtered.filter(
        (item) => item.stage == "Published"
      );
    }
    return shifts_filtered
      .map((item) =>
        financialMode == "actual"
          ? item.timeclock
            ? item.timeclock.length
            : 0
          : item.length
      )
      .reduce((a, b) => a + b, 0.0)
      .toFixed(1);
  };

  const getHourly = (date, type) => {
    let formatDate = format(date, "yyyy-MM-dd");
    let shifts_filtered = shifts.filter((item) => item.date == formatDate);
    if (type == "p") {
      shifts_filtered = shifts_filtered.filter(
        (item) => item.stage == "Published"
      );
    }
    let hourly = shifts_filtered
      .map(
        (item) =>
          item.employee &&
          item.absence == "None" &&
          item.wage > 0 &&
          (type == "p"
            ? item.timeclock
              ? +parseFloat(item.wage * item.timeclock.length).toFixed(2)
              : 0
            : +parseFloat(item.wage * item.length).toFixed(2))
      )
      .reduce((a, b) => a + b, 0.0);

    return hourly;
  };

  const getCost = (date, type) => {
    let total = employees.map((item) => getWage(date, item));
    if (total.length == 0) return 0;
    total = total.reduce((a, b) => a + b);

    total += getHourly(date, type);

    return total.toFixed(2);
  };

  const getAmount = (date) => {
    let forecastValue = forecast.find(
      (item) => item.date == format(date, "yyyy-MM-dd")
    );
    if (forecastValue) {
      return parseFloat(forecastValue[financialMode]).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <div className="financialBar">
      <div className="wrapper--md flex-container">
        <div className="container-left">
          <div>
            <p className="flex-container--between">
              <strong>Hours:</strong> {getHours(dates)}hrs
            </p>
          </div>
          <div>
            <p className="flex-container--between">
              <strong>Pay/Sales:</strong> £{getWeeklyCost(dates, getCost)} / £
              {getWeeklyCost(dates, getAmount)}
            </p>
          </div>
          <div>
            <p className="flex-container--between">
              <strong>Percentage:</strong>{" "}
              {forecast.length > 0 && settings.forecasting
                ? `${(
                    (getWeeklyCost(dates, getCost) /
                      getWeeklyCost(dates, getAmount)) *
                    100
                  ).toFixed(2)}%`
                : ""}
            </p>
          </div>
        </div>
        <div className="container-right">
          {dates.map((date) => (
            <div key={date} className="item-block">
              <Fragment>
                <div>
                  <Fragment>{getHours([date])}hrs</Fragment>
                </div>
                <div>
                  <Fragment>
                    £{getWeeklyCost([date], getCost)} /{" "}
                    <u
                      onClick={() => {
                        setOpen(true);
                        setType("forecast");
                        setUpdate(
                          forecast.find(
                            (item) => item.date == format(date, "yyyy-MM-dd")
                          )
                        );
                        setExtra({ date, type: financialMode });
                        setForecastDate(date);
                      }}
                    >
                      £{getWeeklyCost([date], getAmount)}
                    </u>
                  </Fragment>
                </div>
                <div>
                  <p
                    className={`${getPercentage(date) > 100 ? "red" : "green"}`}
                  >
                    {getPercentage(date) ? `${getPercentage(date)}%` : "N/A"}
                  </p>
                </div>
              </Fragment>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialBar;
