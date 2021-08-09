import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DropButton from "../lists/DropButton";
import {
  updateAvailability,
  addAvailability,
  deleteAvailability,
  updateEmployee,
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
} from "date-fns";

import AvailabilityDate from "./AvailabilityDate";
import AvailabilityPartialInput from "./AvailabilityPartialInput";
import AvailabilityButtons from "./AvailabilityButtons";

const AvailabilityCalendar = (props) => {
  const { employee } = props;

  const dispatch = useDispatch();

  let availability = useSelector((state) => state.employees.availability);
  let shifts = useSelector((state) => state.shifts.user_shifts);
  let current = useSelector((state) => state.employees.current);
  let leave = useSelector((state) => state.availability.leave);
  let loading = useSelector((state) => state.loading);

  const [availabilityMonth, setAvailabilityMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [currentSelector, setCurrentSelector] = useState("available");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    setDateRange(
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(availabilityMonth), {
          weekStartsOn: 1,
        }),
        end: endOfWeek(endOfMonth(availabilityMonth), { weekStartsOn: 1 }),
      })
    );
  }, [availabilityMonth]);

  return (
    <Fragment>
      <div className="dashboardAvailability">
        <h3 className="title-sm title--margin-top">Calendar</h3>
        <hr className="separator"></hr>
        {loading.availability || !employee ? (
          <div class="dot-pulse"></div>
        ) : (
          <Fragment>
            <AvailabilityDate
              setAvailabilityMonth={setAvailabilityMonth}
              availabilityMonth={availabilityMonth}
              dateRange={dateRange}
            />
            <ul className="dashboardAvailability__list">
              {dateRange.map((date) => {
                const format_date = format(date, "yyyy-MM-dd");
                const availabilityDate = availability.find(
                  (item) => item.date == format_date
                );
                let isHoliday = leave.some(
                  (leave) =>
                    leave.status == "Approved" &&
                    parseISO(leave.start_date) <= date &&
                    parseISO(leave.end_date) >= date
                );
                return (
                  <li
                    onClick={() => {
                      if (isHoliday) {
                        return false;
                      }
                      let obj = {
                        name: currentSelector,
                        employee_id: employee.id,
                        date: format_date,
                        start_time:
                          currentSelector == "available" && startTime
                            ? startTime
                            : null,
                        end_time:
                          currentSelector == "available" && endTime
                            ? endTime
                            : null,
                        site_id: current.site.id,
                        status: "Pending",
                      };
                      if (differenceInDays(date, new Date()) > 365) {
                        toast.warning(
                          "Availability dates must be selected within 365 days!"
                        );
                      } else if (date < new Date()) {
                        toast.warning(
                          "You cannot set availability for a date before the current date!"
                        );
                      } else if (
                        (startTime && !endTime) ||
                        (endTime && !startTime)
                      ) {
                        toast.warning(
                          "You must set a start and end time when creating a partial availability!"
                        );
                      } else if (
                        shifts.some((item) => item.date == format_date)
                      ) {
                        toast.warning(
                          "You already have a shift for this date!"
                        );
                      } else {
                        availability.some((item) => item.date == obj.date)
                          ? dispatch(
                              updateAvailability(
                                availability.filter(
                                  (item) => item.date == obj.date
                                )[0].id,
                                obj
                              )
                            )
                          : dispatch(addAvailability(obj));
                      }
                    }}
                    key={date}
                    className={`dashboardAvailability__item ${
                      date < startOfMonth(availabilityMonth) ||
                      date > endOfMonth(availabilityMonth)
                        ? "hidden"
                        : date < new Date()
                        ? "hidden-2"
                        : ""
                    } ${
                      date < startOfMonth(availabilityMonth) ||
                      date > endOfMonth(availabilityMonth)
                        ? ""
                        : currentSelector
                    } current-${
                      isHoliday
                        ? "holiday"
                        : availabilityDate &&
                          availabilityDate.status != "Denied"
                        ? `${availabilityDate.name} ${
                            availabilityDate.status == "Pending"
                              ? "unmarked"
                              : ""
                          }`
                        : employee.default_availability[
                            getDay(date) == 0 ? 6 : getDay(date) - 1
                          ].name
                    }`}
                  >
                    {!isHoliday &&
                      availabilityDate &&
                      availabilityDate.start_time && (
                        <Fragment>
                          <i class="fas fa-clock"></i>
                          <div className="tooltip">
                            {availabilityDate.start_time.substr(0, 5)} -{" "}
                            {availabilityDate.end_time}
                          </div>
                        </Fragment>
                      )}
                    {format(date, "d")}
                  </li>
                );
              })}
            </ul>
            <hr className="separator--alt"></hr>
            <AvailabilityButtons
              setCurrentSelector={setCurrentSelector}
              currentSelector={currentSelector}
              availabilityMonth={availabilityMonth}
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AvailabilityCalendar;
