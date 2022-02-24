import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";

const Employee = (props) => {
  const {
    employee,
    user,
    shifts,
    department,
    current_employee,
    result,
    financialMode,
  } = props;

  const getHours = (employee, type) => {
    return shifts
      .filter(
        (item) =>
          item.department == department &&
          item.employee == employee &&
          item.absence == "None"
      )
      .map((item) =>
        type == "actual"
          ? item.timeclock
            ? item.timeclock.length
            : 0
          : item.length
      )
      .reduce((a, b) => a + b, 0.0)
      .toFixed(2);
  };

  const getWage = (date, employee) => {
    let result = employee.wage;
    if (result) {
      result.sort((a, b) => {
        return (
          Math.abs(date - parseISO(a.start_date)) -
          Math.abs(date - parseISO(b.start_date))
        ); // sort a before b when the distance is smaller
      });
      result = result.filter((item) => parseISO(item.start_date) <= date);
      if (result.length > 0) {
        result = result[0];
      }
      if (result.wage_type == "S") {
        return parseFloat((result.wage / 52 / 7).toFixed(2));
      } else if (result.wage_type == "H") {
        return 0;
      }
    }
    return 0;
  };

  const getHourly = (date, type) => {
    let formatDate = format(date, "yyyy-MM-dd");
    let shifts_filtered = shifts.filter(
      (item) =>
        item.date == formatDate &&
        item.employee == employee.id &&
        item.absence == "None" &&
        item.wage > 0
    );

    let hourly = shifts_filtered
      .map((item) =>
        type == "p"
          ? item.timeclock
            ? +parseFloat(item.wage * item.timeclock.length).toFixed(2)
            : 0
          : +parseFloat(item.wage * item.length).toFixed(2)
      )
      .reduce((a, b) => a + b, 0.0);

    return hourly;
  };

  const getTotalWage = (type) => {
    let total = 0;
    result.forEach((item) => {
      total += getWage(item, employee);
      total += getHourly(item, type);
    });
    return total.toFixed(2);
  };

  let permissions = useSelector(
    (state) => state.permissions.active_permissions
  );

  return (
    <div
      className={`rotaEmployee__wrapper flex-container--center container-left ${
        !user.business && current_employee && current_employee.id == employee.id
          ? " active"
          : ""
      }`}
    >
      <Link
        to={`/employees/edit/${employee.id}`}
        className="rotaEmployee__name"
      >
        {employee.full_name}
      </Link>

      <p className="rotaEmployee__hours">
        {getHours(
          employee.id,
          `${financialMode == "actual" ? "actual" : "predicted"}`
        )}{" "}
        Hours{" "}
        {permissions.includes("view_wages") &&
          getTotalWage() != 0.0 &&
          `(£${getTotalWage(`${financialMode == "actual" ? "p" : ""}`)})`}
      </p>
    </div>
  );
};

export default Employee;
