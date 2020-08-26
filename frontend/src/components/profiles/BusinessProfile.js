import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
  getHolidays,
} from "../../actions/employees";
import DepartmentPicker from "./DepartmentPicker";
import PositionPicker from "./PositionPicker";
import StaffPicker from "./StaffPicker";
import HolidayRequest from "./HolidayRequest";

const BusinessProfile = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();
  let currentBusiness = useSelector(
    (state) => state.employees.current_business
  );
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  let holidays = useSelector((state) => state.employees.holidays);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getEmployees());
    dispatch(getPositions(true));
    dispatch(getPositions());
    dispatch(getHolidays(currentBusiness));
  }, [currentDepartment]);

  useEffect(() => {
    dispatch(getPositions(true));
    dispatch(getPositions());
  }, [currentBusiness]);

  let user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      <div className="dashboard__header">
        <div className="container-2">
          <h1 className="title">Your Business</h1>
          <div className="dashboard__header-wrapper">
            <p className="subtitle">
              {user.business ? user.business.name : ""}
            </p>
            <i
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: "24px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpen(true);
                setType("BusinessName");
                setUpdate({ id: user.business.id, name: user.business.name });
              }}
              className="fas fa-edit"
            ></i>
          </div>
        </div>
      </div>
      <DepartmentPicker />
      {currentDepartment != 0 && (
        <PositionPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      {currentDepartment != 0 && (
        <StaffPicker
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
      <div className="container-2">
        <HolidayRequest holidays={holidays} business={true} />
      </div>
    </Fragment>
  );
};

export default BusinessProfile;
