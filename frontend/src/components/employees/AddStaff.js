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
import PositionField from "./PositionField"
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
    if (form == "Staff") {
      positions = dispatch(getPositions());
      staffPosition && setPosition(staffPosition.toString());
    }
  }, []);
  let current = useSelector((state) => state.employees.current);

  let current_site = sites.find(item => item.id == current.site) ? sites.find(item => item.id == current.site) : false;

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wage, setWage] = useState(0.00);
  const [wageType, setWageType] = useState("")
  const [position, setPosition] = useState([]);
  const [siteAdmin, setSiteAdmin] = useState(false);
  const formTitles = {"Staff": "Create Employee", "Department": "Create Department", "Position": "Create Position", "Site": "Create Site", "BusinessName": "Set your business name"}


  const isSiteAdmin = (user_id) => {
    return sites.find(site => site.id == current.site) ? sites.find(site => site.id == current.site).admins.includes(user_id) : false;
  }

  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    form == "Department" &&
      update &&
      setAdmins(update.admins.map((item) => item.id));
  }, [update]);

  useEffect(() => {
    if (update) {
      setName(update.name);
      if (form == "Staff") {
        setFirstName(update.first_name);
        setLastName(update.last_name);
        setPosition(update.position.map((item) => item));
        setWage(update.wage);
        setWageType(update.wage_type);
        setSiteAdmin(isSiteAdmin(update.user))
      }
    }
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (form == "Staff") {
      const employee = {
        first_name: firstName,
        last_name: lastName,
        wage: wage,
        wage_type: wageType,
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
        }
      };

      if (firstName.length > 0 && lastName.length > 0 && position.length > 0) {
        if (update) {
          dispatch(updateEmployee(update, employee, siteAdmin, current_site));
          
          toast.success("Employee updated!");
        } else {
          dispatch(addEmployee(employee));
          toast.success("Employee added!");
        }

        setFirstName("");
        setLastName("");
        setPosition("");
        setSiteAdmin(false);
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

  const staffForm = {}

  return (
    <div className="staffForm">
      <h1 style={{ fontSize: "28px", textAlign: "center" }}>
        {formTitles[form]}
      </h1>
      <form onSubmit={onSubmit} className="staffForm__form">
        {form === "Staff" ? (
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
              <label className="staffForm__label">Wage Type:</label>
              <div className="flex-container--wrap">
                <span
                    className={`btn-toggle--sm ${wageType == "H" && "active"}`}
                    onClick={() => {
                      setWageType("H");
                    }}
                  >
                    Hourly
                </span>
                <span
                    className={`btn-toggle--sm ${wageType == "S" && "active"}`}
                    onClick={() => {
                      setWageType("S");
                    }}
                  >
                    Salary
                </span>
              </div>
            </div>
            <div className="staffForm__control">
              <label className="staffForm__label">Wage:</label>
              <input
                className="staffForm__input"
                type="number"
                name="wage"
                onChange={(e) => setWage(e.target.value)}
                value={wage}
                step="0.01"
              ></input>
              <p className="error">{errors.name}</p>
            </div>
            <div className="staffForm__control">
              <label className="staffForm__label">Position(s):</label>
              <PositionField departments={departments} position={position} setPosition={setPosition} positions={positions} />
              <p className="error">{errors.position_id}</p>
            </div>
            {update && update.user && (
              <div className="staffForm__control">
              <label className="staffForm__label">Site admin?</label>
              <input
                type="checkbox"
                name="site_admin"
                onChange={(e) => {
                  setSiteAdmin(!siteAdmin)
                }}
                checked={siteAdmin}
              ></input>
              <p className="error">{errors.name}</p>
            </div>
            )}
            
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
                  } else if (form == "Staff") {
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
