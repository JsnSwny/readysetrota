import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";

const WageForm = ({ setOpen, editWage }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [wageType, setWageType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const current = useSelector((state) => state.employees.current);

  useEffect(() => {
    setAmount(editWage.wage);
    setWageType(editWage.wage_type);
    setStartDate(editWage.start_date);
    setEndDate(editWage.end_date);
  }, [editWage]);

  const onSubmit = (e) => {
    e.preventDefault();
    // let wageObj = {
    //   wage: amount,
    //   wage_type: wageType,
    //   start_date: startDate,
    //   end_date: endDate,
    // };
    // console.log(wageObj);
    // dispatch(updateWage(editWage.id, wageObj));
    // setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form">
      <div className="flex-container--between">
        <div className="form__control">
          <label className="form__label">Amount*</label>
          <input
            className="form__input"
            type="number"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
            value={amount}
          ></input>
        </div>
        <div className="form__control">
          <label className="form__label">Wage Type*</label>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            value={wageType}
            onChange={(e) => setWageType(e.target.value)}
            options={[
              { value: "H", label: "Per Hour" },
              { value: "S", label: "Per Annum" },
            ]}
            placeholder={"Select a wage type"}
          />
          <input
            className="form__input"
            type="text"
            name="wage_type"
            onChange={(e) => setWageType(e.target.value)}
            value={wageType}
          ></input>
        </div>
      </div>
      <div className="flex-container--between">
        <div className="form__control--half">
          <label className="form__label">Start Date*</label>
          <input
            className="form__input"
            type="date"
            name="start_date"
            onChange={(e) => setStartDate(e.target.value)}
            autoFocus
            value={startDate}
          ></input>
        </div>
        <div className="form__control--half">
          <label className="form__label">End Date*</label>
          <input
            className="form__input"
            type="date"
            name="end_date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          ></input>
        </div>
      </div>

      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Save">
          Save
        </button>
      </div>
    </form>
  );
};

export default WageForm;
