import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../actions/employees";
import { toast } from "react-toastify";

const DepartmentForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const current = useSelector((state) => state.employees.current);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addDepartment({
        name,
        business_id: current.business.id,
        site_id: current.site.id,
      })
    );
    toast.success("Department added!");
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
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Department">
          Add Department
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
