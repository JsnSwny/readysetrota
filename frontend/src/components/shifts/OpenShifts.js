import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Shift from "./Shift";
import NoShift from "./NoShift";

const OpenShifts = ({
  current_employee,
  result,
  modalProps,
  shifts,
  confirmProps,
}) => {
  let siteAdmin = useSelector((state) => state.employees.site_admin);
  return (
    <div className="rota__container open-shifts">
      <div className={`employee__wrapper container-left`}>
        <div className="employee__name-container">
          <p className="employee__name">Open Shifts</p>
        </div>
      </div>
      <div className="container-right">
        {result.map((result) => {
          const format_date = format(result, "yyyy-MM-dd");
          let props = {
            format_date,
            result,
            available: "unselected",
            admin: siteAdmin,
          };

          if (shifts.filter((item) => item.date == format_date).length > 0) {
            return (
              <Shift
                key={result}
                current_employee={current_employee}
                {...modalProps}
                {...confirmProps}
                {...props}
                shifts={shifts.filter((item) => item.date == format_date)}
              />
            );
          } else {
            return <NoShift key={result} {...modalProps} {...props} />;
          }
        })}
      </div>
    </div>
  );
};

export default OpenShifts;
