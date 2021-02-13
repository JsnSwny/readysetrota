import React from "react";
import { useSelector } from "react-redux";
import PositionField from "../employees/PositionField";

const Positions = ({position, setPosition}) => {
    let positions = useSelector((state) => state.employees.all_positions);
    let departments = useSelector((state) => state.employees.departments);
    return(
        <div className="form__control">
            <small className="helper-text"><i class="fas fa-info-circle"></i> Select at least one position</small>
            <PositionField departments={departments} position={position} setPosition={setPosition} positions={positions} />
        </div>
    )
}

export default Positions;