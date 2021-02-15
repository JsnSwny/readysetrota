import React from "react";

const Absence = () => {
  return (
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
  );
};

export default Absence;
