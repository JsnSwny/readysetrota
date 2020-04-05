import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import AddStaff from "./AddStaff";

const Staff = () => {
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
                <div>
                  <p
                    key={employee.id}
                    className="staff__employee"
                    onClick={() => {
                      dispatch(deleteEmployee(employee.id));
                    }}
                  >
                    {employee.name}
                  </p>
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
