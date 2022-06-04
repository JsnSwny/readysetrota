import React from "react";
import { useSelector } from "react-redux";
import { format, parseISO, getDay } from "date-fns";
import Shift from "./Shift";
import NoShift from "./NoShift";

const RotaEmployeeShifts = ({
  result,
  employee,
  financialMode,
  showAvailabilities,
  setOpen,
  setShiftFormInfo,
  setEditShift,
}) => {
  const shifts = useSelector((state) => state.shifts.shifts);
  let availability = useSelector((state) => state.employees.availability);
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  var getEmployeeShift = (employee, date) =>
    shifts.filter((obj) => {
      return obj.employee && obj.employee === employee && obj.date === date
        ? permissions.includes("create_shifts")
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
    // if (!available) {
    //   date = parseISO(date);
    //   available =
    //     employee.default_availability[getDay(date) == 0 ? 6 : getDay(date) - 1];
    // }

    return available;
  };
  return (
    <div className="container-right">
      {result.map((result) => {
        const format_date = format(result, "yyyy-MM-dd");

        let shifts = getEmployeeShift(employee.id, format_date);

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
            setShiftFormInfo={setShiftFormInfo}
            setOpen={setOpen}
            setEditShift={setEditShift}
          />
        ) : (
          <NoShift
            key={result}
            {...props}
            financialMode={financialMode}
            setOpen={setOpen}
            setShiftFormInfo={setShiftFormInfo}
            setEditShift={setEditShift}
          />
        );
      })}
    </div>
  );
};

export default RotaEmployeeShifts;
