import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, deleteShift, updateShift } from "../../actions/shifts";
import { toast } from "react-toastify";
import PositionField from "../employees/PositionField";
import { getErrors } from "../../actions/errors";
import ShiftDetails from "./ShiftDetails";
import ExtraInfo from "./ExtraInfo";
import Absence from "./Absence";
import Positions from "./Positions";

const ShiftModal = (props) => {
  const { date, employee, onClose, update } = props;
  let updating = update ? true : false;

  let current = useSelector((state) => state.employees.current);
  const [position, setPosition] = useState([]);
  let departments = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.all_positions);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");
  const [openEmployee, setOpenEmployee] = useState("");
  const [shiftEmployee, setShiftEmployee] = useState(
    employee ? employee.id : ""
  );
  const [breakLength, setBreakLength] = useState(0);
  const [absence, setAbsence] = useState("None");
  const [absenceInfo, setAbsenceInfo] = useState("");
  const [currentTab, setCurrentTab] = useState("Shift Details");

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
    }
  }, [update]);

  const compareShift = (shift1, shift2) => {
    return (
      shift1.start_time == shift2.start_time &&
        shift1.end_time == shift2.end_time &&
        shift1.absence == shift2.absence,
      shift1.info == shift2.info &&
        shift1.employee_id == shift2.employee_id &&
        (shift2.position_id.length > 0 || shift1.positions.length > 0
          ? shift1.positions == shift2.positions
          : true)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const shiftObj = {
      employee_id: shiftEmployee
        ? shiftEmployee
        : openEmployee
        ? openEmployee
        : null,
      start_time: startTime,
      end_time: endTime,
      info,
      date: update ? update.date : date,
      break_length: breakLength,
      absence: absence,
      absence_info: absenceInfo,
      department_id: current.department,
      stage: shiftEmployee || openEmployee ? "Creation" : "Published",
      position_id: shiftEmployee ? [] : position.map((pos) => pos.id),
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
    openEmployee,
    setOpenEmployee,
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
        <button
          onClick={() => setCurrentTab("Shift Details")}
          className={`btn-8 ${currentTab == "Shift Details" ? "active" : ""}`}
        >
          Shift Details
        </button>
        <button
          onClick={() => setCurrentTab("Extra Info")}
          className={`btn-8 ${currentTab == "Extra Info" ? "active" : ""}`}
        >
          Extra Info
        </button>
        {update && (
          <button
            onClick={() => setCurrentTab("Absence")}
            className={`btn-8 ${currentTab == "Absence" ? "active" : ""}`}
          >
            Absence
          </button>
        )}
        {!employee && (
          <button
            onClick={() => setCurrentTab("Positions")}
            className={`btn-8 ${currentTab == "Positions" ? "active" : ""}`}
          >
            Positions
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className="form__form">
        {currentTab == "Shift Details" && (
          <ShiftDetails {...shiftDetailsProps} />
        )}
        {currentTab == "Extra Info" && (
          <ExtraInfo info={info} setInfo={setInfo} />
        )}
        {currentTab == "Absence" && (
          <Absence
            update={update}
            absence={absence}
            setAbsence={setAbsence}
            absenceInfo={absenceInfo}
            setAbsenceInfo={setAbsenceInfo}
          />
        )}

        {currentTab == "Positions" && !employee && (
          <Positions
            position={position}
            setPosition={setPosition}
            many={true}
            shift={update}
          />
          // <div className="form__control">
          //   <label className="form__label">Position(s):</label>
          //   <PositionField
          //     many={true}
          //     shift={update}
          //     departments={departments}
          //     position={position}
          //     setPosition={setPosition}
          //     positions={positions}
          //   />
          // </div>
        )}
        <div className="flex-container--between form__actions">
          <button
            onClick={() => {
              update ? deleteShiftByID(update.id) : onClose();
            }}
            className="form__delete"
          >
            {update ? "Delete" : "Cancel"}
          </button>
          <button className="form__save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftModal;
