import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments, setDepartment } from "../../actions/employees";
import { getShifts } from "../../actions/shifts";
import { toast } from "react-toastify";

const UpdateDepartment = () => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);

  let date = useSelector((state) => state.shifts.date);
  let plan = useSelector((state) => state.employees.business.plan);
  let enddate = useSelector((state) => state.shifts.end_date);

  let current = useSelector(
    (state) => state.employees.current
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const setDep = (id) => {
    dispatch(setDepartment(id));
    dispatch(getShifts(date, enddate));
  };

  if (current.department == 0 && departments.length == 1) {
    setDep(departments[0].id);
  }

  return (
    <select
      onChange={(e) => {
        if (plan == "F" && e.target.value != departments[0].id) {
          toast.warning("Upgrade to premium to unlock unlimited departments");
          return false;
        } else {
          setDep(e.target.value);
        }
      }}
      className="btn-3"
      value={current.department == 0 ? "" : current.department}
    >
      <option value="" disabled>
        Select Department
      </option>
      {departments.map((obj) => {
        return (
          <option key={obj.id} value={obj.id}>
            {obj.name}
          </option>
        );
      })}
    </select>
  );
};

export default UpdateDepartment;
