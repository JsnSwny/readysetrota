import React, { Fragment } from "react";

const PositionField = (props) => {
    const { departments, position, positions, setPosition } = props;

    return (
        departments.map(dep => 
            positions.filter(pos => pos.department.id == dep.id).length > 0 &&
            <Fragment>
                <strong>{dep.name}</strong>
                <div className="flex-container--wrap">
                    {positions.map(pos => pos.department.id == dep.id && (
                    <p onClick={() => {
                        position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? setPosition([...position.filter(item => item.department.id != pos.department.id), pos]) : position.some(item => item.id == pos.id) ? setPosition(position.filter(item => item.id != pos.id)) :
                        setPosition([...position, pos])
                    }}
                    className={`btn-toggle--sm ${position.some(item => item.id == pos.id) ? "active" : ""} ${position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? "disabled" : ""}`}>{pos.name}</p>)
                    )}
                </div>
            </Fragment>
        )
    )
}

export default PositionField;