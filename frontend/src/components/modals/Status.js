import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Status = ({
  startWorkingDate,
  endWorkingDate,
  setStartWorkingDate,
  setEndWorkingDate,
}) => {
  let errors = useSelector((state) => state.errors.msg);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );

  console.log(startWorkingDate, endWorkingDate)

  return (
    <Fragment>
      <div className="flex-container--between form__wrapper">
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
          {/* <input
            className="form__input"
            type="date"
            name="start_working_date"
            onChange={(e) => setStartWorkingDate(e.target.value)}
            autoFocus
            value={format(startWorkingDate, "do MMM yyyy")}
          ></input>
          <p className="error">{errors.first_name}</p> */}
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
          <p className="error">{errors.last_name}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Status;
