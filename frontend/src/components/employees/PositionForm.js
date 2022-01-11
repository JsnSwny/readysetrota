import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosition } from "../../actions/employees";
import { toast } from "react-toastify";

const PositionForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const current = useSelector((state) => state.employees.current);
  const departments = useSelector((state) => state.employees.departments);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPosition({
        name,
        business_id: current.business.id,
        department_id: department,
      })
    );
    toast.success("Position added!");
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
        <label className="form__label">Department*</label>
        <select
          className="form__input"
          type="text"
          name="department"
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
        >
          <option value="" selected disabled hidden>
            Select a department
          </option>
          {departments.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Department">
          Add Position
        </button>
      </div>
    </form>
  );
};

export default PositionForm;
