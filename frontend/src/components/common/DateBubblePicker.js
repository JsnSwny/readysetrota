import React, { useState, useEffect } from "react";
import {
  addDays,
  eachDayOfInterval,
  format,
  isBefore,
  differenceInDays,
} from "date-fns";

const DateBubblePicker = ({ currentDate, setCurrentDate, maxDate }) => {
  const [dateRange, setDateRange] = useState(
    eachDayOfInterval({
      start: addDays(new Date(), -3),
      end: addDays(new Date(), 3),
    })
  );

  useEffect(() => {
    let range = eachDayOfInterval({
      start: addDays(currentDate, -3),
      end: addDays(currentDate, 3),
    });
    if (maxDate) {
      range = range.filter((item) => item <= maxDate);
    }
    console.log("RANGE", range);
    setDateRange(range);
  }, [currentDate]);

  const beforeAfterCurrent = (date) => {
    if (differenceInDays(date, currentDate) == 0) {
      return "current";
    } else if (isBefore(date, new Date())) {
      return "before";
    } else {
      return "after";
    }
  };

  return (
    <ul className="date-bubble-picker">
      {dateRange.map((item) => (
        <li
          onClick={() => setCurrentDate(item)}
          className={`date-bubble-picker__item date-bubble-picker__item--${beforeAfterCurrent(
            item
          )} noselect`}
        >
          <div>{format(item, "EEE")}</div>
          <div>{format(item, "dd")}</div>
        </li>
      ))}
    </ul>
  );
};

export default DateBubblePicker;
