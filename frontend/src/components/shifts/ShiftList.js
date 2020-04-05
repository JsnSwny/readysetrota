import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getShifts } from "../../actions/shifts";
import { getEmployees } from "../../actions/employees";
import { format, parseISO, eachDayOfInterval, addDays } from "date-fns";
import Dates from "./Dates";
import Shift from "./Shift";

const ShiftList = () => {
  const dispatch = useDispatch();

  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);

  useEffect(() => {
    shifts_list = dispatch(getShifts(date, enddate));
    employees = dispatch(getEmployees());
  }, []);

  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date) =>
    shifts_list.filter((obj) => {
      return obj.employee.name === employee && obj.date === date;
    });

  return (
    <Fragment>
      <Dates dates={result} />
      {employees.map((employee) => (
        <div className="rota__container">
          <div className="employee__container">
            <div className="employee__wrapper">
              <p className="employee__position">{employee.position.name}</p>
              <p className="employee__name">
                {employee.name.split(" ")[0]}
                <span className="employee__surname">
                  {" "}
                  {employee.name.split(" ")[1]}
                </span>
              </p>
              <p className="employee__hours">30 Hours</p>
            </div>
          </div>
          <div className="shift__container">
            {result.map((result) =>
              getEmployeeShift(employee.name, format(result, "YYY-MM-dd"))
                .length > 0 ? (
                <Shift
                  employee={employee.name}
                  shift={getEmployeeShift(
                    employee.name,
                    format(result, "YYY-MM-dd")
                  )}
                />
              ) : (
                <div className="shift__shift shift__shift-noshift"></div>
              )
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default ShiftList;
