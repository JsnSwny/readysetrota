import React from "react";
import { Link } from "react-router-dom";

const DashboardBlock = ({ children, disabled, disabledText, size }) => {
  return (
    <div className={`list-block__block${size ? size : ""}`}>
      {disabled && (
        <div className="list-block__block-disabled flex-container--column-center">
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
      <>{children}</>
    </div>
  );
};

export default DashboardBlock;
