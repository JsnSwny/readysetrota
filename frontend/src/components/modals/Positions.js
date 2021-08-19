import React from "react";
import { useSelector } from "react-redux";
import PositionField from "../employees/PositionField";

const Positions = ({ position, setPosition, many = false, shift = false }) => {
  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  return (
    <div className="form__control">
      <small className="helper-text">
        <i class="fas fa-info-circle"></i> Select at least one position
      </small>
      <PositionField
        departments={departments}
        position={position}
        setPosition={setPosition}
        positions={positions}
        many={many}
        shift={shift}
      />
    </div>
  );
};

export default Positions;
