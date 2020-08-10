import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDepartments,
  setDepartment,
  getEmployees,
} from "../../actions/employees";
import { getShifts } from "../../actions/shifts";

const UpdateDepartment = () => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);

  let date = useSelector((state) => state.shifts.date);

  let enddate = useSelector((state) => state.shifts.end_date);

  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const setDep = (id) => {
    dispatch(setDepartment(id));
    dispatch(getShifts(date, enddate));
  };

  if (currentDepartment == 0 && departments.length == 1) {
    setDep(departments[0].id);
  }

  return (
    <select
      onChange={(e) => {
        setDep(e.target.value);
      }}
      className="btn-3"
      value={currentDepartment == 0 ? "" : currentDepartment}
    >
      <option value="" selected disabled>
        Select Department
      </option>
      {departments.map((obj) => {
        return <option value={obj.id}>{obj.name}</option>;
      })}
    </select>
  );
};

export default UpdateDepartment;
