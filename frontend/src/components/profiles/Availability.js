import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HolidayRequest from "./dashboard/HolidayRequest";
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
  } from "date-fns";

const Availability = (props) => {
    const { employee, admin } = props;

    const dispatch = useDispatch();

    let availability = useSelector((state) => state.employees.availability);
    let shifts = useSelector((state) => state.shifts.user_shifts);
    let current = useSelector(
        (state) => state.employees.current
      );

    const [availabilityMonth, setAvailabilityMonth] = useState(new Date());

    const [dateRange, setDateRange] = useState([]);
    const [currentSelector, setCurrentSelector] = useState("unselected");

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

    const days = { 1: "M", 2: "T", 3: "W", 4: "T", 5: "F", 6: "S", 7: "S" };
    

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

      const resetAction = {name: 'Reset', action: () => setCurrentSelector("unselected")};
      const availableAction = {name: 'Available', action: () => setCurrentSelector("available")};
      const partialAction = {name: 'Partial', action: () => setCurrentSelector("partial")};
      const unavailableAction = {name: 'Unavailable', action: () => setCurrentSelector("unavailable")};
      const holidayAction = {name: 'Holiday', action: () => setCurrentSelector("holiday")};

      const actionNames = {"unselected": "Reset", "available": "Available", "partial": "Partial", "unavailable": "Unavailable", "holiday": "Holiday"}

    return (
            <div className="dashboard__block--half">
            <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">Availability</p>
            </div>
            <DropButton title={actionNames[currentSelector]} actions={[resetAction, availableAction, partialAction, unavailableAction, holidayAction]} />
            <div className="dashboard__block-container">
                <p className="dashboard__dates-title flex-container--between-center">
                <span
                    onClick={() => {
                    setAvailabilityMonth(addMonths(availabilityMonth, -1));
                    }}
                >
                    <i className="fas fa-caret-left"></i>
                </span>
                {format(availabilityMonth, "MMMM yyyy")}
                <span
                    onClick={() => {
                    setAvailabilityMonth(addMonths(availabilityMonth, 1));
                    }}
                >
                    <i className="fas fa-caret-right"></i>
                </span>
                </p>
                <div className="dashboard__dates-date">
                {dateRange.map(
                    (date, i) =>
                    i < 7 && <p key={i}>{format(date, "EEEEE")}</p>
                )}
                </div>
                <div className="dashboard__dates stretch">
                {dateRange.map((date) => {
                    const format_date = format(date, "yyyy-MM-dd");
                    return (
                    <div key={date} className="dashboard__dates-item">
                        <p
                        onClick={() => {
                            let obj = {
                            name: currentSelector,
                            employee_id: employee.id,
                            date: format_date,
                            start_time:
                                currentSelector == "partial" && startTime
                                ? startTime
                                : null,
                            end_time:
                                currentSelector == "partial" && endTime
                                ? endTime
                                : null,
                            site_id: current.site,
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
                            currentSelector == "unselected" &&
                            !availability.some(
                                (item) => item.date == format_date
                            )
                            ) {
                            toast.warning(
                                "You can't reset a date that doesn't have a value!"
                            );
                            } else if (
                            currentSelector == "partial" &&
                            !(startTime && endTime)
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
                            availability.some(
                                (item) => item.date == obj.date
                            )
                                ? currentSelector == "unselected"
                                ? dispatch(
                                    deleteAvailability(
                                        availability.filter(
                                        (item) => item.date == obj.date
                                        )[0].id
                                    )
                                    )
                                : dispatch(
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
                        className={`${currentSelector} current-${
                            !shifts.some((item) => item.date == format_date)
                            ? availability.filter(
                                (item) => item.date == format_date
                                )[0]
                                ? availability.filter(
                                    (item) => item.date == format_date
                                )[0].name
                                : employee.default_availability[
                                    getDay(date) == 0 ? 6 : getDay(date) - 1
                                ].name
                            : "shift"
                        } ${
                            date < new Date()
                            ? "hidden-2"
                            : date < startOfMonth(availabilityMonth) ||
                                date > endOfMonth(availabilityMonth)
                            ? "hidden"
                            : ""
                        }`}
                        >
                        {format(date, "d")}
                        </p>
                    </div>
                    );
                })}
                </div>
            </div>
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
            </div>
            
    )
}

export default Availability;