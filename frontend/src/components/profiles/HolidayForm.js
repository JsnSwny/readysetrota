import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { addLeave } from "../../actions/availability";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const HolidayForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("Holiday");
  const [reason, setReason] = useState("");
  let current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);
  let employees = useSelector((state) => state.employees.employees);
  let user = useSelector((state) => state.auth.user);

  const onSubmit = (e) => {
    e.preventDefault();
    // let error_obj = {
    //   start_date: startDate != "" ? true : "This field is required",
    // };
    // dispatch(getErrors(error_obj, 400));

    // if (
    //   Object.keys(error_obj).every((k) => {
    //     return error_obj[k] == true;
    //   })
    // ) {

    dispatch(
      addLeave({
        leave_type: leaveType,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        reason: reason,
        status: "Pending",
        employee_id: user.employee.find(
          (item) => item.business_id == current.business.id
        )?.id,
        site_id: current.site.id,
      })
    );
    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form shift-form">
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
            dateFormat="MMMM do yyyy"
          />
          {/* <p className="error">{errors.last_name}</p> */}
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
      </div>
      <hr />
      <div className="flex-container--end">
        <button className="btn-3" type="submit" value="Make Request">
          Make Request
        </button>
      </div>
    </form>
  );
};

export default HolidayForm;
