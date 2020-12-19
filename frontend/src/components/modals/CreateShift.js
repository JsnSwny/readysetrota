import React from "react";
import AddShift from "./AddShift";
import AddStaff from "../employees/AddStaff";
import ShiftSwapModal from "./ShiftSwapModal";

const CreateShift = (props) => {
  const {
    open,
    onClose,
    employee,
    date,
    type,
    staffPosition,
    shift,
    shiftSwap,
    update,
    template,
  } = props;

  const staffTypes = [
    "staff",
    "Position",
    "Department",
    "BusinessName",
    "Site",
  ];

  const getModal = () => {
    if (type == "shift") {
      return (
        <AddShift
          employee={employee}
          date={date}
          onClose={onClose}
          shift={shift}
          template={template}
        />
      );
    } else if (staffTypes.includes(type)) {
      return (
        <AddStaff
          onClose={onClose}
          form={type}
          staffPosition={staffPosition}
          update={update}
        />
      );
    }
  };

  return (
    open && (
      <div className="modal">
        <div className="shiftModal__container">{getModal()}</div>
      </div>
    )
  );
};

export default CreateShift;
