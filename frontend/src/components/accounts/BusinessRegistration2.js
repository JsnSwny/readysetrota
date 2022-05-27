import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const BusinessRegistration2 = ({
  businessName,
  setBusinessName,
  numberOfEmployees,
  setNumberOfEmployees,
}) => {
  let errors = useSelector((state) => state.errors.msg);
  const employeeOptions = [...Array(100).keys()]
    .map((item) => item + 1)
    .filter((item) => item % 5 == 0);
  return (
    <Fragment>
      <div className="form__control">
        <label className="form__label">Business Name</label>
        <input
          type="text"
          className="form__input"
          name="business_name"
          onChange={(e) => {
            setBusinessName(e.target.value);
          }}
          value={businessName}
          autoFocus
        />
        <p className="error">{errors.businessName}</p>
      </div>
      <div className="form__control">
        <label className="form__label">Number of employees</label>
        <select
          className="form__input"
          name="employees"
          onChange={(e) => setNumberOfEmployees(parseInt(e.target.value))}
          autoFocus
          value={numberOfEmployees}
        >
          {employeeOptions.map((item) => (
            <option value={item}>{item}</option>
          ))}
          /
        </select>
      </div>
    </Fragment>
  );
};

export default BusinessRegistration2;
