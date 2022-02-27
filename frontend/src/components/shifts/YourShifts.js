import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../common/Title";
import { getShifts } from "../../actions/shifts";
import {
  startOfMonth,
  format,
  parseISO,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  getMonth,
  isEqual,
  addMonths,
  parse,
  isSameMonth,
  isToday,
} from "date-fns";
import { isInViewport } from "../../utils/hooks/isInViewport";
import ShiftItem from "./ShiftItem";

const YourShifts = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [endMonth, setEndMonth] = useState(
    addMonths(startOfMonth(new Date()), 3)
  );

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

  let current = useSelector((state) => state.employees.current);
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

  useEffect(() => {
    dispatch(
      getShifts(format(new Date(), "yyyy-MM-dd"), "", true, true, user.id)
    );
  }, [current]);

  const middleOfMonth = (date) => {
    let monthInterval = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });

    let pos = monthInterval[Math.round((monthInterval.length - 1) / 2)];
    return interval.findIndex((item) => isEqual(item, pos));
  };

  console.log(interval);

  useEffect(() => {
    let observer = new IntersectionObserver(updateMonth, {
      threshold: [0.9],
    });

    // if (
    //   interval.length - interval.findIndex((item) => isEqual(month, item)) <
    //   30
    // ) {
    //   setEndMonth(addMonths(endMonth, 1));
    //   setInterval(updateInterval(new Date(), addMonths(endMonth, 1)));
    // }

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
    <div className="">
      <div className="yshifts">
        <div className="yshifts__bar">
          <h2 className="yshifts__month">{format(month, "MMMM yyyy")}</h2>
          <ul className="yshifts__dayLabels">
            {days.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <ul className="yshifts-calendar">
          {interval.map((item, index) => (
            <li
              ref={elementsRef.current[index]}
              data-date={format(item, "yyyy-MM-dd")}
              className={`yshifts-calendar__item ${
                isSameMonth(item, month) ? "" : "hide"
              } ${isToday(item) ? "today" : ""}
              
`}
            >
              <h3 className="yshifts-calendar__date">
                {format(item, "d") == 1
                  ? format(item, "d MMM")
                  : format(item, "d")}
              </h3>
              {getShiftsByDate(item).map((shift) => (
                <div className="yshifts-calendar__shift">
                  {shift.start_time} - {shift.end_time}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YourShifts;
