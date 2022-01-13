import React, { useState } from "react";
import { publish, sendForApproval } from "../../actions/shifts";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, addDays } from "date-fns";
import RotaDatePicker from "./RotaDatePicker";

const RotaActions = ({
  showAvailabilities,
  setShowAvailabilities,
  financialMode,
  setFinancialMode,
  updateShifts,
}) => {
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state.employees.current.site.permissions
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

  const [publishDropdown, setPublishDropdown] = useState(false);
  return (
    <div className="rotaFunctions flex-container--between wrapper--md">
      <div className="rotaFunctions__wrapper">
        <div className="rotaFunctions__button-list">
          {permissions.includes("manage_shifts") && (
            <div className="dropdown">
              <div className="dropdown__wrapper">
                <div
                  onClick={() => dispatch(publish())}
                  className={`dropdown__button ${
                    !user.business && settings.shift_approval
                      ? shifts.some(
                          (item) =>
                            parseISO(item.date) >= addDays(new Date(), -1) &&
                            item.stage == "Unpublished" &&
                            item.employee
                        )
                        ? ""
                        : "disabled"
                      : !shifts.some(
                          (item) =>
                            parseISO(item.date) >= addDays(new Date(), -1) &&
                            item.stage != "Published" &&
                            item.employee
                        )
                      ? "disabled"
                      : ""
                  }`}
                >
                  Publish
                </div>
                <div
                  className={`dropdown__dropper ${
                    publishDropdown ? "active" : ""
                  }`}
                >
                  {permissions.includes("manage_shifts") &&
                    !user.business &&
                    settings.shift_approval && (
                      <div
                        className={`dropdown__item ${
                          !shifts.some((item) => item.stage == "Creation")
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() => {
                          dispatch(sendForApproval());
                          setPublishDropdown(!publishDropdown);
                        }}
                      >
                        Send for Approval
                      </div>
                    )}
                  {permissions.includes("approve_shifts") &&
                    settings.shift_approval && (
                      <div
                        className={`dropdown__item ${
                          !shifts.some((item) => item.stage == "Approval")
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() => {
                          dispatch(approveShifts());
                          setPublishDropdown(!publishDropdown);
                        }}
                      >
                        Approve Shifts
                      </div>
                    )}
                </div>
              </div>
              <i
                onClick={() => setPublishDropdown(!publishDropdown)}
                className="fas fa-caret-down"
              ></i>
            </div>
          )}
          {permissions.includes("manage_availabilities") &&
            business.plan != "F" && (
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

          <a
            className={`rotaFunctions__button ${
              shifts.filter((item) => item.stage == "Published").length == 0
                ? "disabled"
                : ""
            }`}
            href={`${`/exportall?start_date=${date}&end_date=${enddate}&id=${current.site.id}`}`}
            target="_blank"
          >
            Export <i className="fas fa-file-download"></i>
          </a>
        </div>
      </div>
      <div className="rotaFunctions__wrapper">
        <RotaDatePicker updateShifts={updateShifts} />
      </div>

      <div className="rotaFunctions__wrapper">
        {permissions.includes("manage_wages") && (
          <div className={`rotaFunctions__selector ${financialMode}`}>
            <p
              onClick={() => setFinancialMode("predicted")}
              className={`${financialMode == "predicted" ? "selected" : ""}`}
            >
              Predicted
            </p>
            <p
              onClick={() => setFinancialMode("actual")}
              className={`${financialMode == "actual" ? "selected" : ""}`}
            >
              Actual
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RotaActions;
