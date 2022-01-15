import React from "react";
import { useSelector } from "react-redux";
import { format, parseISO, getDay } from "date-fns";
import Shift from "./Shift";
import NoShift from "./NoShift";

const RotaEmployeeShifts = ({
  result,
  employee,
  department,
  financialMode,
  showAvailabilities,
  setOpen,
  setShiftFormInfo,
  setEditShift,
}) => {
  const shifts = useSelector((state) => state.shifts.shifts);
  let availability = useSelector((state) => state.employees.availability);
  const permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  var getEmployeeShift = (employee, date, department) =>
    shifts.filter((obj) => {
      return obj.employee &&
        obj.employee.id === employee &&
        obj.date === date &&
        obj.department == department
        ? permissions.includes("manage_shifts")
          ? true
          : obj.stage == "Published"
        : "";
    });

  const isAvailable = (employee, date) => {
    let available = availability.filter(
      (item) =>
        item.employee.id == employee.id &&
        item.date == format(date, "yyyy-MM-dd")
    )[0];
    if (!available) {
      date = parseISO(date);
      available =
        employee.default_availability[getDay(date) == 0 ? 6 : getDay(date) - 1];
    }

    return available;
  };
  return (
    <div className="container-right">
      {result.map((result) => {
        const format_date = format(result, "yyyy-MM-dd");

        let shifts = getEmployeeShift(employee.id, format_date, department.id);

        if (financialMode == "actual") {
          shifts = shifts.filter((item) => item.stage == "Published");
        }

        let props = {
          result,
          available: isAvailable(employee, result),
          employee,
          showAvailabilities,
        };

        return shifts.length > 0 ? (
          <Shift
            key={result}
            {...props}
            shifts={shifts}
            financialMode={financialMode}
            shiftDepartment={department.id}
            setShiftFormInfo={setShiftFormInfo}
            setOpen={setOpen}
            setEditShift={setEditShift}
          />
        ) : (
          <NoShift
            key={result}
            {...props}
            shiftDepartment={department.id}
            financialMode={financialMode}
            setOpen={setOpen}
            setShiftFormInfo={setShiftFormInfo}
          />
        );
      })}
    </div>
  );
};

export default RotaEmployeeShifts;