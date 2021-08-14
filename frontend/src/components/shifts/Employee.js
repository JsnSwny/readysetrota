import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";

const Employee = (props) => {
  const {
    employee,
    user,
    shifts,
    currentDepartment,
    current_employee,
    result,
    financialMode,
  } = props;

  const getHours = (employee, type) => {
    return shifts
      .filter((item) => item.employee.id == employee && item.absence == "None")
      .map((item) =>
        type == "actual"
          ? item.timeclock
            ? item.timeclock.length
            : 0
          : item.length
      )
      .reduce((a, b) => a + b, 0.0);
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
        return parseFloat((result.wage / 52 / 5).toFixed(2));
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
        item.employee.id == employee.id &&
        item.absence == "None" &&
        item.wage > 0
    );

    if (employee.id == 13) {
      console.log(shifts);
      console.log(formatDate);
      console.log(shifts_filtered);
    }

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
    (state) => state.employees.current.site.permissions
  );
  let siteAdmin = permissions.includes("manage_shifts");

  return (
    <div
      className={`rotaEmployee__wrapper flex-container--center container-left ${
        !user.business && current_employee && current_employee.id == employee.id
          ? " active"
          : ""
      }`}
    >
      <p className="rotaEmployee__position">
        {employee.position.map(
          (item) =>
            item.department == parseInt(currentDepartment) && (
              <span key={item.id}>{item.name}</span>
            )
        )}
      </p>
      <p className="rotaEmployee__name">
        {employee.first_name} <strong>{employee.last_name}</strong>
      </p>

      <p className="rotaEmployee__hours">
        {getHours(
          employee.id,
          `${financialMode == "actual" ? "actual" : "predicted"}`
        )}{" "}
        Hours{" "}
        {permissions.includes("manage_wages") &&
          getTotalWage() != 0.0 &&
          `(£${getTotalWage(`${financialMode == "actual" ? "p" : ""}`)})`}
      </p>
    </div>
  );
};

export default Employee;
