import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO, addDays } from "date-fns";
import { publish } from "../../actions/shifts";

const RotaBar = (props) => {
  const dispatch = useDispatch();

  // Props
  const {
    updateShifts,
    showAvailabilities,
    setShowAvailabilities,
    scrollPosition,
    setTemplate,
    template,
  } = props;

  // Selectors
  let width = useSelector((state) => state.responsive.width);
  let date = useSelector((state) => state.shifts.date);
  let business = useSelector((state) => state.auth.business);
  let shifts = useSelector((state) => state.shifts.shifts);
  let published_shifts = shifts.filter((item) => item.published);
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );
  let user = useSelector((state) => state.auth.user);

  const formatDate = (date, add, display = false) => {
    let newDate = display
      ? format(addDays(parseISO(date), add), "dd/MM/yyyy")
      : format(addDays(parseISO(date), add), "yyyy-MM-dd");

    return newDate;
  };

  let current_employee = user.employee.filter((employee) =>
    employee.position.some((item) => item.department.id == currentDepartment)
  )[0];
  let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;

  // Arrow Key Date Change
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
        <div
          className={`dates__mobile ${scrollPosition >= 360 ? " fixed" : ""}`}
        >
          {/* UPDATE SHIFTS BACK */}
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

            {/* TEMPLATE VIEW */}
            {/* <div
              onClick={() => {
                setTemplate(!template);
              }}
              className="dates__mobile-item"
            >
              <i
                className={`${
                  template ? "fas fa-calendar-check" : "fas fa-calendar-times"
                }`}
              ></i>
              <p>Template View</p>
            </div> */}

            {/* EXPORT SHIFTS */}
            {(current_employee || business) && (
              <a
                className={`dates__mobile-item ${
                  published_shifts.length == 0 ? "disabled" : ""
                }`}
                href={`${
                  published_shifts.length > 0
                    ? `/exportall?start_date=${date}&end_date=${format(
                        addDays(parseISO(date), 6),
                        "yyyy-MM-dd"
                      )}&id=${currentDepartment}`
                    : ""
                }`}
                target={`${published_shifts.length > 0 ? "_blank" : ""}`}
              >
                <i className="fas fa-file-download"></i>
                <p>Export Shifts</p>
              </a>
            )}

            {/* AVAILABILITIES */}
            {business && (
              <div
                onClick={() => {
                  setShowAvailabilities(!showAvailabilities);
                }}
                className={`dates__mobile-item`}
              >
                <i
                  className={`fas ${
                    showAvailabilities ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
                <p>Availabilities</p>
              </div>
            )}

            {/* PUBLISH SHIFTS */}
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

            {/* UPDATE SHIFTS FORWARD */}
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
      )}
    </div>
  );
};

export default RotaBar;