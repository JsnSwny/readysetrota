import React, { Fragment } from "react";
import { format } from "date-fns";

const RotaDepartmentList = ({ result, department }) => {
  return (
    <Fragment>
      <div className="rota__heading flex-container--between-end">
        <h2 className="title-sm container-left">{department.name}</h2>
        <div className="container-right">
          {result.map((date) => (
            <div className="item-block">
              <p>{format(date, "ccc")}</p>
              <p>{format(date, "d MMM")}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className="separator" />
    </Fragment>
  );
};

export default RotaDepartmentList;
