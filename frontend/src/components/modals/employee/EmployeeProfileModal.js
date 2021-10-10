import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalDetails from "./tabs/PersonalDetails";
import Positions from "../Positions";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  updateSite,
} from "../../../actions/employees";
import { toast } from "react-toastify";
import { getErrors } from "../../../actions/errors";
import DefaultAvailability from "./tabs/DefaultAvailability";
import Permissions from "./tabs/Permissions";
import Status from "./tabs/Status";
import { parseISO, format } from "date-fns";

const EmployeeProfileModal = (props) => {
  const { onClose, form, staffPosition, update, confirmProps } = props;
  const { setConfirmOpen, setOnConfirm, setMessage } = confirmProps;

  const dispatch = useDispatch();
  let positions = useSelector((state) => state.employees.positions);
  let sites = useSelector((state) => state.employees.sites);
  let user = useSelector((state) => state.auth.user);
  let errors = useSelector((state) => state.errors.msg);
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
  const [currentTabNumber, setCurrentTabNumber] = useState(1);

  const [startWorkingDate, setStartWorkingDate] = useState(
    update && update.current_status.start_date
      ? parseISO(update.current_status.start_date)
      : new Date()
  );
  const [endWorkingDate, setEndWorkingDate] = useState(
    update && update.current_status.end_date
      ? parseISO(update.current_status.end_date)
      : ""
  );
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

  const [currentTab, setCurrentTab] = useState("Details");

  useEffect(() => {
    if (update) {
      setFirstName(update.first_name);
      setLastName(update.last_name);
      setPosition(update.position.map((item) => item));
      setWage(update.current_wage ? update.current_wage.amount : 0);
      setWageType(update.current_wage ? update.current_wage.type : "N");
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
  const statusProps = {
    startWorkingDate,
    setStartWorkingDate,
    endWorkingDate,
    setEndWorkingDate,
  };
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
      start_working_date: format(startWorkingDate, "yyyy-MM-dd"),
      end_working_date: endWorkingDate
        ? format(endWorkingDate, "yyyy-MM-dd")
        : "",
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
    <Fragment>
      <div className="form__heading">
        <h4>
          {firstName
            ? `${firstName} ${lastName && lastName}`
            : update
            ? ""
            : "Add a new employee"}
        </h4>
        <p>Fill out the information below to add a new employee</p>
      </div>

      <div className={`flex-container form__tabs`}>
        <button
          onClick={() => {
            setCurrentTab("Details");
            setCurrentTabNumber(1);
          }}
          className={`form__tab ${
            errors &&
            errors.first_name &&
            (errors.first_name != true || errors.last_name != true)
              ? "err"
              : ""
          } ${currentTab == "Details" ? "active" : ""}`}
        >
          Details
        </button>
        <button
          onClick={() => {
            setCurrentTab("Positions");
            setCurrentTabNumber(2);
          }}
          className={`form__tab ${
            errors && errors.positions && errors.positions != true ? "err" : ""
          } ${currentTab == "Positions" ? "active" : ""}`}
        >
          Positions
        </button>
        <button
          onClick={() => {
            setCurrentTab("Availability");
            setCurrentTabNumber(3);
          }}
          className={`form__tab ${
            currentTab == "Availability" ? "active" : ""
          }`}
        >
          Availability
        </button>
        <button
          onClick={() => {
            setCurrentTab("Permissions");
            setCurrentTabNumber(4);
          }}
          className={`form__tab ${currentTab == "Permissions" ? "active" : ""}`}
        >
          Permissions
        </button>
      </div>
      <div class="form__tab-line">
        <span style={{ left: `${(currentTabNumber - 1) * 25}%` }}></span>
      </div>
      <form onSubmit={onSubmit} className="modal__form">
        <div className="modal__content">
          <div className="modal__content-wrapper">
            {currentTab == "Details" && (
              <Fragment>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                <h1>Test</h1>
                {/* <Positions {...positionsProps} />
                <PersonalDetails {...personalDetailsProps} />
                <PersonalDetails {...personalDetailsProps} /> */}
              </Fragment>
            )}

            {currentTab == "Positions" && (
              <Fragment>
                <Positions {...positionsProps} />
                <PersonalDetails {...personalDetailsProps} />
                <PersonalDetails {...personalDetailsProps} />
              </Fragment>
            )}
            {currentTab == "Availability" && (
              <DefaultAvailability {...availabilityProps} />
            )}
            {currentTab == "Permissions" && (
              <Permissions {...permissionsProps} />
            )}
            {currentTab == "Status" && <Status {...statusProps} />}
          </div>
        </div>
        <div className="modal__actions">
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
                  dispatch(
                    updateEmployee(update.id, {
                      ...update,
                      user: null,
                      archived: true,
                      start_working_date: update.current_status.start_date,
                      end_working_date: !update.current_status.end_date
                        ? format(new Date(), "yyyy-MM-dd")
                        : "",
                      business_id: update.business.id,
                      position_id: update.position.map((item) => item.id),
                    })
                  );

                  // dispatch(deleteEmployee(update.id));
                });
              }
              onClose();
            }}
            value="delete"
            className="modal__button modal__delete"
          >
            {update ? "Delete" : "Cancel"}
          </button>
          <button
            className="modal__button modal__save"
            type="submit"
            value="Save"
          >
            Add Employee
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EmployeeProfileModal;
