import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  eachDayOfInterval,
  isEqual,
  parseISO,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { isInViewport } from "../../utils/hooks/isInViewport";

const ShiftItem = ({ item, interval, setMonth }) => {
  const shifts = useSelector((state) => state.shifts.shifts);
  const ref = useRef(null);
  const middleOfMonth = (date) => {
    let monthInterval = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });

    let pos = monthInterval[Math.round((monthInterval.length - 1) / 2)];
    return interval.findIndex((item) => isEqual(item, pos));
  };

  const isActive = (date, index) => {
    let middle = middleOfMonth(date);
    if (!middle) return false;

    return isInViewport(ref);
  };

  useEffect(() => {
    isInViewport(ref);
  }, []);

  const getShiftsByDate = (date) => {
    return shifts.filter((shift) => isEqual(parseISO(shift.date), date));
  };
  return (
    <li
      ref={ref}
      className={`yshifts-calendar__item ${isActive(item) ? "" : "hide"}`}
    >
      <h3 className="yshifts-calendar__date">{format(item, "d")}</h3>
      {getShiftsByDate(item).map((shift) => (
        <div className="yshifts-calendar__shift">
          {shift.start_time} - {shift.end_time}
        </div>
      ))}
    </li>
  );
};

export default ShiftItem;
