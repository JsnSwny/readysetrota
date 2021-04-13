import React, { Fragment } from "react";

const AddShiftButton = (props) => {
  const {
    employee,
    date,
    white,
    limit,
    setShiftInfo,
    setOpen,
    setType,
    setUpdate,
  } = props;
  return (
    (!limit || employee.id <= limit) && (
      <Fragment>
        <div className={`flex-container`}>
          <p
            onClick={() => {
              setOpen(true);
              setType("shift");
              setShiftInfo({ employee, date });
              setUpdate("");
            }}
            className={`shift__add${white ? "--white" : ""}`}
          >
            +
          </p>
        </div>
      </Fragment>
    )
  );
};

export default AddShiftButton;
