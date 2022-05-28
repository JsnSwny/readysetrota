import React from "react";

const Alert = ({ color, message, title, icon }) => {
  return (
    <div className={`alert alert--${color}`}>
      <i class="fas fa-exclamation alert__icon"></i>
      <div className="alert__content">
        <h4 className="alert__title">{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
