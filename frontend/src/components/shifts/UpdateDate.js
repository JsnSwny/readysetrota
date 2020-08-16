import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { format, parseISO, addDays } from "date-fns";
import UpdateDepartment from "../shifts/UpdateDepartment";
import EmailStaff from "./EmailStaff";

const UpdateDate = (props) => {
  const { updateShifts, showAvailabilities, setShowAvailabilities } = props;
  let width = useSelector((state) => state.responsive.width);
  let date = useSelector((state) => state.shifts.date);
  let business = useSelector((state) => state.auth.business);
  let formatDate = (date, add) => {
    let newDate = format(addDays(parseISO(date), add), "YYY-MM-dd");
    return newDate;
  };
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );
  let user = useSelector((state) => state.auth.user);
  let current_employee = user.employee.filter((employee) =>
    employee.position.some((item) => item.department.id == currentDepartment)
  )[0];
  let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;
  let permissions = user.all_permissions;

  return (
    <div className="button-layout container">
      <UpdateDepartment />
      {currentDepartment != 0 && (
        <Fragment>
          <button
            onClick={() => {
              setShowAvailabilities(!showAvailabilities);
            }}
            className="btn-3 button"
          >
            Show Availabilities
          </button>
          {(current_employee || business) && (
            <a
              href={`/exportall?start_date=${date}&end_date=${format(
                addDays(parseISO(date), 6),
                "YYY-MM-dd"
              )}&id=${
                user.groups.some((item) => item.name == "Business")
                  ? user.id
                  : current_employee.owner.id
              }`}
              target="_blank"
            >
              <button className="btn-3 button">Export Shifts</button>
            </a>
          )}

          {permissions.includes("can_publish_shifts") && <EmailStaff />}
          <div className="dates__pickerWrapper">
            <p
              onClick={() => {
                updateShifts(
                  formatDate(date, -dateRange - 1),
                  formatDate(date, -dateRange + dateRange - 1)
                );
              }}
            >
              <i className="fas fa-caret-left"></i>
            </p>
            <h2 className="dates__pickerDate">
              {format(parseISO(date), "dd MMM")} -{" "}
              {format(addDays(parseISO(date), dateRange), "dd MMM")}
            </h2>
            <p
              onClick={() => {
                updateShifts(
                  formatDate(date, dateRange + 1),
                  formatDate(date, dateRange + dateRange + 1)
                );
              }}
            >
              <i className="fas fa-caret-right"></i>
            </p>
          </div>
          <div className="dates__mobile">
            <i
              onClick={() => {
                updateShifts(
                  formatDate(date, -dateRange - 1),
                  formatDate(date, -dateRange + dateRange - 1)
                );
              }}
              className="fas fa-arrow-circle-left"
            ></i>
            <i
              onClick={() => {
                updateShifts(
                  formatDate(date, dateRange + 1),
                  formatDate(date, dateRange + dateRange + 1)
                );
              }}
              className="fas fa-arrow-circle-right"
            ></i>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UpdateDate;
