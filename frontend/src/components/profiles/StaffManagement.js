import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";
import { getEmployees } from "../../actions/employees";
import { format } from "date-fns";

const StaffManagement = ({ modalProps }) => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <Fragment>
      <div className="banner">
        <div className="wrapper--lg">
          <h1 className="header">Staff Management</h1>
          {/* <p>{subtitles[type]}</p> */}
        </div>
      </div>
      <div className="dashboard container-2">
        {business.plan != "F" && (
          <Fragment>
            <SitePicker {...modalProps} admin={user.business ? true : false} />
            <DepartmentPicker {...modalProps} admin={true} />
          </Fragment>
        )}

        {current.department != 0 && (
          <Fragment>
            <PositionPicker {...modalProps} />
            <StaffPicker {...modalProps} />
          </Fragment>
        )}

        {business.plan == "F" && (
          <Fragment>
            <SitePicker
              {...modalProps}
              admin={business ? true : false}
              disabled={business.plan == "F"}
            />
            <DepartmentPicker
              {...modalProps}
              admin={true}
              disabled={business.plan == "F"}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default StaffManagement;
