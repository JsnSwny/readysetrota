import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import { getEmployees, getAllAvailability, getSites, getDepartments, getPositions } from "../../actions/employees";
import { format, parseISO, eachDayOfInterval, addDays, getDay } from "date-fns";
import Dates from "./Dates";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import Employee from "./Employee";
import { Redirect } from "react-router-dom";
import ShiftTemplate from "./ShiftTemplate";
import RotaBar from "./RotaBar";
import NoShift from "./NoShift";
import Shift from "./Shift";
import OpenShifts from "./OpenShifts";

const Rota = ({modalProps, confirmProps}) => {
  const dispatch = useDispatch();

  // State Selectors
  let user = useSelector((state) => state.auth.user);
  let business = useSelector((state) => state.employees.business);
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let availability = useSelector((state) => state.employees.availability);
  let positions = useSelector((state) => state.employees.positions)
  let loading = useSelector((state) => state.loading);
  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let current = useSelector((state) => state.employees.current);
  let width = useSelector((state) => state.responsive.width);
  let siteAdmin = useSelector((state) => state.employees.site_admin);

  // Use State
  const [employeesList, setEmployeesList] = useState(employees);
  const [filterDate, setFilterDate] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");
  const [showAvailabilities, setShowAvailabilities] = useState(false);
  const [template, setTemplate] = useState(false);
  const [limit, setLimit] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  

  // Update Shifts
  const updateShifts = (start_date, end_date) => {
    dispatch(getAllAvailability(current.site, start_date, end_date));
    dispatch(getShifts(start_date, end_date));
  };

  // Set Current Employee
  let current_employee = null;
  if (user.employee) {
    current_employee = user.employee.filter((employee) =>
      employee.position.some((item) => item.department.id == current.department)
    )[0];
  }

  // Update shifts based on width
  const widthUpdate = (force=false) => {
    let currentDate = format(new Date(), "yyyy-MM-dd");
    if (width > 1200) {
      if (currentDevice != "Desktop" || force) {
        updateShifts(date, format(addDays(parseISO(date, "dd-MM-yyyy"), 6), "yyyy-MM-dd"));
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet" || force) {
        updateShifts(currentDate, format(addDays(new Date(), 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile" || force) {
        updateShifts(currentDate, currentDate);
        setCurrentDevice("Mobile");
      }
    }
  };

  // Width initial update
  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    widthUpdate();
  }, [width]);

  // Update Shifts and Popular Times
  useEffect(() => {
    if(current.department > 0 && current.site > 0) {
      dispatch(getPopularTimes());
      widthUpdate(true);
    }
  }, [current.department, current.site]);

  // Initialise employee list
  useEffect(() => {
    if (user && !user.business && current_employee) {
      if (employees.length > 0) {
        employees = employees.filter(
          (employee) => employee.id !== current_employee.id
        );
        employees.unshift(current_employee);
      }
    }
    setEmployeesList(employees);
    if (employees.length > business.total_employees) {
      let num = employees.length - business.total_employees;
      let id_list = employees
        .map((item) => item.id)
        .sort()
        .reverse();

      setLimit(id_list[num]);
    }
  }, [employees]);

  // Filter employees after shift update
  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate, true);
    }
  }, [shifts_list]);

  // Date range
  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });
  
  var getEmployeeShift = (employee, date) =>
    shifts_list.filter((obj) => {
      return obj.employee === employee && obj.date === date
        ? siteAdmin
          ? !obj.published || obj.published
          : obj.published
        : "";
    });

  const filterEmployees = (date, update = false) => {
    if (filterDate == date && update == false) {
      setFilterDate("");
      setEmployeesList(employees);
      return true;
    }
    let employeesOnDay = shifts_list.filter((obj) => {
      return obj.date == date && obj.employee;
    });
    let newEmployees = [];
    employeesOnDay.map((obj) => {
      !newEmployees.some((item) => item.id === obj.employee.id) &&
        newEmployees.push(employees.find(item => item.id == obj.employee.id));
    });
    employees.map((obj) => {
      !newEmployees.some((item) => item.id === obj.id) &&
        newEmployees.push(obj);
    });
    setEmployeesList(newEmployees);
    setFilterDate(date);
  };

  const isAvailable = (employee, date) => {
    console.log(employees)
    let available = availability.filter(
      (item) => item.employee.id == employee && item.date == date
    )[0];
    if (!available) {
      date = parseISO(date);
      available = employees.filter((item) => item.id == employee)[0]
        .default_availability[getDay(date) == 0 ? 6 : getDay(date) - 1];
    }
    return available;
  };

  // Handle Scrolling
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [staffSort, setStaffSort] = useState(localStorage.getItem("staff_sort") ? localStorage.getItem("staff_sort") : "alphabetical");

  const sortEmployees = () => {
    if(positions.length > 0 && filterDate == "") {
      switch(staffSort) {
        case "position":
          return employeesList.sort((a,b) => positions.find(pos => pos.id == a.position.find(item => item.department.id == current.department).id).order - positions.find(pos => pos.id == b.position.find(item => item.department.id == current.department).id).order)
          
        default:
          return employeesList.sort((a,b) => a.first_name.localeCompare(b.first_name));
      }
    } else {
      return employeesList;
    }
    
  }

  if(loading.employees) {
    return <Loading />;
  }

  if(!loading.employees && employees.length == 0) {
    toast.warning("You do not currently have any employees to manage in this department")
    return <Redirect to="/staff-management" />
  }

  let openShifts = !user.business && shifts_list.filter(item => item.employee == null && item.positions.some(pos => current_employee.position.map(empPos => empPos.id).includes(pos.id)));
  if(!siteAdmin) {
    let employeeShifts = shifts_list.filter(item => item.employee &&  item.employee.id == current_employee.id)
    // openShifts.filter()
  }

  return (
    <div className="rota">
      <RotaBar
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        updateShifts={updateShifts}
        scrollPosition={scrollPosition}
        setTemplate={setTemplate}
        template={template}
      />
      <div>
        <Dates
          filterEmployees={filterEmployees}
          dates={result}
          scrollPosition={scrollPosition}
          template={template}
          shifts={shifts_list}
        />
        {/* {isLoading && <Loading />} */}
        {current.department != 0 &&
          (template ? (
            <ShiftTemplate shifts={shifts_list} result={result} />
          ) : (
            <div
              className={`shiftList container ${filterDate ? "filtered" : ""} ${
                scrollPosition >= 250 ? " fixed" : ""
              }`}
            >
              {(openShifts.length > 0 || siteAdmin) && business.plan != "F" && (
                <OpenShifts current_employee={current_employee} modalProps={modalProps} confirmProps={confirmProps} result={result} shifts={siteAdmin ? shifts_list.filter(item => item.employee == null) : openShifts} />
              )
              }
              {sortEmployees().map((employee, i) => (
                <div key={employee.id} className="rota__container">
                  <Employee
                    employee={employee}
                    current_employee={current_employee}
                    shifts={shifts_list}
                    user={user}
                    currentDepartment={current.department}
                  />
                  <div className="container-right">
                    {result.map((result) => {
                      const format_date = format(result, "yyyy-MM-dd");
                      const shifts = getEmployeeShift(employee.id, format_date);
                      let props = {
                        format_date,
                        result,
                        available: isAvailable(employee.id, format_date),
                        limit,
                        employee,
                        showAvailabilities,
                        filterDate,
                        admin: siteAdmin
                      };

                      return shifts.length > 0 ? (
                        <Shift key={result} {...modalProps} {...props} shifts={shifts}  />
                      ) : (
                        <NoShift key={result} {...modalProps} {...props} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  );
};

export default Rota;
