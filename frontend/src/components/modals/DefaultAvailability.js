import React, { useState, Fragment } from "react";
import DropButton from "../lists/DropButton";
import AvailabilityPicker from "../common/AvailabilityPicker";

const DefaultAvailability = ({
  currentSelector,
  setCurrentSelector,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  availability,
  setAvailability,
}) => {
  let minutes = ["00", "15", "30", "45"];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
        : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
    );
  }

  const resetAction = {
    name: "Reset",
    action: () => setCurrentSelector("unselected"),
  };
  const availableAction = {
    name: "Available",
    action: () => setCurrentSelector("available"),
  };
  const partialAction = {
    name: "Partial",
    action: () => setCurrentSelector("partial"),
  };
  const unavailableAction = {
    name: "Unavailable",
    action: () => setCurrentSelector("unavailable"),
  };

  const actionNames = {
    unselected: "Reset",
    available: "Available",
    partial: "Partial",
    unavailable: "Unavailable",
  };

  const days = { 1: "M", 2: "T", 3: "W", 4: "T", 5: "F", 6: "S", 7: "S" };
  return (
    <Fragment>
      <AvailabilityPicker
        actions={{
          resetAction,
          availableAction,
          partialAction,
          unavailableAction,
        }}
        current={currentSelector}
      />
      <div className="dashboard__dates">
        {[...Array(7)].map((e, i) => (
          <div key={i} className="dashboard__dates-item">
            <p
              onClick={() => {
                if (currentSelector == "partial" && !(startTime && endTime)) {
                  toast.warning(
                    "You must set a start and end time when creating a partial availability!"
                  );
                } else {
                  let temp_availability = availability;
                  temp_availability[i] = {
                    name: currentSelector,
                    approved: currentSelector == "unavailable" ? true : null,
                    start_time:
                      currentSelector == "partial" && startTime
                        ? startTime.substr(0, 5)
                        : null,
                    end_time:
                      currentSelector == "partial" && endTime ? endTime : null,
                  };
                  setAvailability({
                    ...availability,
                    [i]: {
                      name: currentSelector,
                      approved: currentSelector == "unavailable" ? true : null,
                      start_time:
                        currentSelector == "partial" && startTime
                          ? startTime.substr(0, 5)
                          : null,
                      end_time:
                        currentSelector == "partial" && endTime
                          ? endTime
                          : null,
                    },
                  });
                }
              }}
              className={`${currentSelector} current-${availability[i].name}`}
            >
              {days[i + 1]}
            </p>
          </div>
        ))}
      </div>
      {currentSelector == "partial" && (
        <div className="flex-container--between">
          <div className="form__control--half">
            <label className="form__label">Start Time:</label>
            <select
              className="form__input"
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
          <div className="form__control--half">
            <label className="form__label">End Time:</label>
            <select
              className="form__input"
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
      )}
    </Fragment>
  );
};

export default DefaultAvailability;
