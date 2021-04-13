import React from "react";

const AvailabilityPicker = ({ actions, current }) => {
  return (
    <div className="availability-buttons">
      <i
        onClick={actions["availableAction"].action}
        className={`fas fa-check ${current == "available" ? "active" : ""}`}
      ></i>
      <i
        onClick={actions["partialAction"].action}
        className={`fas fa-hourglass-half ${
          current == "partial" ? "active" : ""
        }`}
      ></i>
      <i
        onClick={actions["unavailableAction"].action}
        className={`fas fa-times ${current == "unavailable" ? "active" : ""}`}
      ></i>
    </div>
  );
};

export default AvailabilityPicker;
