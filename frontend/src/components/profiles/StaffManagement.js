import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";

const StaffManagement = ({ modalProps }) => {
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let user = useSelector((state) => state.auth.user);

  return (
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
            admin={user.business ? true : false}
            disabled={user.business.plan == "F"}
          />
          <DepartmentPicker
            {...modalProps}
            admin={true}
            disabled={user.business.plan == "F"}
          />
        </Fragment>
      )}
    </div>
  );
};

export default StaffManagement;
