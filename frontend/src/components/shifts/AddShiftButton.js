import React, { Fragment } from "react";

const AddShiftButton = (props) => {
  const {
    employee,
    date,
    white,
    setShiftInfo,
    setOpen,
    setType,
    setUpdate,
    setExtra,
    shiftDepartment,
    financialMode,
  } = props;
  return (
    <Fragment>
      <div className={`flex-container`}>
        <p
          onClick={() => {
            setOpen(true);
            setType("shift");
            setShiftInfo({ employee, date });
            setUpdate("");
            setExtra({ shiftDepartment, financialMode });
          }}
          className={`shift__add${white ? "--white" : ""}`}
        >
          +
        </p>
      </div>
    </Fragment>
  );
};

export default AddShiftButton;
