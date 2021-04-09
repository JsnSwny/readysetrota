import React from "react";
import { useSelector } from "react-redux";
import { addBusinessDays, format } from "date-fns";
import AddShiftButton from "./AddShiftButton";
import CountUp from "react-countup";

const Dates = (props) => {
  const {
    filterEmployees,
    scrollPosition,
    template,
    dates,
    shifts,
    setOpen,
    setType,
    setUpdate,
    setForecastDate,
    forecastDate,
    filterDate,
  } = props;
  let employees = useSelector((state) => state.employees.employees);
  let current = useSelector((state) => state.employees.current);
  let forecast = useSelector((state) => state.employees.forecast);
  let sites = useSelector((state) => state.employees.sites);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let business = useSelector((state) => state.employees.business);
  let siteAdmin = useSelector((state) => state.employees.site_admin);

  const getWeeklyCost = (dateList, fun) => {
    return dateList
      .map((item) => parseFloat(fun(item)))
      .reduce((a, b) => a + b, 0);
  };

  const getCost = (date) => {
    date = format(date, "yyyy-MM-dd");
    let shifts_filtered = shifts.filter((item) => item.date == date);
    let hourly = shifts_filtered
      .map(
        (item) =>
          item.employee &&
          item.absence == "None" &&
          item.employee.wage_type == "H" &&
          +parseFloat(item.wage * item.length).toFixed(2)
      )
      .reduce((a, b) => a + b, 0.0);
    let salary = employees
      .map(
        (item) =>
          item.wage_type == "S" && +(parseFloat(item.wage) / 365).toFixed(2)
      )
      .reduce((a, b) => a + b, 0.0);
    return parseFloat(hourly + salary).toFixed(2);
  };

  const getAmount = (date) => {
    let forecastValue = forecast.find(
      (item) => item.date == format(date, "yyyy-MM-dd")
    );
    if (forecastValue) {
      return parseFloat(forecastValue.amount).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <section
      className={`dates container ${filterDate ? "filtered" : ""} ${
        scrollPosition >= 250 ? " fixed" : ""
      }`}
    >
      <div className="dates__container">
        <div className="container-left">
          <div className="item-block dates__date">
            <p className="item-block__title">
              {format(dates[0], "do MMMM")} -{" "}
              {format(dates[dates.length - 1], "do MMMM")}
            </p>
            {permissions.includes("manage_wages") && business.plan != "F" && (
              <small>
                £
                <CountUp
                  duration={1}
                  decimals={2}
                  end={getWeeklyCost(dates, getCost)}
                />
                {forecast.length > 0
                  ? `/ £${getWeeklyCost(dates, getAmount)} (${(
                      (getWeeklyCost(dates, getCost) /
                        getWeeklyCost(dates, getAmount)) *
                      100
                    ).toFixed(2)}%)`
                  : ""}
              </small>
            )}
          </div>
        </div>

        <div className="container-right">
          {dates.map((date) => (
            <div
              key={date}
              className={`item-block dates__date ${
                filterDate == format(date, "yyyy-MM-dd") ? "filtered" : ""
              }`}
            >
              {settings.forecasting &&
                permissions.includes("create_forecasts") &&
                business.plan != "F" && (
                  <i
                    onClick={() => {
                      setOpen(true);
                      setType("forecast");
                      setUpdate(
                        forecast.find(
                          (item) => item.date == format(date, "yyyy-MM-dd")
                        )
                      );
                      setForecastDate(date);
                    }}
                    class="fas fa-coins"
                  ></i>
                )}

              <p className="item-block__title">
                {format(date, "ccc do MMM").split(" ")[0]}
                <br></br>
                {format(date, "ccc do MMM").split(" ")[1]}{" "}
                {format(date, "ccc do MMM").split(" ")[2]}
              </p>
              {permissions.includes("manage_wages") && business.plan != "F" && (
                <small>
                  {permissions.includes("manage_wages") && `£${getCost(date)}`}

                  {/* <CountUp duration={1} decimals={2} end={getCost(date)} /> */}

                  {forecast.some(
                    (item) => item.date == format(date, "yyyy-MM-dd")
                  )
                    ? settings.forecasting &&
                      `/ £${getAmount(date)} (${(
                        (getCost(date) / getAmount(date)) *
                        100
                      ).toFixed(2)}%)`
                    : ""}
                </small>
              )}
              {template ? (
                <AddShiftButton
                  date={format(date, "yyyy-MM-dd")}
                  white={true}
                  template={true}
                />
              ) : (
                <i
                  className="dates__sort fas fa-sort-down"
                  onClick={() => filterEmployees(format(date, "yyyy-MM-dd"))}
                ></i>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dates;
