import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { format, parseISO, addDays } from "date-fns";
import UpdateDepartment from "../shifts/UpdateDepartment";
import EmailStaff from "./EmailStaff";

const UpdateDate = (props) => {
  const dispatch = useDispatch();
  const { daterange } = props;
  let width = useSelector((state) => state.responsive.width);
  let date = useSelector((state) => state.shifts.date);
  let formatDate = (date, add) => {
    let newDate = format(addDays(parseISO(date), add), "YYY-MM-dd");
    return newDate;
  };
  let user = useSelector((state) => state.auth.user);

  let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;
  let permissions = user.all_permissions;
  return (
    <div className="button-layout container">
      <UpdateDepartment />
      <a
        href={`/exportall?start_date=${date}&end_date=${format(
          addDays(parseISO(date), 6),
          "YYY-MM-dd"
        )}&id=${
          user.groups.some((item) => item.name == "Business")
            ? user.id
            : user.employee[0].owner.id
        }`}
      >
        <button className="btn-3 button">Export Shifts</button>
      </a>
      {permissions.includes("can_publish_shifts") && <EmailStaff />}
      <div className="dates__pickerWrapper">
        <p
          onClick={() => {
            dispatch(
              getShifts(
                formatDate(date, -dateRange - 1),
                formatDate(date, -dateRange + dateRange - 1)
              )
            );
          }}
        >
          <i className="fas fa-caret-left"></i>
        </p>
        <h2 className="dates__pickerDate">
          {format(parseISO(date), "dd MMM")} -{" "}
          {format(addDays(parseISO(date), dateRange), "dd MMM")}
        </h2>
        <p
          onClick={() => {
            dispatch(
              getShifts(
                formatDate(date, dateRange + 1),
                formatDate(date, dateRange + dateRange + 1)
              )
            );
          }}
        >
          <i className="fas fa-caret-right"></i>
        </p>
      </div>
    </div>
  );
};

export default UpdateDate;
