import React from "react";
import NoShift from "./NoShift";

const OpenShifts = ({
  department,
  setOpen,
  setShiftFormInfo,
  setEditShift,
  result,
}) => {
  return (
    <div className="rota__container">
      <div
        className={`rotaEmployee__wrapper flex-container--center container-left`}
      >
        <p className="rotaEmployee__name">Open Shifts</p>
      </div>
      <div className="container-right">
        {result.map((result) => (
          <NoShift
            key={result}
            shiftDepartment={department.id}
            setOpen={setOpen}
            setShiftFormInfo={setShiftFormInfo}
            setEditShift={setEditShift}
            result={result}
          />
        ))}
      </div>
    </div>
  );
};

export default OpenShifts;
