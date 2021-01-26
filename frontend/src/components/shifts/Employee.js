import React from "react";
import { parse, differenceInMinutes, addDays } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Employee = (props) => {
  const {
    employee,
    user,
    shifts_list,
    currentDepartment,
    current_employee,
  } = props;

  const getAllShifts = (employee) => {
    let hours = 0;
    let shifts = shifts_list.filter(
      (obj) => obj.employee && obj.employee.id === employee
    );
    for (let i = 0; i < shifts.length; i++) {
      let start = parse(shifts[i].start_time, "HH:mm", new Date());
      let end = parse(shifts[i].end_time, "HH:mm", new Date());
      if (end < start) {
        end = addDays(end, 1);
      }
      if (end != "Invalid Date") hours += differenceInMinutes(end, start) / 60;
    }
    return hours;
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
              {employee.first_name}
              <span className="employee__surname"> {employee.last_name}</span>
            </p>
          </Link>
        </div>
        
        <p className="employee__hours">{getAllShifts(employee.id)} Hours {site_admin && ["H", "S"].includes(employee.wage_type) && (`(£${employee.wage * getAllShifts(employee.id)})`)}</p>
      </div>
  );
};

export default Employee;
