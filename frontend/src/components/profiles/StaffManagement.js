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

  let sites = useSelector((state) => state.employees.sites);

  useEffect(() => {
    if(sites.length == 0) {
      dispatch(getSites());
    }
    if(current.site > 0) {
      dispatch(getDepartments());
      dispatch(getHolidays(current.site));
    }
  }, [current.site]);

  useEffect(() => {
    if(current.department > 0 && current.site > 0) {
      dispatch(getEmployees());
      dispatch(getPositions(true));
      dispatch(getPositions());
    }
  }, [current.department, current.site]);

  return (
    <div className="dashboard container-2">
      <SitePicker {...modalProps} admin={true} />
      <DepartmentPicker {...modalProps} admin={true} />
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
