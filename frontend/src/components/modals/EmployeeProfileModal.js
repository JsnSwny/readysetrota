import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalDetails from "./PersonalDetails";
import Positions from "./Positions";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  updateSite,
} from "../../actions/employees";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";
import DefaultAvailability from "./DefaultAvailability";
import Permissions from "./Permissions";

const EmployeeProfileModal = (props) => {
  const { onClose, form, staffPosition, update, confirmProps } = props;
  const { setConfirmOpen, setOnConfirm, setMessage } = confirmProps;

  const dispatch = useDispatch();
  let positions = useSelector((state) => state.employees.all_positions);
  let sites = useSelector((state) => state.employees.sites);
  let user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     if (form == "Staff") {
  //     staffPosition && setPosition(staffPosition.toString());
  //     }
  // }, []);
  let current = useSelector((state) => state.employees.current);
  let perms = useSelector((state) => state.employees.current.site.permissions);

  let current_site = sites.find((item) => item.id == current.site.id)
    ? sites.find((item) => item.id == current.site.id)
    : false;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wage, setWage] = useState(0.0);
  const [wageType, setWageType] = useState("N");
  const [position, setPosition] = useState([]);
  const [siteAdmin, setSiteAdmin] = useState(false);
  const [currentSelector, setCurrentSelector] = useState("unselected");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [availability, setAvailability] = useState({
    0: { name: "unselected", start_time: null, end_time: null },
    1: { name: "unselected", start_time: null, end_time: null },
    2: { name: "unselected", start_time: null, end_time: null },
    3: { name: "unselected", start_time: null, end_time: null },
    4: { name: "unselected", start_time: null, end_time: null },
    5: { name: "unselected", start_time: null, end_time: null },
    6: { name: "unselected", start_time: null, end_time: null },
  });
  let error_obj = {};

  const isSiteAdmin = (user_id) => {
    return sites.find((site) => site.id == current.site.id)
      ? sites
          .find((site) => site.id == current.site.id)
          .admins.includes(user_id)
      : false;
  };

  const [currentTab, setCurrentTab] = useState("Personal Details");

  useEffect(() => {
    if (update) {
      setFirstName(update.first_name);
      setLastName(update.last_name);
      setPosition(update.position.map((item) => item));
      setWage(update.wage);
      setWageType(update.wage_type);
      setSiteAdmin(isSiteAdmin(update.user));
      setAvailability(update.default_availability);
      setPermissions(update.site_permissions);
    }
  }, [update]);

  const personalDetailsProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    wage,
    setWage,
    wageType,
    setWageType,
  };
  const positionsProps = { position, setPosition };
  const permissionsProps = { permissions, setPermissions };
  const availabilityProps = {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    currentSelector,
    setCurrentSelector,
    availability,
    setAvailability,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const employee = {
      first_name: firstName,
      last_name: lastName,
      wage: wage,
      wage_type: wageType,
      position_id: position.map((pos) => pos.id),
      business_id: current.business.id,
      default_availability: availability,
      permissions,
    };
    error_obj = {
      first_name: firstName.length > 0 ? true : "First name is required",
      last_name: lastName.length > 0 ? true : "Last name is required",
      positions:
        position.length > 0
          ? true
          : positions.length > 0
          ? "Select at least one position"
          : "You don't have any positions",
    };
    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      if (update) {
        dispatch(updateEmployee(update.id, employee, siteAdmin, current_site));
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
    } else {
      toast.warn("Form incomplete, check for errors");
    }
  };

  return (
    <div className="form">
      <div className="form__image">
        {firstName ? (
          `${firstName[0]}${lastName && lastName[0]}`
        ) : (
          <i className="fas fa-user"></i>
        )}
      </div>
      <p className="form__subheading">Employee Profile</p>
      <h1 className="form__heading">
        {firstName
          ? `${firstName} ${lastName && lastName}`
          : update
          ? ""
          : "Create an Employee"}
      </h1>
      <div className="flex-container form__tabs">
        <button
          onClick={() => setCurrentTab("Personal Details")}
          className={`btn-8 ${
            currentTab == "Personal Details" ? "active" : ""
          }`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setCurrentTab("Positions")}
          className={`btn-8 ${currentTab == "Positions" ? "active" : ""}`}
        >
          Positions
        </button>
        {perms.includes("manage_availabilities") && (
          <button
            onClick={() => setCurrentTab("Availability")}
            className={`btn-8 ${currentTab == "Availability" ? "active" : ""}`}
          >
            Availability
          </button>
        )}

        {user.business && update && update.user && (
          <button
            onClick={() => setCurrentTab("Permissions")}
            className={`btn-8 ${currentTab == "Permissions" ? "active" : ""}`}
          >
            Permissions
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className="form__form">
        {currentTab == "Personal Details" && (
          <PersonalDetails {...personalDetailsProps} />
        )}
        {currentTab == "Positions" && <Positions {...positionsProps} />}
        {currentTab == "Availability" && (
          <DefaultAvailability {...availabilityProps} />
        )}
        {currentTab == "Permissions" && <Permissions {...permissionsProps} />}
        <div className="flex-container--between form__actions">
          <button className="form__save" type="submit" value="Save">
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (update) {
                setConfirmOpen(true);
                setMessage(
                  `Are you sure you want to delete ${update.full_name}?`
                );
                setOnConfirm(() => () => {
                  setConfirmOpen(false);
                  dispatch(deleteEmployee(update.id));
                });
              }
              onClose();
            }}
            value="delete"
            className="form__delete"
          >
            {update ? "Delete" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeProfileModal;
