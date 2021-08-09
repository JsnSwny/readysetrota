import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DropButton from "../lists/DropButton";
import {
  updateAvailability,
  addAvailability,
  deleteAvailability,
  updateEmployee,
  getAllAvailability,
} from "../../actions/employees";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  differenceInDays,
  getDay,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  getDaysInMonth,
  getMonth,
  parseISO,
  isToday,
} from "date-fns";

import AvailabilityDate from "./AvailabilityDate";
import { getLeave } from "../../actions/availability";

const AvailabilityCalendarAdmin = ({
  selectedDate,
  setSelectedDate,
  getAvailability,
  dateRange,
  availabilityMonth,
  setAvailabilityMonth,
  getPerc,
  availabilityByDate,
  setSelectedEmployee,
}) => {
  const dispatch = useDispatch();

  let availability = useSelector((state) => state.employees.availability);
  let current = useSelector((state) => state.employees.current);
  let leave = useSelector((state) => state.availability.leave);
  let employees = useSelector((state) => state.employees.employees);

  return (
    <Fragment>
      <h3 className="title-sm">Calendar</h3>
      <hr className="separator"></hr>
      <div>
        <AvailabilityDate
          setAvailabilityMonth={setAvailabilityMonth}
          availabilityMonth={availabilityMonth}
          dateRange={dateRange}
        />
        <ul className="dashboardAvailability__list">
          {dateRange.map((date) => {
            const format_date = format(date, "yyyy-MM-dd");

            let values = {
              leave: [],
              leavePending: [],
              available: [],
              unavailable: [],
              unavailablePending: [],
              none: [],
            };

            employees.forEach((item) => {
              getAvailability(item, format_date, values);
            });

            let availableVal = getPerc(
              values["available"].length,
              employees.length
            );
            let unavailableVal = getPerc(
              values["unavailable"].length,
              employees.length
            );
            let unavailablePendingVal = getPerc(
              values["unavailablePending"].length,
              employees.length
            );
            let leaveVal = getPerc(values["leave"].length, employees.length);
            let leavePendingVal = getPerc(
              values["leavePending"].length,
              employees.length
            );

            let percVal = availableVal;

            let firstStyle = `#5bd075 ${percVal}%`;
            let secondStyle = `#d05b5b ${percVal}% ${
              percVal + unavailableVal
            }%`;
            percVal += unavailableVal;
            let thirdStyle = `#E7ADAD ${percVal}% ${
              percVal + unavailablePendingVal
            }%`;
            percVal += unavailablePendingVal;
            let fourthStyle = `#22c6f0 ${percVal}% ${percVal + leaveVal}%`;
            percVal += leaveVal;
            let fifthStyle = `#90E2F6 ${percVal}% ${
              percVal + leavePendingVal
            }%`;

            let percStyle = `${firstStyle}, ${secondStyle}, ${thirdStyle}, ${fourthStyle}, ${fifthStyle}, #a8a8a8 0%`;

            return (
              <li
                onClick={() =>
                  selectedDate == format_date
                    ? setSelectedDate("")
                    : (setSelectedDate(format_date), setSelectedEmployee(""))
                }
                className={`dashboardAvailability__item ${
                  selectedDate == format_date ? "selected" : ""
                } ${
                  date < startOfMonth(availabilityMonth) ||
                  date > endOfMonth(availabilityMonth)
                    ? "hidden"
                    : date < new Date()
                    ? "hidden-2"
                    : ""
                } ${isToday(date) ? "current" : ""}`}
              >
                {Object.keys(availabilityByDate).length != 0 && (
                  <div className="tooltip">
                    <div class="tooltip__icons">
                      <div className="tooltip__icons-item">
                        <span className="circle-icon circle-icon--green"></span>
                        {availabilityByDate[format_date]["available"].length}
                      </div>
                      <div className="tooltip__icons-item">
                        <span className="circle-icon circle-icon--red"></span>
                        {availabilityByDate[format_date]["unavailable"].length}
                      </div>
                      <div className="tooltip__icons-item">
                        <span className="circle-icon circle-icon--blue"></span>
                        {availabilityByDate[format_date]["leave"].length}
                      </div>
                      <div className="tooltip__icons-item">
                        <span className="circle-icon"></span>
                        {availabilityByDate[format_date]["none"].length}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`dashboardAvailability__bar `}
                  style={{
                    background: `linear-gradient(to right, ${percStyle})`,
                  }}
                ></div>
                {format(date, "d")}
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default AvailabilityCalendarAdmin;
