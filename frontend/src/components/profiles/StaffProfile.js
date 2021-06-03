import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, getOpenShifts } from "../../actions/shifts";
import { getAvailability, getHolidays } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";
import Availability from "./Availability";
import HolidayRequest from "./dashboard/HolidayRequest";
import UpcomingShifts from "./UpcomingShifts";
import Stats from "./dashboard/stats/Stats";
import { format } from "date-fns";

const StaffProfile = (props) => {
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  let { id: id_param } = useParams();
  let employees = useSelector((state) => state.employees.employees);
  let plan = useSelector((state) => state.employees.business.plan);
  let current = useSelector((state) => state.employees.current);

  let siteAdmin = useSelector((state) => state.employees.site_admin);

  const [currentEmployee, setCurrentEmployee] = useState(false);

  let employee_id = parseInt(id_param) || user.id;
  let holidays = useSelector((state) => state.employees.holidays);

  let employee =
    (id_param && employees.find((item) => item.id == employee_id)) ||
    employees.find((employee) => employee.user == user.id);

  let openShifts = useSelector((state) => state.shifts.open_shifts);
  let shifts = useSelector((state) => state.shifts.shifts);

  useEffect(() => {
    dispatch(
      getShifts(
        format(new Date(), "yyyy-MM-dd"),
        "",
        true,
        user.id == employee_id,
        employee_id
      )
    );
    dispatch(getOpenShifts(format(new Date(), "yyyy-MM-dd")));
  }, []);

  useEffect(() => {
    if (typeof employee !== "undefined") {
      setCurrentEmployee(employee);
    }
    if (employee) {
      dispatch(getAvailability(employee.id, employee.business_id));
      dispatch(getHolidays(employee.business_id, employee.id));
    }
  }, [employee]);

  // if(siteAdmin && !employees.some(item => item.id == employee_id)) {
  //   return <Redirect to="" />;
  // }

  if (!siteAdmin && id_param) {
    return <Redirect to="" />;
  }

  return (
    <Fragment>
      <Stats
        title="Staff Dashboard"
        type={id_param ? "staff_profile" : "staff"}
        employee={id_param ? employee_id : false}
      />
      <div className="dashboard container-2">
        {current.site.id != 0 && (
          <Fragment>
            {current.department != 0 && currentEmployee && (
              <Fragment>
                <UpcomingShifts
                  title="Open Shifts"
                  shifts={openShifts}
                  employee={currentEmployee}
                  admin={siteAdmin && id_param}
                />
                <UpcomingShifts
                  allow_export={true}
                  title="Upcoming Shifts"
                  shifts={shifts}
                  employee={currentEmployee}
                  admin={siteAdmin && id_param}
                />
                <div className="flex-container--between-start mobile">
                  {plan != "F" && <Availability employee={currentEmployee} />}
                  {console.log(holidays)}
                  <HolidayRequest
                    holidays={
                      siteAdmin && id_param
                        ? holidays.filter(
                            (item) => item.employee.id == id_param
                          )
                        : holidays
                    }
                    admin={false}
                  />
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default StaffProfile;
