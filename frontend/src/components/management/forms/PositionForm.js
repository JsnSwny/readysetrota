import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosition, updatePosition } from "../../../actions/employees";
import { toast } from "react-toastify";
import Select from "react-select";
import { getErrors } from "../../../actions/errors";

const PositionForm = ({ setOpen, editPosition }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const current = useSelector((state) => state.employees.current);
  const departments = useSelector((state) => state.employees.departments);
  let errors = useSelector((state) => state.errors.msg);

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
    let error_obj = {
      name: name ? true : "This field is required",
      department: department ? true : "This field is required",
    };

    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      const positionObj = {
        name,
        business: current.business.id,
        department_id: department.value,
      };

      !editPosition
        ? dispatch(addPosition(positionObj))
        : dispatch(updatePosition(editPosition.id, positionObj));

      setOpen(false);
    }
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
          autoComplete="off"
        ></input>
        <p className="error">{errors.name}</p>
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
        <p className="error">{errors.department}</p>
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
