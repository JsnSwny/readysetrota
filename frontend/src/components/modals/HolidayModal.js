import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLeave } from "../../actions/availability";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import employees from "../../reducers/employees";

const HolidayModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("Holiday");
  const [reason, setReason] = useState("");
  let current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);
  let employees = useSelector((state) => state.employees.employees);
  let user = useSelector((state) => state.auth.user);

  //   useEffect(() => {
  //     if (update) setForecastAmount(update.amount);
  //   }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    let error_obj = {
      start_date: startDate != "" ? true : "This field is required",
    };
    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      dispatch(
        addLeave({
          leave_type: leaveType,
          start_date: format(startDate, "yyyy-MM-dd"),
          end_date: format(endDate, "yyyy-MM-dd"),
          reason: reason,
          status: "Pending",
          employee_id: employees.find((item) => item.user == user.id).id,
          site_id: current.site.id,
        })
      );
      toast.success(`${leaveType} added`);

      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      onClose();
    }
  };

  return (
    <div className="form">
      <p className="form__subheading">Availability</p>
      <h1 className="form__heading">Request a Holiday</h1>
      <form onSubmit={onSubmit} className="form__form">
        <div className="form__control--half">
          <label className="form__label">Leave Type*</label>
          <select
            onChange={(e) => setLeaveType(e.target.value)}
            className="form__input"
            value={leaveType}
          >
            <option value="Holiday">Holiday</option>
            <option value="Sick">Sick</option>
          </select>
          <p className="error">{errors.last_name}</p>
        </div>
        <div className="flex-container--between form__wrapper">
          <div className="form__control--half">
            <label className="form__label">Start Date*</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
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
            <label className="form__label">End Date*</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form__input"
              dateFormat="MMMM do yyyy
            "
            />
            <p className="error">{errors.last_name}</p>
          </div>
        </div>
        <div className="form__control">
          <label className="form__label">Reason (Not required)</label>
          <input
            type="text"
            onChange={(e) => setReason(e.target.value)}
            className="form__input"
            value={reason}
          ></input>
          <p className="error">{errors.last_name}</p>
        </div>
        <p className="error">{errors.forecast}</p>
        <div className="flex-container--between form__actions">
          <button className="form__save" type="submit" value="Save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default HolidayModal;
