import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModal from "../layout/confirm/ConfirmModal";
import Title from "../common/Title";
import {
  getTimeclocks,
  updateTimeclock,
  deleteTimeclock,
} from "../../actions/timeclock";
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  parseISO,
  isAfter,
} from "date-fns";
import WeeklyBubblePicker from "../common/WeeklyBubblePicker";
import {
  getForecast,
  updateForecast,
  addForecast,
} from "../../actions/employees";

const ForecastPage = () => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [dateRange, setDateRange] = useState([]);
  const [newForecast, setNewForecast] = useState([]);
  let forecast = useSelector((state) => state.employees.forecast);
  const current = useSelector((state) => state.employees.current);
  const loading = useSelector((state) => state.loading.forecast);
  const [updatingForecast, setUpdatingForecast] = useState(false);

  const initDateRange = () => {
    let range = eachDayOfInterval({
      start: currentDate,
      end: endOfWeek(currentDate, { weekStartsOn: 1 }),
    });
    range = range.map((item) => ({
      id: null,
      date: format(item, "yyyy-MM-dd"),
      predicted: 0,
      labourGoal: 0,
      actual: 0,
    }));
    setDateRange(range);

    return range;
  };

  useEffect(() => {
    dispatch(
      getForecast(
        format(currentDate, "yyyy-MM-dd"),
        format(endOfWeek(currentDate, { weekStartsOn: 1 }), "yyyy-MM-dd")
      )
    );
    initDateRange();
  }, [currentDate]);

  useEffect(() => {
    let rangeTemp = [];
    if (dateRange.length == 0) {
      rangeTemp = initDateRange();
    } else {
      rangeTemp = [...dateRange];
    }
    forecast.forEach((item) => {
      let rangeObj = rangeTemp.find((r) => r.date == item.date);
      if (rangeObj) {
        if (!isAltered(rangeObj) || updatingForecast == rangeObj.date) {
          rangeObj.id = item.id;
          rangeObj.predicted = item.predicted;
          rangeObj.labourGoal = item.labourGoal;
          rangeObj.actual = item.actual;
        }
      }
    });

    setDateRange(rangeTemp);
  }, [forecast]);

  const handleChange = (i, property, value) => {
    var items = [...dateRange];
    items[i] = { ...items[i], [property]: value };

    setDateRange(items);
  };

  const isAltered = (obj) => {
    let originalObj = forecast.find((item) => item.id == obj.id);
    if (!originalObj) {
      originalObj = {
        id: null,
        date: obj.date,
        predicted: 0,
        labourGoal: 0,
        actual: 0,
        shift: null,
      };
    }
    return !(JSON.stringify(obj) === JSON.stringify(originalObj));
  };

  const submitForecast = (item, idx) => {
    setUpdatingForecast(item.date);
    item.id
      ? dispatch(
          updateForecast(item.id, {
            ...dateRange[idx],
          })
        )
      : dispatch(
          addForecast({
            ...dateRange[idx],
            site_id: current.site.id,
          })
        );
  };

  return (
    <div className="wrapper--md">
      {confirmOpen && selectedTimeclock && (
        <ConfirmModal
          title={`Are you sure you want to delete this timeclock?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteTimeclock(selectedTimeclock.id));
          }}
        />
      )}

      <div className="banner">
        <Title name="Forecasting" breakWord={false} />
      </div>

      <h2>
        {format(currentDate, "do MMMM yyyy")} -{" "}
        {format(endOfWeek(currentDate, { weekStartsOn: 1 }), "do MMMM yyyy")}
      </h2>
      <div className="list-banner">
        <WeeklyBubblePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <div className="list-banner__right"></div>
      </div>

      <table className="listing listing-timesheet">
        <thead>
          <tr>
            <th>Date</th>
            <th>Estimated Revenue (£)</th>
            <th>Labour Percentage Goal (%)</th>
            <th>Actual Revenue (£)</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {dateRange.map((item, idx) => {
            return (
              <tr className="listing__row listing-timesheet">
                <td className="bold">
                  {format(parseISO(item.date), "iiii do MMMM")}
                </td>
                <td>
                  <input
                    className="input--table"
                    type="number"
                    step="0.01"
                    value={item.predicted}
                    onChange={(e) => {
                      handleChange(idx, "predicted", e.target.value);
                    }}
                    onKeyDown={(e) =>
                      e.key == "Enter" && submitForecast(item, idx)
                    }
                  />
                </td>
                <td>
                  <input
                    className="input--table"
                    type="number"
                    step="0.01"
                    value={item.labourGoal}
                    onChange={(e) => {
                      handleChange(idx, "labourGoal", e.target.value);
                    }}
                    onKeyDown={(e) =>
                      e.key == "Enter" && submitForecast(item, idx)
                    }
                  />
                </td>
                <td className="no-padding">
                  <input
                    className="input--table"
                    type="number"
                    step="0.01"
                    value={item.actual}
                    onChange={(e) => {
                      handleChange(idx, "actual", e.target.value);
                    }}
                    disabled={
                      isAfter(parseISO(item.date), new Date()) ? true : false
                    }
                    onKeyDown={(e) =>
                      e.key == "Enter" && submitForecast(item, idx)
                    }
                  />
                </td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      className={`fas fa-check listing-timesheet__save ${
                        isAltered(item) && "show"
                      }`}
                      onClick={() => {
                        submitForecast(item, idx);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastPage;
