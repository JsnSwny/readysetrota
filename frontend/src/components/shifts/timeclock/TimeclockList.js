import React from "react";
import Select from "react-select";

const TimeclockList = ({
  employeeSelectList,
  handleChange,
  submitTimeclock,
  timeclockIsAltered,
  setConfirmOpen,
  setSelectedTimeclock,
  items,
}) => {
  return items.map((item, idx) => (
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
            return e.value.id == item.employee?.id;
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
          onKeyDown={(e) => e.key == "Enter" && submitTimeclock(item, idx)}
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
          onKeyDown={(e) => e.key == "Enter" && submitTimeclock(item, idx)}
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
          onKeyDown={(e) => e.key == "Enter" && submitTimeclock(item, idx)}
        />
      </td>
      <td className="right">
        <div className="action-sm">
          <i
            className={`fas fa-check listing-timesheet__save ${
              timeclockIsAltered(item) && "show"
            }`}
            onClick={() => {
              submitTimeclock(item, idx);
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
  ));
};

export default TimeclockList;
