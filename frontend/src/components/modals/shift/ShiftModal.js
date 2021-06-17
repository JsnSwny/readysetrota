import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, deleteShift, updateShift } from "../../../actions/shifts";
import { toast } from "react-toastify";
import PositionField from "../../employees/PositionField";
import { getErrors } from "../../../actions/errors";
import ShiftDetails from "./tabs/ShiftDetails";
import ExtraInfo from "./tabs/ExtraInfo";
import Absence from "./tabs/Absence";
import Positions from "../Positions";
import Timeclock from "./tabs/Timeclock";
import useref from "gulp-useref";
import Tab from "../Tab";
import { parseISO } from "date-fns";

const ShiftModal = (props) => {
  const { date, employee, onClose, update } = props;
  let updating = update ? true : false;

  let current = useSelector((state) => state.employees.current);
  const [position, setPosition] = useState([]);
  let departments = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.all_positions);
  let sites = useSelector((state) => state.employees.sites);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  let user = useSelector((state) => state.auth.user);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");
  const [shiftEmployee, setShiftEmployee] = useState(
    employee ? employee.id : ""
  );
  const [breakLength, setBreakLength] = useState(0);
  const [absence, setAbsence] = useState("None");
  const [absenceInfo, setAbsenceInfo] = useState("");
  const [currentTab, setCurrentTab] = useState("Shift Details");

  const [startTimeClock, setStartTimeClock] = useState("");
  const [endTimeClock, setEndTimeClock] = useState("");
  const [breakLengthClock, setBreakLengthClock] = useState(0);

  let error_obj = {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (update) {
      setStartTime(update.start_time);
      setEndTime(update.end_time);
      setInfo(update.info);
      setPosition(
        update.positions.map((item) => positions.find((pos) => pos.id == item))
      );
      setBreakLength(update.break_length);
      setAbsence(update.absence);
      setAbsenceInfo(update.absence_info);

      if (update.timeclock) {
        setStartTimeClock(update.timeclock.clock_in);
        setEndTimeClock(update.timeclock.clock_out);
        setBreakLengthClock(update.timeclock.break_length);
      }
    }
  }, [update]);

  const compareShift = (shift1, shift2) => {
    return (
      shift1.start_time == shift2.start_time &&
      shift1.end_time == shift2.end_time &&
      shift1.absence == shift2.absence &&
      shift1.info == shift2.info &&
      shift1.break_length == shift2.break_length &&
      shift1.employee.id == shift2.employee_id &&
      (shift2.position_id.length > 0 || shift1.positions.length > 0
        ? shift1.positions == shift2.positions
        : true) &&
      shift1.timeclock == shift2.timeclock
    );
  };

  const isUpdated = () => {
    if (parseISO(update.date) < new Date()) {
      return false;
    }
    if (
      startTime == update.start_time &&
      endTime == update.end_time &&
      info == update.info
    ) {
      if (update.stage == "Published") {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const shiftObj = {
      employee_id: shiftEmployee ? shiftEmployee : null,
      start_time: startTime,
      end_time: endTime,
      info,
      date: update ? update.date : date,
      break_length: breakLength,
      absence: absence,
      absence_info: absenceInfo,
      open_shift: shiftEmployee ? false : true,
      department_id: current.department.id,
      stage: shiftEmployee
        ? isUpdated()
          ? !settings.shift_approval || user.business
            ? "Unpublished"
            : "Creation"
          : "Published"
        : "Published",
      position_id: shiftEmployee ? [] : position.map((pos) => pos.id),
      timeclock:
        startTimeClock && endTimeClock
          ? {
              clock_in: startTimeClock,
              clock_out: endTimeClock,
              break_length: breakLengthClock,
              employee_id: shiftEmployee ? shiftEmployee : null,
            }
          : undefined,
    };
    error_obj = {
      start_time: startTime != "" ? true : "This field is required",
      end_time: endTime != "" ? true : "This field is required",
      positions: shiftEmployee
        ? true
        : position.length > 0
        ? true
        : "You must select at least one position",
    };
    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      update
        ? compareShift(update, shiftObj)
          ? ""
          : dispatch(updateShift(update.id, shiftObj))
        : dispatch(addShift(shiftObj));

      setStartTime("");
      setEndTime("");
      setInfo("");
      onClose();
      updating
        ? toast.success("Shift updated!")
        : toast.success("Shift added!");
    } else {
      toast.warn("Form incomplete, check for errors");
    }
  };

  const deleteShiftByID = (id) => {
    dispatch(deleteShift(id));
  };

  let shiftDetailsProps = {
    employee,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    shiftEmployee,
    setShiftEmployee,
    breakLength,
    setBreakLength,
  };

  let timeClockProps = {
    startTimeClock,
    setStartTimeClock,
    endTimeClock,
    setEndTimeClock,
    breakLengthClock,
    setBreakLengthClock,
  };

  let currentTabProps = {
    setCurrentTab,
    currentTab,
  };

  const renderSwitch = () => {
    switch (currentTab) {
      case "Shift Details":
        return <ShiftDetails {...shiftDetailsProps} />;
      case "Extra Info":
        return <ExtraInfo info={info} setInfo={setInfo} />;
      case "Absence":
        return (
          <Absence
            update={update}
            absence={absence}
            setAbsence={setAbsence}
            absenceInfo={absenceInfo}
            setAbsenceInfo={setAbsenceInfo}
          />
        );
      case "Positions":
        return (
          <Positions
            position={position}
            setPosition={setPosition}
            many={true}
            shift={update}
          />
        );
      case "Timeclock":
        return <Timeclock {...timeClockProps} />;
      default:
        return "Invalid Tab";
    }
  };

  return (
    <div className="form">
      <div className="form__image">
        <i className="fas fa-briefcase"></i>
      </div>
      <p className="form__subheading">Rota Management</p>
      <h1 className="form__heading">
        {update ? "Update Shift" : "Create Shift"}
      </h1>
      <div className="flex-container--center form__tabs">
        <Tab title="Shift Details" {...currentTabProps} />
        <Tab title="Extra Info" {...currentTabProps} />
        {current.business.plan != "F" && (
          <Tab title="Timeclock" {...currentTabProps} />
        )}

        {employee && update && update.stage == "Published" && (
          <Tab title="Absence" {...currentTabProps} />
        )}
        {!employee && <Tab title="Positions" {...currentTabProps} />}
      </div>
      <form onSubmit={onSubmit} className="form__form">
        {renderSwitch()}
        <div className="flex-container--between form__actions">
          <button className="form__save" type="submit">
            Save
          </button>
          <button
            onClick={() => {
              update ? deleteShiftByID(update.id) : onClose();
            }}
            className="form__delete"
          >
            {update ? "Delete" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftModal;
