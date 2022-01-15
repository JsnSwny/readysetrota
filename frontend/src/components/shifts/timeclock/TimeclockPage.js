import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import Title from "../../common/Title";
import {
  getTimeclocks,
  updateTimeclock,
  deleteTimeclock,
} from "../../../actions/timeclock";
import { getEmployees } from "../../../actions/employees";
import Select from "react-select";
import { toast } from "react-toastify";
import { startOfToday, format } from "date-fns";
import DateBubblePicker from "../../common/DateBubblePicker";
import TimeclockModal from "./TimeclockModal";

const TimeclockPage = () => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const timeclocks = useSelector((state) => state.shifts.timeclocks);
  const current = useSelector((state) => state.employees.current);
  const employees = useSelector((state) => state.employees.employees);

  const [selectedTimeclock, setSelectedTimeclock] = useState(false);
  const [newTimeclocks, setNewTimeclocks] = useState([]);
  const [open, setOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(startOfToday());

  useEffect(() => {
    dispatch(getTimeclocks(currentDate));
  }, [currentDate]);

  useEffect(() => {
    setNewTimeclocks([...timeclocks]);
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
    console.log(obj);
    console.log(originalObj);
    return !(JSON.stringify(obj) === JSON.stringify(originalObj));
  };

  return (
    <div className="wrapper--md">
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

      <div className="banner">
        <Title name="Timesheet" breakWord={false} />
      </div>
      <h2>{format(currentDate, "do MMMM yyyy")}</h2>
      <div className="list-banner">
        <DateBubblePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <div className="list-banner__right">
          <button
            className="btn-3"
            onClick={() => {
              setOpen(true);
            }}
          >
            + Add Timeclock
          </button>
        </div>
      </div>

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
          {newTimeclocks.map((item, idx) => {
            return (
              <tr className="listing__row listing-timesheet">
                <td>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select-table"
                    onChange={(e) => {
                      handleChange(idx, "employee", e.value);
                    }}
                    options={employeeSelectList}
                    autoFocus
                    value={employeeSelectList.filter((e) => {
                      return e.value.id == item.employee.id;
                    })}
                  />
                </td>
                <td>
                  <input
                    className="input--table"
                    type="text"
                    value={item.clock_in}
                    onChange={(e) => {
                      handleChange(idx, "clock_in", e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    className="input--table"
                    type="number"
                    value={item.break_length}
                    onChange={(e) => {
                      handleChange(idx, "break_length", e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    className="input--table"
                    type="text"
                    value={item.clock_out}
                    onChange={(e) => {
                      handleChange(idx, "clock_out", e.target.value);
                    }}
                  />
                </td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      className={`fas fa-check listing-timesheet__save ${
                        timeclockIsAltered(item) && "show"
                      }`}
                      onClick={() => {
                        dispatch(
                          updateTimeclock(item.id, {
                            ...newTimeclocks[idx],
                            employee_id: newTimeclocks[idx].employee.id,
                          })
                        );
                        toast.success("Updated");
                      }}
                    ></i>

                    <i
                      class="fas fa-trash"
                      onClick={() => {
                        setSelectedTimeclock(item);
                        setConfirmOpen(true);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimeclockPage;
