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
import RotaEmployees from "./RotaEmployees";
import RotaDepartmentList from "./RotaDepartmentList";
import ShiftModal from "./ShiftModal";

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

  const [showAvailabilities, setShowAvailabilities] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("");
  const [financialMode, setFinancialMode] = useState("predicted");
  const [open, setOpen] = useState(false);
  const [editShift, setEditShift] = useState(false);
  const [shiftFormInfo, setShiftFormInfo] = useState(false);

  // Update Shifts
  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(current.site.id, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
    dispatch(getForecast(start_date, end_date));
    dispatch(getEmployees(start_date, end_date));
  };

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

      <div className="title-banner">
        <div className="wrapper--md">
          <h1>Rota</h1>
        </div>
      </div>

      <RotaActions
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        financialMode={financialMode}
        setFinancialMode={setFinancialMode}
        updateShifts={updateShifts}
      />
      <ShiftModal
        open={open}
        setOpen={setOpen}
        editShift={editShift}
        shiftFormInfo={shiftFormInfo}
        editShift={editShift}
      />
      {isLoading && <Loading />}

      <div>
        <div className="rota wrapper--md">
          {departments.map((department, i) => (
            <div className="rota__department">
              <RotaDepartmentList department={department} result={result} />
              {positions.map(
                (position) =>
                  position.department.id == department.id &&
                  employees.filter((employee) =>
                    employee.position.includes(position.id)
                  ).length > 0 && (
                    <Fragment>
                      <h4 className="rota__position">{position.name}</h4>
                      <RotaEmployees
                        department={department}
                        position={position}
                        result={result}
                        financialMode={financialMode}
                        showAvailabilities={showAvailabilities}
                        setOpen={setOpen}
                        setShiftFormInfo={setShiftFormInfo}
                        setEditShift={setEditShift}
                      />
                    </Fragment>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rota;
