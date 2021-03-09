import React from "react";
import { Link } from "react-router-dom";

const DashboardBlock = ({ children, disabled, disabledText, size }) => {
  return (
    <div className={`dashboard__block${size && size}`}>
      {disabled && (
        <div className="dashboard__block-disabled flex-container--column-center">
          <i class="fas fa-lock"></i>
          <h2>Locked</h2>
          <p>
            Upgrade to{" "}
            <Link className="link" to="/premium">
              premium
            </Link>{" "}
            to {disabledText}
          </p>
        </div>
      )}
      <div
        className={`dashboard__block-container ${disabled ? "disabled" : ""}`}
      >
        <>{children}</>
      </div>
    </div>
  );
};

export default DashboardBlock;
