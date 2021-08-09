import React, { useState, Fragment } from "react";
// import DropButton from "../../../lists/DropButton";
import AvailabilityPicker from "../../../common/AvailabilityPicker";
import { format } from "date-fns";
import AvailabilityButtons from "../../../availability/AvailabilityButtons";
import { toast } from "react-toastify";

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
      <ul className="modalDefaultAvailability">
        {[...Array(7)].map((e, i) => (
          <Fragment>
            <li
              onClick={() => {
                if (
                  (currentSelector == "available" && startTime && !endTime) ||
                  (!startTime && endTime)
                ) {
                  toast.warning(
                    "You must set a start and end time when creating a partial availability!"
                  );
                } else {
                  let temp_availability = availability;
                  temp_availability[i] = {
                    name: currentSelector,
                    status: "Approved",
                    start_time:
                      currentSelector == "available" && startTime
                        ? startTime.substr(0, 5)
                        : null,
                    end_time:
                      currentSelector == "available" && endTime
                        ? endTime
                        : null,
                  };
                  setAvailability({
                    ...availability,
                    [i]: {
                      name: currentSelector,
                      status: "Approved",
                      start_time:
                        currentSelector == "available" && startTime
                          ? startTime.substr(0, 5)
                          : null,
                      end_time:
                        currentSelector == "available" && endTime
                          ? endTime
                          : null,
                    },
                  });
                }
              }}
              className={`${currentSelector} current-${availability[i].name}`}
            >
              {availability[i].start_time && (
                <Fragment>
                  <i class="fas fa-clock"></i>
                  <div className="tooltip">
                    {availability[i].start_time} - {availability[i].end_time}
                  </div>
                </Fragment>
              )}
              {days[i + 1]}
            </li>
          </Fragment>
        ))}
      </ul>
      <AvailabilityButtons
        currentSelector={currentSelector}
        setCurrentSelector={setCurrentSelector}
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
    </Fragment>
  );
};

export default DefaultAvailability;
