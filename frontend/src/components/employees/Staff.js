import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import AddStaff from "./AddStaff";
import Confirm from "../layout/Confirm";

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let employees = useSelector((state) => state.employees.employees);
  let positions = useSelector((state) => state.employees.positions);

  const dispatch = useDispatch();
  useEffect(() => {
    employees = dispatch(getEmployees());
    positions = dispatch(getPositions());
  }, []);

  var getEmployeesFromPosition = (position) =>
    employees.filter((obj) => {
      return obj.position.name === position;
    });

  var setAddButton = (form) => {
    addButtonToggle != form
      ? setAddButtonToggle(form)
      : setAddButtonToggle(false);
  };

  return (
    <section className="staff">
      <Confirm
        open={open}
        onConfirm={() => {
          setOpen(false);
          dispatch(deleteEmployee(employeeID));
        }}
        message={`Are you sure you want to delete ${employeeName}?`}
        onClose={() => {
          setOpen(false);
        }}
      />
      <h1 className="title">Staff Members</h1>
      <div className="staff__buttons">
        <button
          onClick={() => {
            setAddButton("Staff");
          }}
          className={`btn-1 ${addButtonToggle == "Staff" ? " active" : ""}`}
        >
          Add Staff
        </button>
        <button
          onClick={() => {
            setAddButton("Department");
          }}
          className={`btn-1 ${
            addButtonToggle == "Department" ? " active" : ""
          }`}
        >
          Update Departments
        </button>
        <button
          onClick={() => {
            setAddButton("Position");
          }}
          className={`btn-1 ${addButtonToggle == "Position" ? " active" : ""}`}
        >
          Add Positions
        </button>
      </div>
      {addButtonToggle != false && <AddStaff form={addButtonToggle} />}
      {positions.map((position) => (
        <div key={position.id}>
          <h1 className="staff__position">{position.name}</h1>
          <div className="staff__employees">
            {getEmployeesFromPosition(position.name).length > 0 ? (
              getEmployeesFromPosition(position.name).map((employee) => (
                <div key={employee.id} className="staff__employee">
                  <p>{employee.name}</p>
                  <div className="staff__icons">
                    <i
                      onClick={() => {
                        setOpen(true);
                        setEmployeeID(employee.id);
                        setEmployeeName(employee.name);
                      }}
                      className="fas fa-trash"
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div>No Employees Found</div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Staff;
