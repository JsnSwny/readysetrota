import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDailyShifts, deleteShift } from "../../actions/shifts";
import { format, parseISO, addHours } from "date-fns";
import AddShift from "./AddShift";
import Confirm from "../layout/Confirm";

const Shifts = () => {
  let { date } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyShifts(date));
  }, []);

  const [open, setOpen] = useState(false);
  const [shiftID, setShiftID] = useState("");
  const [shiftEmployee, setShiftEmployee] = useState("");
  const [shiftTime, setShiftTime] = useState("");

  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let shifts = useSelector((state) => state.shifts.daily_shifts);
  let hours = [];
  for (let i = 0; i <= 24; i++) {
    i.toString().length == 1
      ? hours.push("0" + i.toString())
      : hours.push(i.toString());
  }

  var getEmployeeShift = (employee) =>
    shifts.filter((obj) => {
      return obj.start_time.substr(0, 2) === employee;
    });

  return (
    <div class="shiftDetail">
      <Confirm
        open={open}
        onConfirm={() => {
          setOpen(false);
          dispatch(deleteShift(shiftID));
        }}
        message={`Are you sure you want to delete ${shiftEmployee}'s Shift (${shiftTime})?`}
        onClose={() => {
          setOpen(false);
        }}
      />
      <h1 className="title">Edit Rota</h1>
      <p className="subtitle">{format(parseISO(date), "cccc do MMMM YYY")}</p>
      <div className="shiftDetail__buttons">
        <button
          onClick={() => {
            setAddButtonToggle(!addButtonToggle);
          }}
          className={`btn-1 ${addButtonToggle == true ? " active" : ""}`}
        >
          Create Shift
        </button>
      </div>
      {addButtonToggle == true && <AddShift date={date} />}
      {hours.map((hour) => (
        <div>
          {getEmployeeShift(hour).length > 0 && (
            <div className="shiftDetail__timeContainer">
              <h1 className="shiftDetail__time">
                {format(new Date().setHours(hour), "haaaaa'm'")} -{" "}
                {format(addHours(new Date().setHours(hour), 1), "haaaaa'm'")}
              </h1>
              <div className="shiftDetail__container">
                {getEmployeeShift(hour).map((shift) => (
                  <div className="shiftDetail__shift">
                    <div className="shiftDetail__topContainer">
                      <p className="shiftDetail__employee">
                        {shift.employee.name.split(" ")[0]}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {shift.employee.name.split(" ")[1]}
                        </span>
                      </p>
                      <div className="delete_icon">
                        <i
                          onClick={() => {
                            setOpen(true);
                            setShiftID(shift.id);
                            setShiftEmployee(shift.employee.name);
                            setShiftTime(
                              `${shift.start_time.substr(0, 5)} - ${
                                shift.end_time
                              }`
                            );
                          }}
                          className="fas fa-trash"
                        ></i>
                      </div>
                    </div>
                    <div className="shiftDetail__shiftTime">
                      <h2>
                        {shift.start_time.substr(0, 5)} - {shift.end_time}
                      </h2>
                      <p>{shift.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Shifts;
