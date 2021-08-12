import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getMonth, parseISO, getDaysInMonth } from "date-fns";

const AvailabilityButtons = ({
  setCurrentSelector,
  currentSelector,
  setStartTime,
  startTime,
  setEndTime,
  endTime,
}) => {
  let availability = useSelector((state) => state.employees.availability);
  return (
    <div className="dashboardAvailability__bottom">
      <div
        className={`dashboardAvailability__buttons ${
          currentSelector != "available" ? "hide" : ""
        }`}
      >
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <div>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <i
            class="fas fa-times"
            onClick={() => {
              setStartTime("");
              setEndTime("");
            }}
          ></i>
        </div>
      </div>
      <div
        onClick={() => setCurrentSelector("available")}
        className={`dashboardAvailability__picker--green ${
          currentSelector == "available" ? "active" : ""
        }`}
      >
        Available
      </div>
      <div
        onClick={() => setCurrentSelector("unavailable")}
        className={`dashboardAvailability__picker--red ${
          currentSelector == "unavailable" ? "active" : ""
        }`}
      >
        Unavailable
      </div>
    </div>
  );
};

export default AvailabilityButtons;
