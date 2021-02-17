import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDepartment,
  updateDepartment,
  updatePosition,
  addPosition,
  updateSite,
  addSite,
  deleteSite,
  deleteDepartment,
  deletePosition,
} from "../../actions/employees";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";

const StaffManagementModal = (props) => {
  const { onClose, form, staffPosition, update, confirmProps, title } = props;
  const { setConfirmOpen, setOnConfirm, setMessage } = confirmProps;
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  let errors = useSelector((state) => state.errors.msg);
  let error_obj = {};
  let current = useSelector((state) => state.employees.current);
  useEffect(() => {
    if (update) {
      setName(update.name);
    }
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    error_obj = { name: name.length > 0 ? true : "This field is required" };
    dispatch(getErrors(error_obj, 400));
    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      if (form == "Site") {
        if (update) {
          dispatch(
            updateSite(update.id, {
              name,
            })
          );
          toast.success("Site updated!");
        } else {
          dispatch(
            addSite({
              name,
              business_id: current.business,
            })
          );
          toast.success("Site added!");
        }
      }
      if (form == "Department") {
        if (update) {
          dispatch(
            updateDepartment(update.id, {
              name,
            })
          );
          toast.success("Department updated!");
        } else {
          dispatch(
            addDepartment({
              name,
              business_id: current.business,
              site_id: current.site,
            })
          );
          toast.success("Department added!");
        }
      }
      if (form == "Position") {
        if (update) {
          dispatch(
            updatePosition(update.id, {
              name,
            })
          );
          toast.success("Position updated!");
        } else {
          dispatch(
            addPosition({
              name,
              business_id: current.business,
              department_id: parseInt(current.department),
            })
          );
          toast.success("Position added!");
        }
      }
      setName("");
      onClose();
    }
  };
  return (
    <div className="form">
      <div className="form__image">
        <i class="fas fa-users-cog"></i>
      </div>
      <p className="form__subheading">Staff Management - {form}</p>
      <h1 className="form__heading">{name ? name : !update ? title : name}</h1>
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
        {errors.name && errors.name != true && (
          <p className="error">{errors.name}</p>
        )}
        <div className="flex-container--between form__actions">
          <button className="form__save" type="submit" value="Save">
            Save
          </button>
          {form != "BusinessName" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (update) {
                  setConfirmOpen(true);
                  setMessage(
                    `Are you sure you want to delete this ${form.toLowerCase()}?`
                  );

                  if (form == "Department") {
                    setOnConfirm(() => () => {
                      setConfirmOpen(false);
                      dispatch(deleteDepartment(update.id));
                    });
                  } else if (form == "Position") {
                    setOnConfirm(() => () => {
                      setConfirmOpen(false);
                      dispatch(deletePosition(update.id));
                    });
                  } else if (form == "Staff") {
                    setOnConfirm(() => () => {
                      setConfirmOpen(false);
                      dispatch(deleteEmployee(update.id));
                    });
                  } else if (form == "Site") {
                    if (sites.length == 1) {
                      toast.warning("You cannot delete this site!");
                      return false;
                    }
                    setOnConfirm(() => () => {
                      setConfirmOpen(false);
                      dispatch(deleteSite(update.id));
                    });
                  }
                }
                onClose();
              }}
              value="delete"
              className="form__delete"
            >
              {update ? "Delete" : "Cancel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StaffManagementModal;
