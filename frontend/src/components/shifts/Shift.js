import React, { Fragment } from "react";

const Shift = (props) => {
  const { shift } = props;

  return (
    <div className="shift__shift">
      {shift.map((shift) => (
        <div className="shift__wrapper">
          <p className="shift__time">
            {shift.start_time.substr(0, 5)} - {shift.end_time}
          </p>
          {shift.info && <p className="shift__info">{shift.info}</p>}
        </div>
      ))}
    </div>
  );
};

export default Shift;
