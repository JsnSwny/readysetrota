import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import Title from "../../common/Title";
import {
  getTimeclocks,
  updateTimeclock,
  deleteTimeclock,
} from "../../../actions/timeclock";
import { getAllEmployees, getEmployees } from "../../../actions/employees";
import Select from "react-select";
import { toast } from "react-toastify";
import { startOfToday, format } from "date-fns";
import DateBubblePicker from "../../common/DateBubblePicker";
import TimeclockModal from "./TimeclockModal";
import { getShifts } from "../../../actions/shifts";
import TimeclockList from "./TimeclockList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeclockPage = () => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let forecast = useSelector((state) => state.employees.forecast);
  const timeclocks = useSelector((state) => state.shifts.timeclocks);
  const current = useSelector((state) => state.employees.current);
  const employees = useSelector((state) => state.employees.employees);

  const [selectedTimeclock, setSelectedTimeclock] = useState(false);
  const [newTimeclocks, setNewTimeclocks] = useState([]);
  const [open, setOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [updatingTimeclock, setUpdatingTimeclock] = useState(false);

  useEffect(() => {
    dispatch(getTimeclocks(currentDate));
    dispatch(
      getShifts(
        format(currentDate, "yyyy-MM-dd"),
        format(currentDate, "yyyy-MM-dd"),
        true
      )
    );
  }, [currentDate]);

  useEffect(() => {
    dispatch(
      getEmployees(
        format(currentDate, "yyyy-MM-dd"),
        format(currentDate, "yyyy-MM-dd")
      )
    );
  }, [current.site]);

  useEffect(() => {
    let temp = [...timeclocks];
    temp = temp.map((item) => {
      let nt = newTimeclocks.find((t) => t.id == item.id);
      if (nt && timeclockIsAltered(nt)) {
        return nt;
      } else {
        return item;
      }
    });

    setNewTimeclocks(temp);
  }, [timeclocks]);

  const employeeSelectList = [
    ...employees.map((item) => ({
      value: item,
      label: item.full_name,
    })),
  ];

  const handleChange = (i, property, value) => {
    var items = [...newTimeclocks];
    items[i] = { ...items[i], [property]: value };

    setNewTimeclocks(items);
  };

  const timeclockIsAltered = (obj) => {
    const originalObj = timeclocks.find((item) => item.id == obj.id);
    if (!originalObj || !obj) {
      return false;
    }
    return !(
      JSON.stringify({ ...obj, employee: obj.employee?.id, length: 0 }) ===
      JSON.stringify({
        ...originalObj,
        employee: originalObj.employee?.id,
        length: 0,
      })
    );
  };

  const submitTimeclock = (tc, idx) => {
    setUpdatingTimeclock(tc.id);
    dispatch(
      updateTimeclock(tc.id, {
        ...newTimeclocks[idx],
        employee_id: newTimeclocks[idx].employee.id,
      })
    );
  };

  return (
    <div className="wrapper--md">
      <Title
        name="Timesheet"
        subtitle="Manage your timesheets"
        customButtons={
          <>
            <DatePicker
              selected={currentDate}
              onChange={(date) => setCurrentDate(date)}
              className="form__input"
              dateFormat="MMMM do yyyy"
              maxDate={new Date()}
            />
            <button
              className="btn-3 ml-2"
              onClick={() => {
                setOpen(true);
              }}
            >
              + Add Timeclock
            </button>
          </>
        }
      />
      {confirmOpen && selectedTimeclock && (
        <ConfirmModal
          title={`Are you sure you want to delete this timeclock?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteTimeclock(selectedTimeclock.id));
          }}
        />
      )}

      <TimeclockModal
        open={open}
        setOpen={setOpen}
        extraInfo={{ currentDate, department: current.department }}
      />
      <div className="overflow-x-auto mb-16">
        <table className="listing listing-timesheet">
          <thead>
            <tr>
              <th>Employee </th>
              <th>Start Time</th>
              <th>Break</th>
              <th>End Time</th>
              <th className="right"></th>
            </tr>
          </thead>
          <tbody>
            <TimeclockList
              handleChange={handleChange}
              employeeSelectList={employeeSelectList}
              submitTimeclock={submitTimeclock}
              timeclockIsAltered={timeclockIsAltered}
              setSelectedTimeclock={setSelectedTimeclock}
              setConfirmOpen={setConfirmOpen}
              items={newTimeclocks}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeclockPage;
