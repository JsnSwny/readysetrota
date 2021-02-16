import React from "react";

const ExtraInfo = ({ info, setInfo }) => {
  return (
    <div className="form__control">
      <label className="form__label">Info:</label>
      <textarea
        className="form__input"
        type="text"
        name="info"
        onChange={(e) => setInfo(e.target.value)}
        value={info}
        rows="4"
      ></textarea>
    </div>
  );
};

export default ExtraInfo;
