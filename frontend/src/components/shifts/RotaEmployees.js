import React from "react";
import { useSelector } from "react-redux";
import Employee from "./Employee";
import RotaEmployeeShifts from "./RotaEmployeeShifts";

const RotaEmployees = ({
  department,
  position,
  result,
  financialMode,
  setOpen,
  setShiftFormInfo,
  setEditShift,
}) => {
  const employees = useSelector((state) => state.employees.employees);
  const shifts = useSelector((state) => state.shifts.shifts);
  const user = useSelector((state) => state.auth.user);

  let current_employee = null;
  if (user.employee) {
    current_employee = employees.find((item) => item.user == user.id);
  }

  return employees
    .filter((emp) => emp.position.some((pos) => pos.id == position.id))
    .map((employee, i) => (
      <div key={employee.id} className="rota__container">
        <Employee
          employee={employee}
          current_employee={current_employee}
          shifts={shifts}
          user={user}
          department={department.id}
          result={result}
          financialMode={financialMode}
        />
        <RotaEmployeeShifts
          result={result}
          employee={employee}
          department={department}
          financialMode={financialMode}
          setOpen={setOpen}
          setShiftFormInfo={setShiftFormInfo}
          setEditShift={setEditShift}
        />
      </div>
    ));
};

export default RotaEmployees;