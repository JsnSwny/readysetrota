import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment, updateDepartment } from "../../../actions/employees";
import { toast } from "react-toastify";
import { getErrors } from "../../../actions/errors";

const DepartmentForm = ({ setOpen, editDepartment }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);

  useEffect(() => {
    setName(editDepartment.name);
  }, [editDepartment]);

  const onSubmit = (e) => {
    e.preventDefault();

    let error_obj = {
      name: name ? true : "This field is required",
    };

    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      let depObj = {
        name,
        business_id: current.business.id,
        site_id: current.site.id,
      };
      !editDepartment
        ? dispatch(addDepartment(depObj))
        : dispatch(updateDepartment(editDepartment.id, depObj));
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
        ></input>
        <p className="error">{errors.name}</p>
      </div>
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Department">
          {!editDepartment ? "Add Department" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
