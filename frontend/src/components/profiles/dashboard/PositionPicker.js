import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

const PositionPicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  let employees = useSelector((state) => state.employees.employees);
  let positions = useSelector(state => state.employees.positions)
  let current = useSelector((state) => state.employees.current);
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
              <div key={item.id} className="dashboard__item--sm">
               <p className="title-md bold">
                  {item.name}{" "}
                  <i
                    onClick={() => {
                      setOpen(true);
                      setUpdate(item);
                      setType("Position");
                    }}
                    class="fas fa-edit"
                  ></i>
                </p>
                <p className="subtitle-sm" style={{ flex: "0" }}>
                  {current.site == 0 && `${item.department.name} - ${item.department.site.name}`}
                </p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PositionPicker;
