import React from "react";
import AddShift from "../shifts/AddShift";
import AddStaff from "../employees/AddStaff";
import ShiftSwapModal from "../modals/ShiftSwapModal";

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
    shiftSwap,
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
          ) : type == "staff" || type == "Position" || type == "Department" ? (
            <AddStaff
              onClose={onClose}
              form={type}
              staffPosition={staffPosition}
            />
          ) : (
            <ShiftSwapModal shiftSwap={shiftSwap} />
          )}
        </div>
      </div>
    )
  );
};

export default CreateShift;
