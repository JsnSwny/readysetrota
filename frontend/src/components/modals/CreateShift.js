import React from "react";
import AddShift from "./AddShift";
import AddStaff from "../employees/AddStaff";
import EmployeeProfileModal from "./EmployeeProfileModal"

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
    sidebarOpen,
    confirmProps
  } = props;



  const staffTypes = [
    "Staff",
    "Position",
    "Department",
    "BusinessName",
    "Site",
  ];


  const modalProps = {onClose, update, confirmProps};
  

  const getModal = () => {
    if (type == "employeeprofile") {
      return (
        <EmployeeProfileModal {...modalProps} />
      )
    }
    else if (type == "shift") {
      return (
        <AddShift
          employee={employee}
          date={date}
          {...modalProps}
        />
      );
    } else if (staffTypes.includes(type)) {
      return (
        <AddStaff
          {...modalProps}
          form={type}
          staffPosition={staffPosition}
        />
      );
    }
  };

  return (
    open && (
      <div className={`modal App ${sidebarOpen ? "open" : ""}`}>
        
        <div className="modal__container"><i className="fas fa-times modal__close" onClick={() => onClose()}></i>{getModal()}</div>
      </div>
    )
  );
};

export default CreateShift;
