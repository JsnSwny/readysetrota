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
  const { onClose, form, staffPosition } = props;

  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let errors = useSelector((state) => state.errors.msg);
  const dispatch = useDispatch();

  useEffect(() => {
    positions = dispatch(getPositions());
    departments = dispatch(getDepartments());
    staffPosition && setPosition(staffPosition.toString());
  }, []);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (form == "Staff") {
      const employee = {
        name,
        position_id: position,
        department_id: department,
      };
      console.log(name);
      console.log(position);
      console.log(department);
      if (name.length > 0 && position.length > 0 && department.length > 0) {
        dispatch(addEmployee(employee));
        setName("");
        setPosition("");
        setDepartment("");
        onClose();
      }
    } else if (form == "Department") {
      dispatch(addDepartment({ name }));
      setName("");
      onClose();
    } else if (form == "Position") {
      const position_obj = {
        name,
      };
      dispatch(addPosition(position_obj));
      setName("");
      onClose();
    }
  };
  return (
    <Fragment>
      <div className="staffForm">
        <h1 style={{ fontSize: "28px", textAlign: "center" }}>Create {form}</h1>
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
          <div className="staffForm__buttons">
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-1"
              style={{ backgroundColor: "#d05b5b" }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-1">
              Create
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddStaff;
