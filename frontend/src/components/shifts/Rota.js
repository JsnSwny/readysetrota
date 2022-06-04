import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import {
  getAllAvailability,
  getForecast,
  getEmployees,
  getPositions,
} from "../../actions/employees";
import {
  format,
  parseISO,
  eachDayOfInterval,
  addDays,
  getDay,
  startOfWeek,
} from "date-fns";
import Loading from "../common/Loading";
import Title from "../common/Title";
import FinancialBar from "./FinancialBar";
import RotaActions from "./RotaActions";
import Employee from "./Employee";
import RotaEmployeeShifts from "./RotaEmployeeShifts";
import ShiftModal from "./ShiftModal";
import OpenShifts from "./OpenShifts";
import Select from "react-select";

import QuickAddEmployeeModal from "../management/forms/QuickAddEmployeeModal";

const Rota = () => {
  const dispatch = useDispatch();

  let date = useSelector((state) => state.shifts.date);
  let enddate = useSelector((state) => state.shifts.end_date);
  let positions = useSelector((state) => state.employees.positions);
  let employees = useSelector((state) => state.employees.employees);
  let loading = useSelector((state) => state.loading);
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let current = useSelector((state) => state.employees.current);
  let width = useSelector((state) => state.responsive.width);
  let departments = useSelector((state) => state.employees.departments);
  const user = useSelector((state) => state.auth.user);

  const [showAvailabilities, setShowAvailabilities] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("");
  const [financialMode, setFinancialMode] = useState("predicted");
  const [open, setOpen] = useState(false);
  const [editShift, setEditShift] = useState(false);
  const [shiftFormInfo, setShiftFormInfo] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({
    label: "All Departments",
    value: 0,
  });

  const [employeeOpen, setEmployeeOpen] = useState(false);

  // Update Shifts
  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(current.site.id, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
    dispatch(getForecast(start_date, end_date));
    console.log(selectedDepartment);
    dispatch(getEmployees(start_date, end_date, selectedDepartment.value));
  };

  useEffect(() => {
    checkWidth(true);
  }, [selectedDepartment]);

  let departmentOptions = departments.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  departmentOptions = [
    { label: "All Departments", value: 0 },
    ...departmentOptions,
  ];

  const updateWidth = (force, device, date, add) => {
    if (currentDevice != device || force) {
      updateShifts(
        format(date, "yyyy-MM-dd"),
        format(addDays(date, add), "yyyy-MM-dd")
      );
      setCurrentDevice(device);
    }
  };

  // Update shifts based on width
  const checkWidth = (force = false) => {
    if (width > 960) {
      updateWidth(
        force,
        "Desktop",
        startOfWeek(new Date(), { weekStartsOn: 1 }),
        6
      );
    } else if (width > 600) {
      updateWidth(force, "Tablet", new Date(), 2);
    } else {
      updateWidth(force, "Mobile", new Date(), 0);
    }
  };

  // Width initial update
  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    checkWidth();
  }, [width]);

  // Update Shifts and Popular Times
  useEffect(() => {
    dispatch(getPopularTimes());
    checkWidth(true);
  }, [current.site]);

  // Date range
  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  return (
    <div>
      {permissions.includes("create_shifts") && (
        <FinancialBar dates={result} financialMode={financialMode} />
      )}

      {/* <Title name="Rota" subtitle="Manage your timesheet" /> */}

      <RotaActions
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        financialMode={financialMode}
        setFinancialMode={setFinancialMode}
        updateShifts={updateShifts}
        setSelectedDepartment={setSelectedDepartment}
        selectedDepartment={selectedDepartment}
      />
      <ShiftModal
        open={open}
        setOpen={setOpen}
        editShift={editShift}
        shiftFormInfo={shiftFormInfo}
      />
      <QuickAddEmployeeModal open={employeeOpen} setOpen={setEmployeeOpen} />
      <Loading active={isLoading} />

      <div>
        <div className="rota wrapper--md">
          {employees.map((employee, i) => (
            <div key={employee.id} className="rota__container">
              <Employee
                employee={employee}
                current_employee={false}
                shifts={[]}
                user={user}
                result={result}
                financialMode={financialMode}
              />
              <RotaEmployeeShifts
                result={result}
                employee={employee}
                financialMode={financialMode}
                setOpen={setOpen}
                setShiftFormInfo={setShiftFormInfo}
                setEditShift={setEditShift}
                showAvailabilities={showAvailabilities}
              />
            </div>
          ))}
          <button onClick={() => setEmployeeOpen(true)}>+ Add Employee</button>
        </div>
      </div>
    </div>
  );
};

export default Rota;
