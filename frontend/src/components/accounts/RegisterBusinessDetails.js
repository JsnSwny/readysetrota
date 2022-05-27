import React, { Fragment } from "react";

const RegisterBusinessDetails = ({
  businessName,
  setBusinessName,
  numberOfEmployees,
  setNumberOfEmployees,
}) => {
  const employeeOptions = [...Array(100).keys()]
    .map((item) => item + 1)
    .filter((item) => item % 5 == 0);
  return (
    <Fragment>
      <div className="register__control">
        <label for="first_name">Business name:</label>
        <input
          autoFocus
          className="register__input"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="register__control">
        <label for="email">Number of employees:</label>
        <select
          className="register__input"
          name="employees"
          onChange={(e) => setNumberOfEmployees(parseInt(e.target.value))}
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

export default RegisterBusinessDetails;
