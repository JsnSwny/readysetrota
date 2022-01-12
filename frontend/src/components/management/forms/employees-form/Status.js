import React, { Fragment } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Status = ({
  startWorkingDate,
  setStartWorkingDate,
  endWorkingDate,
  setEndWorkingDate,
}) => {
  return (
    <Fragment>
      <div className="flex-container--between">
        <div className="form__control--half">
          <label className="form__label">Start Working Date*</label>
          <DatePicker
            selected={startWorkingDate}
            onChange={(date) => setStartWorkingDate(date)}
            selectsStart
            startDate={startWorkingDate}
            endDate={endWorkingDate}
            className="form__input"
            dateFormat="MMMM do yyyy"
          />
        </div>
        <div className="form__control--half">
          <label className="form__label">End Working Date</label>
          <DatePicker
            selected={endWorkingDate}
            onChange={(date) => setEndWorkingDate(date)}
            selectsEnd
            startDate={startWorkingDate}
            endDate={endWorkingDate}
            minDate={startWorkingDate}
            className="form__input"
            dateFormat="MMMM do yyyy
            "
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Status;
