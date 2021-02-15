import React, { Fragment } from "react";

const Absence = ({
  update,
  absence,
  setAbsence,
  absenceInfo,
  setAbsenceInfo,
}) => {
  const absences = [
    "None",
    "Authorised",
    "Unauthorised",
    "Compassionate",
    "Other",
  ];
  return (
    <Fragment>
      <div className="flex-container--between form__wrapper">
        {update && (
          <div className="form__control--half">
            <label className="form__label">Absence:</label>
            <select
              onChange={(e) => setAbsence(e.target.value)}
              className="form__input"
              value={absence}
            >
              {absences.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {absence != "None" && (
        <div className="form__control">
          <label className="form__label">Absence Info:</label>
          <textarea
            className="form__input"
            type="text"
            name="absenceInfo"
            onChange={(e) => setAbsenceInfo(e.target.value)}
            value={absenceInfo}
            rows="4"
          ></textarea>
        </div>
      )}
    </Fragment>
  );
};

export default Absence;
