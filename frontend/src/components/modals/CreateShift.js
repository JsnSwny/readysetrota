import React from "react";
import AddShift from "./AddShift";
import AddStaff from "../employees/AddStaff";

const CreateShift = (props) => {
  const {
    open,
    onClose,
    employee,
    date,
    type,
    staffPosition,
    shift,
    update,
    template,
    sidebarOpen
  } = props;

  const staffTypes = [
    "Staff",
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
          shift={update}
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
      <div className={`modal App ${sidebarOpen ? "open" : ""}`}>
        
        <div className="modal__container"><i class="fas fa-times modal__close" onClick={() => onClose()}></i>{getModal()}</div>
      </div>
    )
  );
};

export default CreateShift;
