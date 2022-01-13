import React from "react";

const RotaPositionList = ({ children }) => {
  return positions
    .filter(
      (posFilter) =>
        posFilter.department.id == dep.id &&
        employees.filter((employee) =>
          employee.position.some((position) => posFilter.id == position.id)
        ).length > 0
    )
    .map((position) => (
      <Fragment>
        <h4 className="rota__position">{position.name}</h4>
        {children}
      </Fragment>
    ));
};

export default RotaPositionList;
