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
  } = props;

  return (
    open && (
      <div onClick={(e) => console.log(e)} className="modal">
        <div className="shiftModal__container">
          {type == "shift" ? (
            <AddShift
              employeeName={employeeName}
              employeeID={employeeID}
              date={date}
              onClose={onClose}
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
