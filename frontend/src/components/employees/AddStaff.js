import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getPositions,
  getDepartments,
  addDepartment,
  addPosition,
  updateDepartment,
  deleteDepartment,
  updatePosition,
  deletePosition,
  updateEmployee,
  deleteEmployee,
  updateBusinessName,
} from "../../actions/employees";
import { contextType } from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStaff = (props) => {
  const { onClose, form, staffPosition, update } = props;

  let positions = useSelector((state) => state.employees.all_positions);
  let errors = useSelector((state) => state.errors.msg);
  let departments = useSelector((state) => state.employees.departments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (form == "staff") {
      positions = dispatch(getPositions());
      staffPosition && setPosition(staffPosition.toString());
    }
  }, []);

  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  // Disable Positions in Department of already selected positions
  const getDepartment = (id) => {
    let department = positions.filter((item) => item.id == id)[0].department.id;
    let positionsInDepartment = positions
      .filter((item) => item.department.id == department && item.id != id)
      .map((pos) => pos.id);
    for (let i = 0; i < position.length; i++) {
      if (positionsInDepartment.includes(parseInt(position[i]))) {
        return true;
      }
    }
    return false;
  };

  // Prevent Shift Clicking to Select More Positions
  const checkDepartment = (arr) => {
    let obj = {};
    let department_list = departments.map((item) => item.id);
    let position_list = positions.filter((item) =>
      arr.includes(item.id.toString())
    );
    for (const key of department_list) {
      let test = position_list
        .filter((item) => {
          return item.department.id == key;
        })
        .map((pos) => pos.id);
      obj[key] = test;
    }
    for (let key in obj) {
      if (obj[key].length > 1) {
        return false;
      }
    }
    return true;
  };

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (update) {
      setName(update.name);
      if (form == "staff") {
        setFirstName(update.first_name);
        setLastName(update.last_name);
        setPosition(update.position.map((item) => item.id));
      }
    }
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (form == "staff") {
      const employee = {
        first_name: firstName,
        last_name: lastName,
        position_id: position,
      };

      if (firstName.length > 0 && lastName.length > 0 && position.length > 0) {
        if (update) {
          dispatch(updateEmployee(update.id, employee));
          toast.success("Employee updated!", {
            position: "bottom-center",
          });
        } else {
          dispatch(addEmployee(employee));
          toast.success("Employee added!", {
            position: "bottom-center",
          });
        }

        setFirstName("");
        setLastName("");
        setPosition("");
        onClose();
      }
    } else if (form == "Department") {
      if (update) {
        dispatch(updateDepartment(update.id, { name }));
        toast.success("Department updated!", {
          position: "bottom-center",
        });
      } else {
        dispatch(addDepartment({ name }));
        toast.success("Department added!", {
          position: "bottom-center",
        });
      }
      setName("");
      onClose();
    } else if (form == "Position") {
      if (update) {
        dispatch(
          updatePosition(update.id, {
            name,
            department_id: currentDepartment,
          })
        );
        toast.success("Position updated!", {
          position: "bottom-center",
        });
      } else {
        dispatch(addPosition({ name }));
        toast.success("Position added!", {
          position: "bottom-center",
        });
      }
      setName("");
      onClose();
    } else if (form == "BusinessName") {
      dispatch(updateBusinessName(update.id, { name }));
      toast.success("Business name updated!", {
        position: "bottom-center",
      });
      setName("");
      onClose();
    }
  };

  return (
    <div className="staffForm">
      <h1 style={{ fontSize: "28px", textAlign: "center" }}>
        {form != "BusinessName" ? form : "Business Name"}
      </h1>
      <form onSubmit={onSubmit} className="staffForm__form">
        {form === "staff" ? (
          <Fragment>
            <div className="staffForm__control">
              <label className="staffForm__label">First Name:</label>
              <input
                className="staffForm__input"
                type="text"
                name="first_name "
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              ></input>
              <p className="error">{errors.name}</p>
            </div>
            <div className="staffForm__control">
              <label className="staffForm__label">Last Name:</label>
              <input
                className="staffForm__input"
                type="text"
                name="last_name "
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              ></input>
              <p className="error">{errors.name}</p>
            </div>
            <div className="staffForm__control">
              <label className="staffForm__label">Position:</label>
              <select
                className="staffForm__input"
                onChange={(e) => {
                  return checkDepartment(
                    [...e.target.options]
                      .filter((o) => o.selected)
                      .map((o) => o.value)
                  )
                    ? setPosition(
                        [...e.target.options]
                          .filter((o) => o.selected)
                          .map((o) => o.value)
                      )
                    : false;
                }}
                name="position"
                value={position}
                multiple
              >
                {positions.map((item) =>
                  getDepartment(item.id) ? (
                    <option disabled key={item.id} value={item.id}>
                      {item.name} ({item.department.name})
                    </option>
                  ) : (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.department.name})
                    </option>
                  )
                )}
              </select>
              <p className="error">{errors.position_id}</p>
            </div>
          </Fragment>
        ) : (
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
        )}

        <div className="staffForm__buttons">
          <button type="submit" value="update" className="btn-1">
            {update ? "Update" : "Create"}
          </button>
          {form != "BusinessName" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (update) {
                  if (form == "Department") {
                    dispatch(deleteDepartment(update.id));
                  } else if (form == "Position") {
                    dispatch(deletePosition(update.id));
                  } else if (form == "staff") {
                    dispatch(deleteEmployee(update.id));
                  }
                }
                onClose();
              }}
              value="delete"
              className="btn-1"
              style={{ backgroundColor: "#d05b5b" }}
            >
              {update ? "Delete" : "Cancel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
