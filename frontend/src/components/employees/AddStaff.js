import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getPositions,
  addDepartment,
  addPosition,
  updateDepartment,
  deleteDepartment,
  updatePosition,
  deletePosition,
  updateEmployee,
  deleteEmployee,
  updateBusinessName,
  addSite,
  updateSite,
  deleteSite,
} from "../../actions/employees";
import { toast } from "react-toastify";

const AddStaff = (props) => {
  const { onClose, form, staffPosition, update } = props;

  let positions = useSelector((state) => state.employees.all_positions);
  let errors = useSelector((state) => state.errors.msg);
  let departments = useSelector((state) => state.employees.departments);
  let employees = useSelector((state) => state.employees.employees);
  let sites = useSelector(state => state.employees.sites)
  const dispatch = useDispatch();
  useEffect(() => {
    if (form == "staff") {
      positions = dispatch(getPositions());
      staffPosition && setPosition(staffPosition.toString());
    }
  }, []);

  let current = useSelector((state) => state.employees.current);

  let department_obj = departments.filter(
    (item) => item.id == current.department
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
  const [position, setPosition] = useState([]);

  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    form == "Department" &&
      update &&
      setAdmins(update.admins.map((item) => item.id));
  }, [update]);

  useEffect(() => {
    if (update) {
      setName(update.name);
      if (form == "staff") {
        setFirstName(update.first_name);
        setLastName(update.last_name);
        setPosition(update.position.map((item) => item));
      }
    }
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (form == "staff") {
      const employee = {
        first_name: firstName,
        last_name: lastName,
        position_id: position.map(pos => pos.id),
        business_id: current.business,
        default_availability: {
          0: { name: "unselected", start_time: null, end_time: null },
          1: { name: "unselected", start_time: null, end_time: null },
          2: { name: "unselected", start_time: null, end_time: null },
          3: { name: "unselected", start_time: null, end_time: null },
          4: { name: "unselected", start_time: null, end_time: null },
          5: { name: "unselected", start_time: null, end_time: null },
          6: { name: "unselected", start_time: null, end_time: null },
        },
      };

      if (firstName.length > 0 && lastName.length > 0 && position.length > 0) {
        if (update) {
          dispatch(updateEmployee(update.id, employee));
          toast.success("Employee updated!");
        } else {
          dispatch(addEmployee(employee));
          toast.success("Employee added!");
        }

        setFirstName("");
        setLastName("");
        setPosition("");
        onClose();
      }
    } else if (form == "Department") {
      if (update) {
        dispatch(
          updateDepartment(update.id, {
            name,
            business_id: current.business,
            site_id: current.site,
            admins_id: admins,
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
      setName("");
      onClose();
    } else if (form == "Position") {
      if (update) {
        dispatch(
          updatePosition(update.id, {
            name,
            department_id: current.department,
            business_id: current.business,
          })
        );
        toast.success("Position updated!");
      } else {
        dispatch(
          addPosition({
            name,
            department_id: parseInt(current.department),
            business_id: current.business,
          })
        );
        toast.success("Position added!");
      }
      setName("");
      onClose();
    } else if (form == "Site") {
      if (update) {
        dispatch(
          updateSite(update.id, {
            name,
            business_id: current.business,
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
      setName("");
      onClose();
    } else if (form == "BusinessName") {
      dispatch(updateBusinessName(update.id, { name }));
      toast.success("Business name updated!");
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
                autoFocus
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
              <label className="staffForm__label">Position(s):</label>
              <div>
              {departments.map(dep => <Fragment>
                <strong>{dep.name}</strong>
                <div className="flex-container--wrap">
                  {positions.map(pos => pos.department.id == dep.id && (
                    <p onClick={() => {
                      position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? setPosition([...position.filter(item => item.department.id != pos.department.id), pos]) : position.some(item => item.id == pos.id) ? setPosition(position.filter(item => item.id != pos.id)) :
                    
                      setPosition([...position, pos])
                    }}
                    className={`btn-toggle--sm ${position.some(item => item.id == pos.id) ? "active" : ""} ${position.some(item => item.id != pos.id && item.department.id == pos.department.id) ? "disabled" : ""}`}>{pos.name}</p>)
                  )}
                </div>
                
              </Fragment>)}
              </div>
              <p className="error">{errors.position_id}</p>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="staffForm__control">
              <label className="staffForm__label">Name:</label>
              <input
                className="staffForm__input"
                type="text"
                name="name "
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              ></input>
              <p className="error">{errors.name}</p>
            </div>
            {form == "Department" &&
              update &&
              employees.some((item) => item.user) && (
                <div className="staffForm__control">
                  <label className="staffForm__label">Admins:</label>
                  <select
                    className="staffForm__input"
                    onChange={(e) => {
                      setAdmins(
                        [...e.target.options]
                          .filter((o) => o.selected)
                          .map((o) => o.value)
                      );
                    }}
                    name="admins"
                    value={admins}
                    multiple
                  >
                    {employees.map(
                      (item) =>
                        item.user &&
                        item.position.some(
                          (item) => item.department.name == update.name
                        ) && (
                          <option key={item.user} value={item.user}>
                            {item.first_name} {item.last_name}
                          </option>
                        )
                    )}
                  </select>
                  <p className="error">{errors.admins}</p>
                </div>
              )}
          </Fragment>
        )}

        <div className="staffForm__buttons">
          <button type="submit" value="update" className="btn-modal--confirm">
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
                  } else if (form == "Site") {
                    if(sites.length == 1) {
                      toast.warning("You cannot delete this site!");
                      return false;
                    }
                    dispatch(deleteSite(update.id));
                  }
                }
                onClose();
              }}
              value="delete"
              className="btn-modal--cancel"
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
