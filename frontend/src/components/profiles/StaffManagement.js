import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";
import { getEmployees } from "../../actions/employees";
import { format } from "date-fns";
import Title from "../common/Title";

const StaffManagement = ({ modalProps }) => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <Title name="Staff Management" breakWord={false} />
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
      {/* <div className="container-2">
        <Title name="Staff Management" />
      </div> */}

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
