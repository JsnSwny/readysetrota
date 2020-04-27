import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getPositions,
  getDepartments,
  addDepartment,
  addPosition,
} from "../../actions/employees";

const AddStaff = (props) => {
  const { form } = props;

  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let errors = useSelector((state) => state.errors.msg);
  const dispatch = useDispatch();
  useEffect(() => {
    positions = dispatch(getPositions());
    departments = dispatch(getDepartments());
  }, []);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (form == "Staff") {
      const employee = {
        name,
        position_id: position,
        department_id: department,
      };
      dispatch(addEmployee(employee));
      if (name.length > 0 && position.length > 0 && department.length > 0) {
        setName("");
        setPosition("");
        setDepartment("");
      }
    } else if (form == "Department") {
      dispatch(addDepartment({ name }));
      setName("");
    } else if (form == "Position") {
      const position_obj = {
        name,
      };
      dispatch(addPosition(position_obj));
      setName("");
    }
  };
  return (
    <Fragment>
      <div className="staffForm">
        <h1 style={{ fontSize: "20px" }}>Add {form}</h1>
        <form onSubmit={onSubmit} className="staffForm__form">
          <div className="staffForm__control">
            <label className="staffForm__label">Name:</label>
            <input
              className="staffForm__input"
              type="text"
              name="name "
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <p className="error">{errors.name}</p>
          </div>
          {form === "Staff" && (
            <Fragment>
              <div className="staffForm__control">
                <label className="staffForm__label">Position:</label>
                <select
                  className="staffForm__input"
                  onChange={(e) => setPosition(e.target.value)}
                  name="position"
                  value={position}
                >
                  <option value="" disabled selected>
                    Select a position
                  </option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
                <p className="error">{errors.position_id}</p>
              </div>
              <div className="staffForm__control">
                <label className="staffForm__label">Department:</label>
                <select
                  className="staffForm__input"
                  onChange={(e) => setDepartment(e.target.value)}
                  name="department"
                  value={department}
                >
                  <option value="" disabled selected>
                    Select a department
                  </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                <p className="error">{errors.department_id}</p>
              </div>
            </Fragment>
          )}
          <button className="btn-1">Create</button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddStaff;
