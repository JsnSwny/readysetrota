import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSite, updateSite } from "../../../actions/employees";
import { toast } from "react-toastify";
import { getErrors } from "../../../actions/errors";

const SiteForm = ({ setOpen, editSite }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);

  useEffect(() => {
    setName(editSite.name);
  }, [editSite]);

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
      let siteObj = {
        name,
        business_id: current.business.id,
      };
      !editSite
        ? dispatch(addSite(siteObj))
        : dispatch(updateSite(editSite.id, siteObj));
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
          {!editSite ? "Add Department" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default SiteForm;
