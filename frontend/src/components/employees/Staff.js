import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import AddStaff from "./AddStaff";
import Confirm from "../layout/Confirm";
import CreateShift from "../layout/CreateShift";

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [type, setType] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [staffDepartment, setStaffDepartment] = useState("");

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

  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  return (
    <Fragment>
      <CreateShift
        open={openStaff}
        type={type}
        onConfirm={() => {
          setOpenStaff(false);
        }}
        onClose={() => {
          setOpenStaff(false);
        }}
        staffPosition={staffPosition}
        staffDepartment={staffDepartment}
      />
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
      <section className="staff">
        <h1 className="staff__title">Staff Management</h1>
        <select className="staffForm__input">
          <option value="Floor">Floor</option>
        </select>
        <p
          style={{ textAlign: "center" }}
          onClick={() => {
            setOpenStaff(true);
            setType("Position");
          }}
          className=""
        >
          + Create Department
        </p>
        {addButtonToggle != false && <AddStaff form={addButtonToggle} />}
        {positions.map((position) => (
          <div className="staff__container" key={position.id}>
            <div className="staff__positionContainer">
              <h1 className="staff__position">{position.name} </h1>
              <p
                onClick={() => {
                  setOpenStaff(true);
                  setType("Staff");
                  setStaffPosition(position.id);
                }}
                className="staff__create"
              >
                + Create Staff
              </p>
            </div>

            <div className="staff__employees">
              {getEmployeesFromPosition(position.name).length > 0 ? (
                getEmployeesFromPosition(position.name).map((employee) => (
                  <Fragment>
                    <div key={employee.id} className="staff__employeeContainer">
                      <div className="staff__employee">
                        <p>{employee.name}</p>
                        <div className="delete_icon">
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
                    </div>
                  </Fragment>
                ))
              ) : (
                <div>No Employees Found</div>
              )}
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};

export default Staff;
