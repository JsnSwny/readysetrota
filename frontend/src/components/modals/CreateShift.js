import React from "react";
import EmployeeProfileModal from "./employee/EmployeeProfileModal";
import StaffManagementModal from "./StaffManagementModal";
import ShiftModal from "./shift/ShiftModal";
import ForecastModal from "./ForecastModal";
import RegisterModal from "./RegisterModal";

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
    forecastDate,
  } = props;

  const staffTypes = [
    "Staff",
    "Position",
    "Department",
    "BusinessName",
    "Site",
  ];

  const imageTypes = {
    shift: "fas fa-briefcase",
    forecast: "fas fa-coins",
    register: "fas fa-user-edit",
    employeeprofile: "fas fa-user",
    Department: "fas fa-users-cog",
    Site: "fas fa-users-cog",
    Position: "fas fa-users-cog",
  };

  const modalProps = { onClose, update, confirmProps };

  const getModal = () => {
    if (type == "employeeprofile") {
      return <EmployeeProfileModal {...modalProps} />;
    } else if (type == "shift") {
      return <ShiftModal employee={employee} date={date} {...modalProps} />;
    } else if (type == "forecast") {
      return <ForecastModal date={forecastDate} {...modalProps} />;
    } else if (type == "register") {
      return <RegisterModal {...modalProps} />;
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
        {imageTypes[type] && (
          <div className="form__image">
            <i className={`${imageTypes[type]}`}></i>
          </div>
        )}

        <div
          className={`modal__container ${
            type == "register" ? "modal__container--sm" : ""
          }`}
        >
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
