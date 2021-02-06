import React, { Fragment } from "react";

const DropButton = ({title, color, actions}) => {

    return (
        <div className="btn-drop">
            <div className={`btn-drop__btn${color ? `--${color}` : ""}`}>
                {title} <i class="fas fa-sort-down"></i>
            </div>
            <div className="btn-drop__items">
                {actions.map((item) => (
                    <div onClick={item.action} className="btn-drop__item">
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropButton;