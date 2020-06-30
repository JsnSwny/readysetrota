import React from "react";
import AddShift from "../shifts/AddShift";
import AddStaff from "../employees/AddStaff";

const CreateShift = (props) => {
  const {
    open,
    onClose,
    employeeName,
    employeeID,
    date,
    type,
    staffPosition,
    shift,
  } = props;

  return (
    open && (
      <div className="modal">
        <div className="shiftModal__container">
          {type == "shift" ? (
            <AddShift
              employeeName={employeeName}
              employeeID={employeeID}
              date={date}
              onClose={onClose}
              shift={shift}
            />
          ) : (
            <AddStaff
              onClose={onClose}
              form={type}
              staffPosition={staffPosition}
            />
          )}
        </div>
      </div>
    )
  );
};

export default CreateShift;
