import React, { useState, useEffect } from "react";
import {
  addDays,
  eachDayOfInterval,
  format,
  isBefore,
  differenceInDays,
  getWeek,
  addWeeks,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  eachWeekOfInterval,
} from "date-fns";

const WeeklyBubblePicker = ({ currentDate, setCurrentDate }) => {
  const [dateRange, setDateRange] = useState([]);

  const getWeeks = () => {
    let start = startOfWeek(addWeeks(currentDate, -3), { weekStartsOn: 1 });
    let end = endOfWeek(addWeeks(currentDate, 3), { weekStartsOn: 1 });

    let weeks = eachWeekOfInterval(
      {
        start,
        end,
      },
      { weekStartsOn: 1 }
    );

    return weeks.map((item) => ({
      start: item,
      end: endOfWeek(item, { weekStartsOn: 1 }),
    }));
  };

  useEffect(() => {
    setDateRange(getWeeks());
  }, [currentDate]);

  return (
    <ul className="date-bubble-picker">
      {dateRange.map((item) => (
        <li
          onClick={() => setCurrentDate(item.start)}
          className={`date-bubble-picker__item date-bubble-picker__item--${
            differenceInDays(item.start, currentDate) == 0 && "current"
          } noselect`}
        >
          <div className="date-bubble-picker__text--sm">
            {format(item.start, "do MMM")}
          </div>
          <div className="date-bubble-picker__text--bold">
            {format(item.start, "I")}
          </div>
          <div className="date-bubble-picker__text--sm">
            {format(item.end, "do MMM")}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WeeklyBubblePicker;
