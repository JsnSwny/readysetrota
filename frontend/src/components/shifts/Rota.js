import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getPopularTimes } from "../../actions/shifts";
import { getEmployees, getAllAvailability, getSites, getDepartments } from "../../actions/employees";
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

const Rota = () => {
  const dispatch = useDispatch();
  const [employeesList, setEmployeesList] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentDevice, setCurrentDevice] = useState("");
  const [shiftSwap, setShiftSwap] = useState({});
  const [showAvailabilities, setShowAvailabilities] = useState(false);
  const [template, setTemplate] = useState(false);
  const [limit, setLimit] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  let user = useSelector((state) => state.auth.user);
  let sites = useSelector((state) => state.employees.sites)
  let business = useSelector((state) => state.employees.business);
  let employees = useSelector((state) => state.employees.employees);
  let date = useSelector((state) => state.shifts.date);
  let availability = useSelector((state) => state.employees.availability);

  let enddate = useSelector((state) => state.shifts.end_date);
  let shifts_list = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);

  let current = useSelector((state) => state.employees.current);

  let width = useSelector((state) => state.responsive.width);
  let parsedDate = parseISO(date, "dd-MM-yyyy");

  const isSiteAdmin = (user_id) => {
    return sites.find(site => site.id == current.site) ? (sites.find(site => site.id == current.site).admins.includes(user_id) || user.business) : false;
  }

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

  const widthUpdate = () => {
    if (width > 1200) {
      if (currentDevice != "Desktop") {
        updateShifts(date, format(addDays(parsedDate, 6), "yyyy-MM-dd"));
        setCurrentDevice("Desktop");
      }
    } else if (width > 600) {
      if (currentDevice != "Tablet") {
        updateShifts(date, format(addDays(parsedDate, 2), "yyyy-MM-dd"));
        setCurrentDevice("Tablet");
      }
    } else {
      if (currentDevice != "Mobile") {
        updateShifts(date, format(addDays(parsedDate, 0), "yyyy-MM-dd"));
        setCurrentDevice("Mobile");
      }
    }
  };

  const firstUpdateWidth = useRef(true);
  useEffect(() => {
    if (firstUpdateWidth.current) {
      firstUpdateWidth.current = false;
      return;
    }
    widthUpdate();
  }, [width]);

  const firstUpdateDepartment = useRef(true);
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getSites());
    dispatch(getDepartments());

    dispatch(getPopularTimes());
    if (firstUpdateDepartment.current) {
      widthUpdate();
      return;
    }

    updateShifts(start_date, end_date);
  }, [current.department]);

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

  useEffect(() => {
    if (filterDate) {
      filterEmployees(filterDate, true);
    }
  }, [shifts_list]);

  var result = eachDayOfInterval({
    start: parseISO(date),
    end: parseISO(enddate),
  });

  var getEmployeeShift = (employee, date) =>
    shifts_list.filter((obj) => {
      return obj.employee && obj.employee.id === employee && obj.date === date
        ? isSiteAdmin(user.id)
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

  const isAvailable = (employee, date) => {
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

  if (current.department == 0) {
    toast.warning("You must select a department to view the rota");
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <RotaBar
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        updateShifts={updateShifts}
        scrollPosition={scrollPosition}
        setTemplate={setTemplate}
        template={template}
      />
      <Dates
        filterEmployees={filterEmployees}
        dates={result}
        scrollPosition={scrollPosition}
        template={template}
      />
      {isLoading && <Loading />}
      {current.department != 0 &&
        (template ? (
          <ShiftTemplate shifts={shifts_list} result={result} />
        ) : (
          <div
            className={`shiftList container ${filterDate ? "filtered" : ""} ${
              scrollPosition >= 360 ? " fixed" : ""
            }`}
          >
            {employeesList.map((employee, i) => (
              <div key={employee.id} className="rota__container">
                <Employee
                  employee={employee}
                  current_employee={current_employee}
                  shifts_list={shifts_list}
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
                      admin: isSiteAdmin(user.id)
                    };

                    return shifts.length > 0 ? (
                      <Shift {...props} shifts={shifts}  />
                    ) : (
                      <NoShift {...props} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
    </Fragment>
  );
};

export default Rota;
