import React from "react";

const AvailabilityPartialInput = ({
  setStartTime,
  startTime,
  setEndTime,
  endTime,
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
  return (
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
  );
};

export default AvailabilityPartialInput;
