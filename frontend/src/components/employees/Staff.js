import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
  deletePosition,
} from "../../actions/employees";
import AddStaff from "./AddStaff";
import Confirm from "../layout/Confirm";
import CreateShift from "../layout/CreateShift";
import UpdateDepartment from "../shifts/UpdateDepartment";

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [type, setType] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [positionID, setPositionID] = useState("");
  const [positionName, setPositionName] = useState("");
  const [staffPosition, setStaffPosition] = useState("");

  const [staffDepartment, setStaffDepartment] = useState("");

  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let employees = useSelector((state) => state.employees.employees);
  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  const dispatch = useDispatch();
  useEffect(() => {
    employees = dispatch(getEmployees());
    positions = dispatch(getPositions(true));
  }, []);

  useEffect(() => {
    employees = dispatch(getEmployees());
    positions = dispatch(getPositions(true));
  }, [currentDepartment]);

  var getEmployeesFromPosition = (position) =>
    employees.filter((obj) => {
      return obj.position.some((item) => item.name == position);
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
      <div className="dates__picker container">
        <UpdateDepartment />
      </div>

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
      <Confirm
        open={openPosition}
        onConfirm={() => {
          setOpenPosition(false);
          dispatch(deletePosition(positionID));
        }}
        message={`Are you sure you want to delete ${positionName}?`}
        onClose={() => {
          setOpenPosition(false);
        }}
      />

      <section className="staff">
        <h1 className="staff__title">
          {currentDepartment != 0 &&
            departments.filter((item) => item.id == currentDepartment)[0]
              .name}{" "}
          Staff
        </h1>
        <p
          onClick={() => {
            setOpenStaff(true);
            setType("Position");
          }}
          className="btn-1"
        >
          + Create Position
        </p>
        {addButtonToggle != false && <AddStaff form={addButtonToggle} />}
        <div className="staff__container">
          {positions.map((position) => (
            <Fragment>
              <div className="staff__positionContainer">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h1 className="staff__position">{position.name} </h1>
                  <div className="delete_icon">
                    <i
                      onClick={() => {
                        setOpenPosition(true);
                        setPositionID(position.id);
                        setPositionName(position.name);
                      }}
                      className="fas fa-trash"
                      style={{ color: "white", marginLeft: "20px" }}
                    ></i>
                  </div>
                </div>
                {/* <p
                  onClick={() => {
                    setOpenStaff(true);
                    setType("Staff");
                    setStaffPosition(position.id);
                  }}
                  className="staff__create"
                >
                  + Create Staff
                </p> */}
              </div>

              <div className="staff__employees">
                {getEmployeesFromPosition(position.name).length > 0 ? (
                  getEmployeesFromPosition(position.name).map((employee) => (
                    <Fragment>
                      <div
                        key={employee.id}
                        className="staff__employeeContainer"
                      >
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
            </Fragment>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Staff;
