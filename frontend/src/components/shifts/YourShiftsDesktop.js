import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import {
  startOfMonth,
  format,
  parseISO,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isEqual,
  addMonths,
  parse,
  isSameMonth,
  isToday,
} from "date-fns";

const YourShiftsDesktop = () => {
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [endMonth, setEndMonth] = useState(
    addMonths(startOfMonth(new Date()), 5)
  );

  const calendarRef = useRef(null);
  const updateInterval = (start, end) => {
    return eachDayOfInterval({
      start: startOfWeek(start, {
        weekStartsOn: 1,
      }),
      end: endOfWeek(end, {
        weekStartsOn: 1,
      }),
    });
  };

  const [interval, setInterval] = useState(updateInterval(month, endMonth));

  const shifts = useSelector((state) => state.shifts.shifts);

  let user = useSelector((state) => state.auth.user);
  let elementsRef = useRef(interval.map(() => createRef()));

  const updateMonth = (entries, observer) => {
    let firstMonth = entries.find((item) => item.isIntersecting);

    let firstMonthDate = parse(
      firstMonth.target.dataset.date,
      "yyyy-MM-dd",
      new Date()
    );

    setMonth(firstMonthDate);
    observer.disconnect();
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const middleOfMonth = (date) => {
    let monthInterval = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });

    let pos = monthInterval[Math.round((monthInterval.length - 1) / 2)];
    return interval.findIndex((item) => isEqual(item, pos));
  };

  useEffect(() => {
    let observer = new IntersectionObserver(updateMonth, {
      threshold: [0.9],
    });

    interval.forEach((item) => {
      let middle = middleOfMonth(item);
      if (middle <= 0) return false;
      observer.observe(elementsRef.current[middle].current);
    });
  }, [month]);

  const getShiftsByDate = (date) => {
    return shifts.filter((shift) => isEqual(parseISO(shift.date), date));
  };

  return (
    <div className="calendar">
      <div className="calendar__bar">
        <h2 className="calendar__month">{format(month, "MMMM yyyy")}</h2>
        <ul className="calendar__dayLabels">
          {days.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <ul className="calendar-dates" ref={calendarRef}>
        {interval.map((item, index) => (
          <li
            ref={elementsRef.current[index]}
            data-date={format(item, "yyyy-MM-dd")}
            className={`calendar-dates__item ${
              isSameMonth(item, month) ? "" : "hide"
            } ${isToday(item) ? "today" : ""}
              
`}
          >
            <h3 className="calendar-dates__date">
              {format(item, "d") == 1
                ? format(item, "d MMM")
                : format(item, "d")}
            </h3>
            {getShiftsByDate(item).map((shift) => (
              <div className="calendar-dates__shift">
                {shift.start_time} - {shift.end_time}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourShiftsDesktop;
