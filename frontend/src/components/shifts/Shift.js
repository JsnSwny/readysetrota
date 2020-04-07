import React, { Fragment, useEffect } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { Link } from "react-router-dom";

const Shift = (props) => {
  const { shift } = props;

  return (
    <div className="shift__shift">
      {shift.map((shift) => (
        <Fragment>
          <p>
            {shift.start_time.substr(0, 5)} - {shift.end_time}
          </p>
          <p>{shift.info}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default Shift;
