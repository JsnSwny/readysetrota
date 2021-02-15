import React from "react";
import EmployeeProfileModal from "./EmployeeProfileModal";
import StaffManagementModal from "./StaffManagementModal";
import ShiftModal from "./ShiftModal";

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
    confirmProps,
  } = props;

  const staffTypes = [
    "Staff",
    "Position",
    "Department",
    "BusinessName",
    "Site",
  ];

  const modalProps = { onClose, update, confirmProps };

  const getModal = () => {
    if (type == "employeeprofile") {
      return <EmployeeProfileModal {...modalProps} />;
    } else if (type == "shift") {
      return <ShiftModal employee={employee} date={date} {...modalProps} />;
    } else if (staffTypes.includes(type)) {
      return (
        <StaffManagementModal
          {...modalProps}
          form={type}
          title={`Create ${type}`}
        />
      );
    }
  };

  return (
    open && (
      <div className={`modal App ${sidebarOpen ? "open" : ""}`}>
        <div className="modal__container">
          <i
            className="fas fa-times modal__close"
            onClick={() => onClose()}
          ></i>
          {getModal()}
        </div>
      </div>
    )
  );
};

export default CreateShift;
