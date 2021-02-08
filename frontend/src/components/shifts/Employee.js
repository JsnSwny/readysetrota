import React from "react";
import { parse, differenceInMinutes, addDays } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Employee = (props) => {
  const {
    employee,
    user,
    shifts,
    currentDepartment,
    current_employee,
  } = props;

  const getHours = (employee) => {
    return shifts.map(item => item.employee && item.employee.id == employee && item.length).reduce((a, b) => a + b, 0.00);
  };

  let site_admin = useSelector((state) => state.employees.site_admin);

  return (
      <div
        className={`employee__wrapper container-left ${
          !user.business &&
          current_employee &&
          current_employee.id == employee.id
            ? " active"
            : ""
        }`}
      >
        <p className="employee__position">
          {employee.position.map(
            (item) =>
              item.department == parseInt(currentDepartment) && (
                <span key={item.id}>{item.name}</span>
              )
          )}
        </p>
        <div className="employee__name-container">
        
          <Link to={`/profile/${employee.id}`}>
            <p className="employee__name">
              {employee.first_name}{" "}
              <span className="employee__surname"> {employee.last_name}</span>
            </p>
          </Link>
        </div>
        
        <p className="employee__hours">{getHours(employee.id)} Hours {site_admin && ["H", "S"].includes(employee.wage_type) && (`(£${employee.wage * getHours(employee.id)})`)}</p>
      </div>
  );
};

export default Employee;
