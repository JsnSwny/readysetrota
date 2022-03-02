import {
  startOfWeek,
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  addWeeks,
  isEqual,
  parseISO,
  format,
} from "date-fns";
import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Title from "../common/Title";

const YourShiftsMobile = () => {
  const [start, setStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [end, setEnd] = useState(
    endOfWeek(addWeeks(start, 4), { weekStartsOn: 1 })
  );
  const shifts = useSelector((state) => state.shifts.shifts);
  const interval = eachDayOfInterval({
    start,
    end,
  });

  const getShiftsByDate = (date) => {
    return shifts.filter((shift) => isEqual(parseISO(shift.date), date));
  };

  return (
    <Fragment>
      <Title name="Your Shifts" />
      <div className="wrapper--md">
        <ul className="calendar-mobile">
          {interval.map((item, index) => (
            <li
              data-date={format(item, "yyyy-MM-dd")}
              className={`calendar-mobile__item
          
`}
            >
              <div className="calendar-mobile__date">
                <h4>{format(item, "EEE")}</h4>
                <p>{format(item, "d")}</p>
                <p>{format(item, "MMM")}</p>
              </div>
              {getShiftsByDate(item).map((shift) => (
                <div className="calendar-mobile__shift">
                  <h4>
                    {shift.start_time} - {shift.end_time}
                  </h4>
                  <p>{shift.length} hours</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default YourShiftsMobile;
