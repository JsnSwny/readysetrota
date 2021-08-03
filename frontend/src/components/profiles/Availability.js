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
import { contextType } from "react-modal";

const Availability = (props) => {
  const { employee } = props;

  const dispatch = useDispatch();

  let availability = useSelector((state) => state.employees.availability);
  let shifts = useSelector((state) => state.shifts.user_shifts);
  let current = useSelector((state) => state.employees.current);
  let siteAdmin = useSelector((state) => state.employees.site_admin);
  let leave = useSelector((state) => state.availability.leave);

  const [availabilityMonth, setAvailabilityMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [monthlyAvailability, setMonthlyAvailability] = useState([]);
  const [currentSelector, setCurrentSelector] = useState("available");

  let minutes = ["00", "15", "30", "45"];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }

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

  useEffect(() => {
    setMonthlyAvailability(availability);
  }, [availability]);

  return (
    <div className="dashboardAvailability">
      <div className="dashboardAvailability__month">
        <span
          onClick={() => {
            setAvailabilityMonth(addMonths(availabilityMonth, -1));
          }}
        >
          <i className="fas fa-caret-left"></i>
        </span>
        <p>{format(availabilityMonth, "MMMM yyyy")}</p>
        <span
          onClick={() => {
            setAvailabilityMonth(addMonths(availabilityMonth, 1));
          }}
        >
          <i className="fas fa-caret-right"></i>
        </span>
      </div>
      <ul className="dashboardShiftList__list--heading">
        {dateRange.map(
          (date, i) => i < 7 && <li key={i}>{format(date, "iii")}</li>
        )}
      </ul>
      <ul className="dashboardAvailability__list">
        {dateRange.map((date) => {
          const format_date = format(date, "yyyy-MM-dd");
          return (
            <li
              onClick={() => {
                if (
                  leave.some(
                    (leave) =>
                      leave.status == "Approved" &&
                      parseISO(leave.start_date) <= date &&
                      parseISO(leave.end_date) >= date
                  )
                ) {
                  return false;
                }
                let obj = {
                  name: currentSelector,
                  employee_id: employee.id,
                  date: format_date,
                  start_time:
                    currentSelector == "partial" && startTime
                      ? startTime
                      : null,
                  end_time:
                    currentSelector == "partial" && endTime ? endTime : null,
                  site_id: current.site.id,
                  status: "unsubmitted",
                };
                setMonthlyAvailability([
                  ...monthlyAvailability.filter(
                    (item) => item.date != format_date
                  ),
                  obj,
                ]);
                if (differenceInDays(date, new Date()) > 365) {
                  toast.warning(
                    "Availability dates must be selected within 365 days!"
                  );
                } else if (date < new Date()) {
                  toast.warning(
                    "You cannot set availability for a date before the current date!"
                  );
                } else if (
                  currentSelector == "partial" &&
                  !(startTime && endTime)
                ) {
                  toast.warning(
                    "You must set a start and end time when creating a partial availability!"
                  );
                } else if (shifts.some((item) => item.date == format_date)) {
                  toast.warning("You already have a shift for this date!");
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
                leave.some(
                  (leave) =>
                    leave.status == "Approved" &&
                    parseISO(leave.start_date) <= date &&
                    parseISO(leave.end_date) >= date
                )
                  ? "holiday"
                  : monthlyAvailability.some((item) => item.date == format_date)
                  ? `${
                      monthlyAvailability.find(
                        (item) => item.date == format_date
                      ).name
                    } ${
                      monthlyAvailability.find(
                        (item) => item.date == format_date
                      ).approved == true
                        ? ""
                        : "unmarked"
                    }`
                  : employee.default_availability[
                      getDay(date) == 0 ? 6 : getDay(date) - 1
                    ].name
              }`}
            >
              {format(date, "d")}
            </li>
          );
        })}
      </ul>
      {currentSelector == "partial" && (
        <div className="dashboard__dates-times">
          <div className="staffForm__times">
            <div className="staffForm__control">
              <label className="staffForm__label">Start Time:</label>
              <select
                className="staffForm__input"
                onChange={(e) => setStartTime(e.target.value)}
                name="starttime"
                value={startTime}
              >
                <option value="" disabled>
                  Select a start time
                </option>
                {hours.map((time) => (
                  <option key={time} value={`${time}:00`}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="staffForm__control">
              <label className="staffForm__label">End Time:</label>
              <select
                className="staffForm__input"
                onChange={(e) => setEndTime(e.target.value)}
                name="endtime"
                value={endTime}
              >
                <option value="" disabled>
                  Select an end time
                </option>
                <option value="Finish">Finish</option>
                {hours.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <hr className="separator"></hr>
      <div className="dashboardAvailability__bottom">
        {(monthlyAvailability.filter(
          (item) => getMonth(parseISO(item.date)) == getMonth(availabilityMonth)
        ).length /
          getDaysInMonth(availabilityMonth)) *
          100 ==
        100 ? (
          <button
            onClick={() => setCurrentSelector("available")}
            className={`dashboardAvailability__submit`}
          >
            Submit
          </button>
        ) : (
          <p>
            <strong>
              {(
                (monthlyAvailability.filter(
                  (item) =>
                    getMonth(parseISO(item.date)) == getMonth(availabilityMonth)
                ).length /
                  getDaysInMonth(availabilityMonth)) *
                100
              ).toFixed(2)}
              %
            </strong>{" "}
            Completed
          </p>
        )}

        <div>
          <button
            onClick={() => setCurrentSelector("available")}
            className={`dashboardAvailability__picker--green ${
              currentSelector == "available" ? "active" : ""
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setCurrentSelector("unavailable")}
            className={`dashboardAvailability__picker--red ${
              currentSelector == "unavailable" ? "active" : ""
            }`}
          >
            Unavailable
          </button>
        </div>
      </div>
    </div>
  );
};

export default Availability;
