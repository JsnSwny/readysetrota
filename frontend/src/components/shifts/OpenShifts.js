import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Shift from "./Shift";
import NoShift from "./NoShift";

const OpenShifts = ({current_employee, result, modalProps, shifts, confirmProps}) => {
    let sites = useSelector((state) => state.employees.sites);
    let current = useSelector((state) => state.employees.current)
    const isSiteAdmin = (user_id) => {
        return user.business ? true : sites.find(site => site.id == current.site) ? (sites.find(site => site.id == current.site).admins.includes(user_id)) : false;
      }

    let user = useSelector((state) => state.auth.user);
    return (
        <div className="rota__container open-shifts">
            <div
            className={`employee__wrapper container-left`}
        >
            <div className="employee__name-container">
                <p className="employee__name">
                    Open Shifts
                </p>
            </div>
            
        </div>
        <div className="container-right">
                {result.map((result) => {
                    const format_date = format(result, "yyyy-MM-dd");
                    let props = {
                        format_date,
                        result,
                        available: "unselected",
                        admin: isSiteAdmin(user.id)
                    };

                    if(shifts.filter(item => item.date == format_date).length > 0) {
                        return (
                            <Shift current_employee={current_employee} {...modalProps} {...confirmProps} {...props} shifts={shifts.filter(item => item.date == format_date)} />
                        )
                    } else {
                        return (
                            <NoShift {...modalProps} {...props} />
                        )
                    }
                    
                })}
            </div>
      </div>
    )
}

export default OpenShifts;