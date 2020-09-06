import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO, addDays } from "date-fns";
import UpdateDepartment from "../shifts/UpdateDepartment";
import EmailStaff from "./EmailStaff";
import { toast } from "react-toastify";
import { publish } from "../../actions/shifts";

const UpdateDate = (props) => {
  const dispatch = useDispatch();
  const {
    updateShifts,
    showAvailabilities,
    setShowAvailabilities,
    scrollPosition,
  } = props;
  let width = useSelector((state) => state.responsive.width);
  let date = useSelector((state) => state.shifts.date);
  let business = useSelector((state) => state.auth.business);
  let shifts = useSelector((state) => state.shifts.shifts);
  let availability = useSelector((state) => state.employees.availability);
  const formatDate = (date, add, display = false) => {
    let newDate = display
      ? format(addDays(parseISO(date), add), "dd/MM/yyyy")
      : format(addDays(parseISO(date), add), "yyyy-MM-dd");

    return newDate;
  };
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );
  let currentBusiness = useSelector(
    (state) => state.employees.current_business
  );
  let user = useSelector((state) => state.auth.user);
  let current_employee = user.employee.filter((employee) =>
    employee.position.some((item) => item.department.id == currentDepartment)
  )[0];
  let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;

  const handleKeydown = (key) => {
    if (key.keyCode == "37") {
      updateShifts(
        formatDate(date, -dateRange - 1),
        formatDate(date, -dateRange + dateRange - 1)
      );
    } else if (key.keyCode == "39") {
      updateShifts(
        formatDate(date, dateRange + 1),
        formatDate(date, dateRange + dateRange + 1)
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [date]);

  return (
    <div className="button-layout">
      {currentDepartment != 0 && (
        <Fragment>
          <div
            className={`dates__mobile ${scrollPosition >= 360 ? " fixed" : ""}`}
          >
            <div className="dates__mobile-container">
              <div
                onClick={() => {
                  updateShifts(
                    formatDate(date, -dateRange - 1),
                    formatDate(date, -dateRange + dateRange - 1)
                  );
                }}
                className="dates__mobile-item"
              >
                <i className="fas fa-arrow-left"></i>
                <p>{formatDate(date, -dateRange - 1, true)}</p>
              </div>
              {(current_employee || business) && (
                <a
                  className={`dates__mobile-item ${
                    shifts.length == 0 ? "disabled" : ""
                  }`}
                  href={`${
                    shifts.length > 0
                      ? `/exportall?start_date=${date}&end_date=${format(
                          addDays(parseISO(date), 6),
                          "yyyy-MM-dd"
                        )}&id=${currentBusiness}`
                      : ""
                  }`}
                  target={`${shifts.length > 0 ? "_blank" : ""}`}
                >
                  <i className="fas fa-file-download"></i>
                  <p>Export Shifts</p>
                </a>
              )}
              {business && (
                <div
                  onClick={() => {
                    availability.length > 0
                      ? setShowAvailabilities(!showAvailabilities)
                      : toast.warning("There are no availabilities to show!");
                  }}
                  className={`dates__mobile-item ${
                    availability.length == 0 ? "disabled" : ""
                  }`}
                >
                  <i
                    className={`fas ${
                      showAvailabilities ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                  <p>Availabilities</p>
                </div>
              )}

              {business && (
                <div
                  onClick={() => {
                    dispatch(publish());
                  }}
                  className={`dates__mobile-item ${
                    !shifts.some((item) => !item.published) ? "disabled" : ""
                  }`}
                >
                  <i className="fas fa-check"></i>
                  <p>Publish Shifts</p>
                </div>
              )}

              <div
                onClick={() => {
                  updateShifts(
                    formatDate(date, dateRange + 1),
                    formatDate(date, dateRange + dateRange + 1)
                  );
                }}
                className="dates__mobile-item"
              >
                <i className="fas fa-arrow-right"></i>
                <p>{formatDate(date, dateRange + 1, true)}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UpdateDate;
