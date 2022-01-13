import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import {
  getAllAvailability,
  getForecast,
  getEmployees,
  getPositions,
} from "../../actions/employees";
import { format, parseISO, eachDayOfInterval, addDays, getDay } from "date-fns";
import Loading from "../common/Loading";
import Employee from "./Employee";
import NoShift from "./NoShift";
import Shift from "./Shift";
import Title from "../common/Title";
import FinancialBar from "./FinancialBar";
import SmallModal from "../layout/SmallModal";
import ShiftForm from "./ShiftForm";
import RotaActions from "./RotaActions";

const Rota = ({ modalProps }) => {
  const dispatch = useDispatch();

  // State Selectors
  let user = useSelector((state) => state.auth.user);

  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let enddate = useSelector((state) => state.shifts.end_date);
  let availability = useSelector((state) => state.employees.availability);
  let positions = useSelector((state) => state.employees.positions);
  let loading = useSelector((state) => state.loading);

  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let current = useSelector((state) => state.employees.current);
  let width = useSelector((state) => state.responsive.width);
  let departments = useSelector((state) => state.employees.departments);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let siteAdmin = permissions.includes("manage_shifts");
  let shiftPerm = permissions.includes("manage_shifts");

  // Use State
  const [currentDevice, setCurrentDevice] = useState("");
  const [showAvailabilities, setShowAvailabilities] = useState(false);

  const [financialMode, setFinancialMode] = useState("predicted");

  const [open, setOpen] = useState(false);
  const [editShift, setEditShift] = useState(false);
  const [shiftFormInfo, setShiftFormInfo] = useState(false);

  // Update Shifts
  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(current.site.id, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
    dispatch(getForecast(start_date, end_date));
    dispatch(getEmployees(true, false, start_date, end_date));
    dispatch(getPositions());
  };

  // Set Current Employee
  let current_employee = null;
  if (user.employee) {
    current_employee = employees.find((item) => item.user == user.id);
  }

  // Update shifts based on width
  const widthUpdate = (force = false) => {
    let currentDate = format(new Date(), "yyyy-MM-dd");
    if (width > 960) {
      if (currentDevice != "Desktop" || force) {
        updateShifts(
          date,
          format(addDays(parseISO(date, "dd-MM-yyyy"), 6), "yyyy-MM-dd")
        );
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet" || force) {
        updateShifts(currentDate, format(addDays(new Date(), 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet" || force) {
        updateShifts(currentDate, format(addDays(new Date(), 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile" || force) {
        updateShifts(currentDate, currentDate);
        setCurrentDevice("Mobile");
      }
    }
  };

  // Width initial update
  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    widthUpdate();
  }, [width]);

  // Update Shifts and Popular Times
  useEffect(() => {
    dispatch(getPopularTimes());
    widthUpdate(true);
  }, [current.site]);

  // Date range
  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date, department) =>
    shifts.filter((obj) => {
      return obj.employee &&
        obj.employee.id === employee &&
        obj.date === date &&
        obj.department == department
        ? siteAdmin
          ? true
          : obj.stage == "Published"
        : "";
    });

  const isAvailable = (employee, date) => {
    let available = availability.filter(
      (item) => item.employee.id == employee.id && item.date == date
    )[0];
    if (!available) {
      date = parseISO(date);
      available =
        employee.default_availability[getDay(date) == 0 ? 6 : getDay(date) - 1];
    }

    return available;
  };

  const [staffSort, setStaffSort] = useState(
    localStorage.getItem("staff_sort")
      ? localStorage.getItem("staff_sort")
      : "alphabetical"
  );

  return (
    <div>
      {permissions.includes("manage_wages") && (
        <FinancialBar
          {...modalProps}
          dates={result}
          financialMode={financialMode}
        />
      )}
      {open && (
        <SmallModal
          open={open}
          setOpen={setOpen}
          title={editShift ? `Edit ${editShift.name}` : "Add a new shift"}
          size={"-md"}
        >
          <ShiftForm
            setOpen={setOpen}
            editShift={editShift}
            shiftFormInfo={shiftFormInfo}
          />
        </SmallModal>
      )}
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <h1 className="header">
            <Title name="Rota" breakWord={false} />
          </h1>
        </div>
      </div>
      <RotaActions
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        financialMode={financialMode}
        setFinancialMode={setFinancialMode}
        updateShifts={updateShifts}
      />
      <div>
        {(isLoading || loading.employees) && <Loading />}
        {current.department != 0 && (
          <div className={`rota ${isLoading ? "loading" : ""} wrapper--md`}>
            {employees.length > 0 &&
              departments.map((dep, i) => (
                <div className="rota__department">
                  <div className="rota__heading flex-container--between-end">
                    <h2
                      className={`title-sm container-left ${
                        i > 0 ? "title--margin-top" : ""
                      }`}
                    >
                      {dep.name}
                    </h2>
                    <div className="container-right">
                      {result.map((date) => (
                        <div className="item-block">
                          <p>{format(date, "ccc")}</p>
                          <p>{format(date, "d MMM")}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="separator" />
                  {positions
                    .filter(
                      (posFilter) =>
                        posFilter.department.id == dep.id &&
                        employees.filter((employee) =>
                          employee.position.some(
                            (position) => posFilter.id == position.id
                          )
                        ).length > 0
                    )
                    .map((position) => (
                      <Fragment>
                        <h4 className="rota__position">{position.name}</h4>
                        {employees
                          .filter((emp) =>
                            emp.position.some((pos) => pos.id == position.id)
                          )
                          .map((employee, i) => (
                            <div key={employee.id} className="rota__container">
                              <Employee
                                employee={employee}
                                current_employee={current_employee}
                                shifts={shifts}
                                user={user}
                                department={dep.id}
                                result={result}
                                financialMode={financialMode}
                              />
                              <div className="container-right">
                                {result.map((result) => {
                                  const format_date = format(
                                    result,
                                    "yyyy-MM-dd"
                                  );
                                  let shifts = getEmployeeShift(
                                    employee.id,
                                    format_date,
                                    dep.id
                                  );
                                  if (financialMode == "actual") {
                                    shifts = shifts.filter(
                                      (item) => item.stage == "Published"
                                    );
                                  }
                                  let props = {
                                    format_date,
                                    result,
                                    available: isAvailable(
                                      employee,
                                      format_date
                                    ),
                                    employee,
                                    showAvailabilities,
                                    admin: shiftPerm,
                                  };

                                  return shifts.length > 0 ? (
                                    <Shift
                                      key={result}
                                      {...props}
                                      shifts={shifts}
                                      financialMode={financialMode}
                                      shiftDepartment={dep.id}
                                      setShiftFormInfo={setShiftFormInfo}
                                    />
                                  ) : (
                                    <NoShift
                                      key={result}
                                      {...props}
                                      shiftDepartment={dep.id}
                                      financialMode={financialMode}
                                      setOpen={setOpen}
                                      setShiftFormInfo={setShiftFormInfo}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                      </Fragment>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rota;
