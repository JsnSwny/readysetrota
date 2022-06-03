import React, { useState, useEffect, Fragment } from "react";
import { addShift, updateShift, deleteShift } from "../../actions/shifts";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ConfirmModal from "../layout/confirm/ConfirmModal";
import { getErrors } from "../../actions/errors";

const ShiftForm = ({ shiftFormInfo, setOpen, editShift }) => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [info, setInfo] = useState("");
  const [position, setPosition] = useState("");
  const [employee, setEmployee] = useState({
    label: shiftFormInfo.employee.full_name,
    value: shiftFormInfo.employee.id,
  });
  const [breakLength, setBreakLength] = useState({
    value: 0,
    label: "No break",
  });
  let popular_times = useSelector((state) => state.shifts.popular_times);
  let settings = useSelector(
    (state) => state.employees.current.site.sitesettings
  );
  let errors = useSelector((state) => state.errors.msg);
  const positions = useSelector((state) => state.employees.positions);
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    if (editShift) {
      setStartTime(
        hours.find((e) => {
          return e.value == editShift.start_time;
        })
      );
      setEndTime(
        hours.find((e) => {
          return e.value == editShift.end_time;
        })
      );
      setBreakLength(
        breaks.find((e) => {
          return e.value == editShift.break_length;
        })
      );
      if (editShift.position)
        setPosition(
          positionOptions.find((e) => {
            return e.value == editShift.position.id;
          })
        );
      setInfo(editShift.info);
    }
  }, [editShift]);

  const onSubmit = (e) => {
    e.preventDefault();

    let error_obj = {
      start_time: startTime.value ? true : "This field is required",
      end_time: endTime.value ? true : "This field is required",
    };

    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      const shiftObj = {
        employee_id: employee.value,
        start_time: startTime.value,
        end_time: endTime.value,
        break_length: breakLength.value,
        date: shiftFormInfo.date,
        stage: "Unpublished",
        info,
        position_id: position.value,
        department_id: shiftFormInfo.shiftDepartment,
      };

      console.log(shiftObj);

      editShift
        ? dispatch(updateShift(editShift.id, shiftObj))
        : dispatch(addShift(shiftObj));

      setOpen(false);
    }
  };

  let minutes = ["00"];
  if (settings.time_increment > 0) {
    while (minutes[minutes.length - 1] + settings.time_increment < 60) {
      minutes.push(
        parseInt(minutes[minutes.length - 1]) +
          parseInt(settings.time_increment)
      );
    }
  }

  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (
      i.toString().length == 1
        ? minutes.map((minute) =>
            hours.push({
              value: `0${i.toString()}:${minute}`,
              label: `0${i.toString()}:${minute}`,
            })
          )
        : minutes.map((minute) =>
            hours.push({
              value: `${i.toString()}:${minute}`,
              label: `${i.toString()}:${minute}`,
            })
          )
    );
  }

  let endHours = [...hours, { value: "Finish", label: "Finish" }];

  const employeeOptions = employees.map((item) => ({
    label: item.full_name,
    value: item.id,
  }));

  const positionOptions = positions.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  //   hours = hours.filter((item) => timeInRange(item));

  const breaks = [
    { label: "No break", value: 0 },
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "1 hour", value: 60 },
    { label: "1hr 15mins", value: 75 },
    { label: "1hr 30mins", value: 90 },
    { label: "1hr 45mins", value: 105 },
    { label: "2 hours", value: 120 },
  ];

  return (
    <Fragment>
      {confirmOpen && (
        <ConfirmModal
          title={`Are you sure you want to delete this shift? The associated timeclock will be deleted as well`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteShift(editShift.id));
            setOpen(false);
          }}
        />
      )}
      <form onSubmit={onSubmit} className="form__form shift-form">
        <div className="flex-container--between form__wrapper">
          <div className="form__control--third">
            <label className="form__label">Start Time*:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setStartTime}
              options={hours}
              autoFocus
              placeholder={"Select start time"}
              value={startTime}
            />
            <p className="error">{errors.start_time}</p>
          </div>
          <div className="form__control--third">
            <label className="form__label">Break:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setBreakLength}
              options={breaks}
              placeholder={"Select break length"}
              value={breakLength}
            />
          </div>
          <div className="form__control--third">
            <label className="form__label">End Time*:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setEndTime}
              options={endHours}
              placeholder={"Select end time"}
              value={endTime}
            />
            <p className="error">{errors.end_time}</p>
          </div>
        </div>
        {popular_times.length > 0 && (
          <ul className="tag-container--sm">
            {popular_times.map((item, i) => (
              <li
                key={i}
                className="tag clickable"
                onClick={() => {
                  setStartTime({
                    value: item.start_time,
                    label: item.start_time,
                  });
                  setEndTime({ value: item.end_time, label: item.end_time });
                  setBreakLength({
                    value: item.break_length,
                    label: breaks.find(
                      (breakItem) => breakItem.value == item.break_length
                    ).label,
                  });
                }}
              >
                {item.start_time} - {item.end_time}{" "}
                {item.break_length > 0 && `(${item.break_length})`}
              </li>
            ))}
          </ul>
        )}

        <div className="flex-container--between form__wrapper">
          <div className="form__control--half">
            <label className="form__label">Employee*:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setEmployee}
              options={employeeOptions}
              placeholder={"Select employee"}
              value={employee}
            />
            <p className="error">{errors.start_time}</p>
          </div>
          <div className="form__control--half">
            <label className="form__label">Shift Role:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setPosition}
              options={positionOptions}
              placeholder={"Select shift role"}
              value={position}
            />
          </div>
        </div>
        <div className="form__control">
          <label className="form__label">Info:</label>
          <textarea
            className="form__input textarea"
            type="text"
            name="info"
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            rows="2"
          ></textarea>
        </div>
        <hr />
        <div
          className={`${
            editShift
              ? "shift-form__buttons flex-container--between"
              : "flex-container--end"
          }`}
        >
          <button className="btn-3" type="submit" value="Add Shift">
            {editShift ? "Save" : "Add Shift"}
          </button>
          {editShift && (
            <button
              className="btn-3 btn-3--red"
              value="Delete Shift"
              onClick={() => setConfirmOpen(true)}
              type="button"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default ShiftForm;
