import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PersonalDetails = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  wage,
  setWage,
  wageType,
  setWageType,
}) => {
  let errors = useSelector((state) => state.errors.msg);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );

  return (
    <Fragment>
      <div className="flex-container--between form__wrapper">
        <div className="form__control--half">
          <label className="form__label">First name*</label>
          <input
            className="form__input"
            type="text"
            name="first_name "
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            value={firstName}
          ></input>
          <p className="error">{errors.first_name}</p>
        </div>
        <div className="form__control--half">
          <label className="form__label">Last name*</label>
          <input
            className="form__input"
            type="text"
            name="last_name "
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
          <p className="error">{errors.last_name}</p>
        </div>
      </div>
      {permissions.includes("manage_wages") && (
        <div className="flex-container--between form__wrapper">
          <div className="form__control--half">
            <label className="form__label">Wage Type</label>
            <select
              className="form__input"
              onChange={(e) => setWageType(e.target.value)}
              value={wageType}
            >
              <option value="N">None</option>
              <option value="H">Hourly</option>
              <option value="S">Salary</option>
            </select>
          </div>
          <div className="form__control--half">
            {wageType != "N" && (
              <Fragment>
                <label className="form__label">Wage</label>
                <input
                  className="form__input"
                  type="number"
                  name="wage"
                  onChange={(e) => setWage(e.target.value)}
                  value={wage}
                  step="0.01"
                />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

{
  /* <div className="staffForm__control">
    <label className="staffForm__label">Wage Type:</label>
    <div className="flex-container--wrap">
    <span
        className={`btn-toggle--sm ${wageType == "N" && "active"}`}
        onClick={() => {
            setWageType("N");
        }}
        >
        None
    </span>
    <span
        className={`btn-toggle--sm ${wageType == "H" && "active"}`}
        onClick={() => {
            setWageType("H");
        }}
        >
        Hourly
    </span>
    <span
        className={`btn-toggle--sm ${wageType == "S" && "active"}`}
        onClick={() => {
            setWageType("S");
        }}
        >
        Salary
    </span>
    </div>
</div>
{["S", "H"].includes(wageType) && (
    <div className="staffForm__control">
    <label className="staffForm__label">{wageType == "H" ? "Hourly Rate" : "Salary"}:</label>
    <input
    className="staffForm__input"
    type="number"
    name="wage"
    onChange={(e) => setWage(e.target.value)}
    value={wage}
    step="0.01"
    ></input>
</div> */
}

export default PersonalDetails;
