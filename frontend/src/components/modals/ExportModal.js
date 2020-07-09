import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getPositions,
  getDepartments,
  addDepartment,
  addPosition,
} from "../../actions/employees";
import { contextType } from "react-modal";

const AddStaff = (props) => {
  const { onClose, form, staffPosition } = props;

  let positions = useSelector((state) => state.employees.positions);
  let errors = useSelector((state) => state.errors.msg);
  let departments = useSelector((state) => state.employees.departments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (form == "Staff") {
      positions = dispatch(getPositions());
      staffPosition && setPosition(staffPosition.toString());
    }
  }, []);

  // Disable Positions in Department of already selected positions
  const getDepartment = (id) => {
    let department = positions.filter((item) => item.id == id)[0].department.id;
    let positionsInDepartment = positions
      .filter((item) => item.department.id == department && item.id != id)
      .map((pos) => pos.id);
    for (let i = 0; i < position.length; i++) {
      if (positionsInDepartment.includes(parseInt(position[i]))) {
        return true;
      }
    }
    return false;
  };

  // Prevent Shift Clicking to Select More Positions
  const checkDepartment = (arr) => {
    let obj = {};
    let department_list = departments.map((item) => item.id);
    let position_list = positions.filter((item) =>
      arr.includes(item.id.toString())
    );
    for (const key of department_list) {
      let test = position_list
        .filter((item) => {
          return item.department.id == key;
        })
        .map((pos) => pos.id);
      obj[key] = test;
    }
    for (let key in obj) {
      if (obj[key].length > 1) {
        return false;
      }
    }
    return true;
  };

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  return (
    <Fragment>
      <div className="staffForm">
        <h1 style={{ fontSize: "28px", textAlign: "center" }}>Create {form}</h1>
        <form onSubmit={onSubmit} className="staffForm__form">
          <div className="staffForm__control">
            <label className="staffForm__label">Start Date:</label>
            <input
              className="staffForm__input"
              type="date"
              name="start_date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            ></input>
          </div>
          <div className="staffForm__control">
            <label className="staffForm__label">End Date:</label>
            <input
              className="staffForm__input"
              type="date"
              name="end_date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            ></input>
          </div>
          <div className="staffForm__buttons">
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-1"
              style={{ backgroundColor: "#d05b5b" }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-1">
              Export
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddStaff;
