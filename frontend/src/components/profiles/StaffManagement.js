import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
  getSites,
} from "../../actions/employees";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";

const StaffManagement = ({modalProps}) => {
  const dispatch = useDispatch();

  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector(
    (state) => state.employees.current
  );
  let business = useSelector((state) => state.employees.business)

  let sites = useSelector((state) => state.employees.sites);

  return (
    <div className="dashboard container-2">
      {business.plan != "F" && (
        <Fragment>
          <SitePicker {...modalProps} admin={true} />
          <DepartmentPicker {...modalProps} admin={true} />
        </Fragment>
      )}
      
      {current.department != 0 && (
        <Fragment>
            <PositionPicker {...modalProps}/>
            <StaffPicker {...modalProps}/>
        </Fragment>
      )}
    </div>
  );
};

export default StaffManagement;
