import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments, setDepartment } from "../../actions/employees";

const UpdateDepartment = (props) => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);
  if (user && user.profile.role == "User") {
    departments = user.employee[0].position.map((item) => {
      return item.department;
    });
  }
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };

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
      {departments.map((obj) => (
        <option value={obj.id}>{obj.name}</option>
      ))}
    </select>
  );
};

export default UpdateDepartment;
