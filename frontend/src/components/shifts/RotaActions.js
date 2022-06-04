import React, { useState } from "react";
import { publish, sendForApproval } from "../../actions/shifts";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, addDays } from "date-fns";
import RotaDatePicker from "./RotaDatePicker";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { addDepartment } from "../../actions/employees";

const RotaActions = ({
  showAvailabilities,
  setShowAvailabilities,
  financialMode,
  setFinancialMode,
  updateShifts,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  const user = useSelector((state) => state.auth.user);
  const shifts = useSelector((state) => state.shifts.shifts);
  const settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  const date = useSelector((state) => state.shifts.date);
  const enddate = useSelector((state) => state.shifts.end_date);
  const business = useSelector((state) => state.employees.business);
  const current = useSelector((state) => state.employees.current);
  const auth = useSelector((state) => state.auth);
  const departments = useSelector((state) => state.employees.departments);

  let departmentOptions = departments.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  departmentOptions = [
    { label: "All Departments", value: 0 },
    ...departmentOptions,
  ];

  const exportShifts = () => {
    const token = auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .get(
        `/exportall?start_date=${date}&end_date=${enddate}&id=${current.site.id}`,
        config
      )
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
  };

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action == "create-option") {
      dispatch(
        addDepartment({
          name: newValue.label,
          site_id: current.site.id,
          business_id: current.business.id,
        })
      );
    } else {
      setSelectedDepartment(newValue);
    }
  };

  const [publishDropdown, setPublishDropdown] = useState(false);
  return (
    <div className="rotaFunctions flex-container--between wrapper--md">
      <div className="rotaFunctions__wrapper">
        <CreatableSelect
          className="react-select-container"
          classNamePrefix="react-select"
          onChange={handleChange}
          options={departmentOptions}
          placeholder={"Select a department"}
          value={selectedDepartment}
        />
        <div className="rotaFunctions__button-list">
          {permissions.includes("publish_shifts") && (
            <div
              onClick={() => dispatch(publish())}
              className={`rotaFunctions__button ${
                !shifts.some(
                  (item) =>
                    parseISO(item.date) >= addDays(new Date(), -1) &&
                    item.stage != "Published" &&
                    item.employee
                )
                  ? "disabled"
                  : ""
              }`}
            >
              Publish <i className="fas fa-paper-plane"></i>
            </div>
          )}
          {permissions.includes("create_shifts") && (
            <div
              onClick={() => {
                setShowAvailabilities(!showAvailabilities);
              }}
              className="rotaFunctions__button"
            >
              Availabilities{" "}
              <i
                className={`fas ${
                  showAvailabilities ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </div>
          )}

          <button
            className={`rotaFunctions__button ${
              shifts.filter((item) => item.stage == "Published").length == 0
                ? "disabled"
                : ""
            }`}
            onClick={exportShifts}
          >
            Export <i className="fas fa-file-download"></i>
          </button>
        </div>
      </div>
      <div className="rotaFunctions__wrapper">
        <RotaDatePicker updateShifts={updateShifts} />
      </div>
    </div>
  );
};

export default RotaActions;
