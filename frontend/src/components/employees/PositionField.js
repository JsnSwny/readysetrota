import React, { Fragment, useEffect } from "react";

const PositionField = (props) => {
    const { departments, position, positions, setPosition, many, shift } = props;
    
    return (
        departments.map(dep => 
            positions.filter(pos => pos.department.id == dep.id).length > 0 &&
            <Fragment key={dep.id}>
                <strong>{dep.name}</strong>
                <div className="flex-container--wrap">
                    {positions.map(pos => pos.department.id == dep.id && (
                    <p key={pos.id} onClick={() => {
                        !many && position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? setPosition([...position.filter(item => item.department.id != pos.department.id), pos]) : position.some(item => item.id == pos.id) ? setPosition(position.filter(item => item.id != pos.id)) :
                        setPosition([...position, pos])
                    }}
                    className={`btn-toggle--sm ${position.some(item => item.id == pos.id) ? "active" : ""} ${!many && position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? "disabled" : ""}`}>{pos.name}</p>)
                    )}
                </div>
            </Fragment>
        )
    )
}

export default PositionField;