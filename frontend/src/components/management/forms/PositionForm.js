import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosition, updatePosition } from "../../../actions/employees";
import { toast } from "react-toastify";
import Select from "react-select";
const PositionForm = ({ setOpen, editPosition }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const current = useSelector((state) => state.employees.current);
  const departments = useSelector((state) => state.employees.departments);

  useEffect(() => {
    if (editPosition) {
      setName(editPosition.name);
      setDepartment({
        value: editPosition.department.id,
        label: editPosition.department.name,
      });
    }
  }, [editPosition]);

  const onSubmit = (e) => {
    e.preventDefault();
    const positionObj = {
      name,
      business_id: current.business.id,
      department_id: department.value,
    };

    !editPosition
      ? dispatch(addPosition(positionObj))
      : dispatch(updatePosition(editPosition.id, positionObj));

    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form">
      <div className="form__control">
        <label className="form__label">Name*</label>
        <input
          className="form__input"
          type="text"
          name="first_name "
          onChange={(e) => setName(e.target.value)}
          autoFocus
          value={name}
        ></input>
      </div>
      <div className="form__control">
        <label className="form__label">Department*:</label>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          value={department}
          onChange={(e) => setDepartment(e)}
          options={[
            ...departments.map((item) => ({
              value: item.id,
              label: item.name,
            })),
          ]}
          placeholder={"Select a department"}
        />
      </div>

      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Position">
          {!editPosition ? "Add Position" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default PositionForm;
