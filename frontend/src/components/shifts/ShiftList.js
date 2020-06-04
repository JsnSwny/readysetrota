import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { getEmployees } from "../../actions/employees";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import Dates from "./Dates";
import CreateShift from "../layout/CreateShift";

const ShiftList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [shiftDate, setShiftDate] = useState("");
  const [type, setType] = useState(false);
  const [uuid, setUUID] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  let user = useSelector((state) => state.auth.user);
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  useEffect(() => {
    dispatch(getEmployees());

    shifts_list = dispatch(getShifts(date, enddate));
  }, []);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate);
    }
  }, [shifts_list]);

  employees = useSelector((state) => state.employees.employees);
  if (user && user.profile.role == "User") {
    employees = employees.filter(
      (employee) => employee.id !== user.employee[0].id
    );
    user.employee.push;
    employees.unshift(user.employee[0]);
  }

  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date) =>
    shifts_list.filter((obj) => {
      return obj.employee.id === employee && obj.date === date;
    });

  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const filterEmployees = (date) => {
    let employeesOnDay = shifts_list.filter((obj) => {
      return obj.date == date;
    });
    let newEmployees = [];
    employeesOnDay.map((obj) => {
      !newEmployees.some((item) => item.id === obj.employee.id) &&
        newEmployees.push(obj.employee);
    });
    employees.map((obj) => {
      !newEmployees.some((item) => item.id === obj.id) &&
        newEmployees.push(obj);
    });
    setEmployeesList(newEmployees);
    setFilterDate(date);
  };

  return (
    <Fragment>
      <CreateShift
        open={open}
        type={type}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        employeeID={employeeID}
        employeeName={employeeName}
        date={shiftDate}
      />
      <Dates filterEmployees={filterEmployees} dates={result} />
      {isLoading && (
        <div className="shiftsloading">
          <span className="loader"></span>
        </div>
      )}
      <div className="addStaffBtn__container">
        <button
          onClick={() => {
            setOpen(true);
            setType("Staff");
          }}
          className="btn-1 addStaffBtn"
        >
          + Staff Member
        </button>
      </div>
      <div className="shiftList">
        {employeesList.map((employee) => (
          <div key={employee.id} className="rota__container">
            <div className="employee__container">
              <div
                className={`employee__wrapper ${
                  user.profile.role == "User" &&
                  user.employee[0].id == employee.id
                    ? " active"
                    : ""
                }`}
              >
                <p className="employee__position">{employee.position.name}</p>
                <p className="employee__name">
                  {employee.name.split(" ")[0]}
                  <span className="employee__surname">
                    {" "}
                    {employee.name.split(" ")[1]}
                  </span>
                  {user.profile.role == "Business" && !employee.user && (
                    <Fragment>
                      <i
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={(e) => {
                          copyToClipboard(employee.uuid);
                          setUUID(employee.uuid);
                        }}
                        class="fas fa-clipboard"
                      ></i>
                      <span
                        className={`employee__copied ${
                          uuid == employee.uuid ? " copied" : ""
                        }`}
                      >
                        UUID Copied!
                      </span>
                    </Fragment>
                  )}
                </p>
                {/* <p className="employee__hours">30 Hours</p> */}
              </div>
            </div>
            <div className="shift__container">
              {result.map((result) =>
                getEmployeeShift(employee.id, format(result, "YYY-MM-dd"))
                  .length > 0 ? (
                  <div
                    className={`shift__shift ${
                      filterDate == format(result, "YYY-MM-dd")
                        ? "filtered"
                        : ""
                    }`}
                  >
                    {user.profile.role == "Business" && (
                      <span
                        onClick={() => {
                          setOpen(true);
                          setType("shift");
                          setEmployeeID(employee.id);
                          setEmployeeName(employee.name);
                          setShiftDate(format(result, "YYY-MM-dd"));
                        }}
                        style={{ color: "white" }}
                        className="shift__add"
                      >
                        +
                      </span>
                    )}
                    {getEmployeeShift(
                      employee.id,
                      format(result, "YYY-MM-dd")
                    ).map((shift) => (
                      <div className="shift__wrapper">
                        <p className="shift__time">
                          {shift.start_time.substr(0, 5)} - {shift.end_time}{" "}
                        </p>
                        {shift.info && (
                          <p className="shift__info">
                            <i class="fas fa-info-circle"></i>
                            {shift.info}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    key={result}
                    className={`shift__shift shift__shift-noshift ${
                      filterDate == format(result, "YYY-MM-dd")
                        ? "filtered"
                        : ""
                    }`}
                  >
                    {user.profile.role == "Business" && (
                      <span
                        onClick={() => {
                          setOpen(true);
                          setType("shift");
                          setEmployeeID(employee.id);
                          setEmployeeName(employee.name);
                          setShiftDate(format(result, "YYY-MM-dd"));
                        }}
                        className="shift__add"
                      >
                        +
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ShiftList;
