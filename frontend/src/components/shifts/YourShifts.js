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
} from "date-fns";
import { isInViewport } from "../../utils/hooks/isInViewport";
import ShiftItem from "./ShiftItem";

const YourShifts = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(startOfMonth(new Date()));
  let current = useSelector((state) => state.employees.current);
  const shifts = useSelector((state) => state.shifts.shifts);

  let user = useSelector((state) => state.auth.user);
  let employee = user.employee.find(
    (item) => item.position[0].department.site == current.site.id
  );
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

  let interval = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfMonth(shifts.length > 0 ? parseISO(shifts.at(-1).date) : month),
  });

  return (
    <div className="">
      <div className="yshifts">
        {/* <h2 className="yshifts__month">{format(month, "MMMM yyyy")}</h2> */}
        <ul className="yshifts__dayLabels">
          {days.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <ul className="yshifts-calendar">
          {interval.map((item, index) => (
            <ShiftItem item={item} interval={interval} setMonth={setMonth} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YourShifts;
