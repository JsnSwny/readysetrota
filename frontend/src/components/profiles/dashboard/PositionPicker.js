import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PositionPicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  let positions = useSelector((state) => state.employees.positions);
  let employees = useSelector((state) => state.employees.employees);
  return (
    <Fragment>
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">Positions</p>
            <i
              onClick={() => {
                setOpen(true);
                setUpdate(false);
                setType("Position");
              }}
              className="fas fa-plus-square"
            ></i>
          </div>
          <div className="dashboard__wrapper">
            {positions.map((item) => (
              <div key={item.id} className="dashboard__item">
                <p className="title-md bold">{item.name}</p>
                <p className="subtitle-sm">
                  {
                    employees.filter((employee) =>
                      employee.position.some(
                        (position) => position.id == item.id
                      )
                    ).length
                  }{" "}
                  employees
                </p>
                <div className="btn-wrapper">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setUpdate(item);
                      setType("Position");
                    }}
                    className="btn-4"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PositionPicker;
