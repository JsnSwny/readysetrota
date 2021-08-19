import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DepartmentPicker from "./dashboard/DepartmentPicker";
import PositionPicker from "./dashboard/PositionPicker";
import StaffPicker from "./dashboard/StaffPicker";
import SitePicker from "./dashboard/SitePicker";
import { getEmployees, getPositions } from "../../actions/employees";
import { format } from "date-fns";
import Title from "../common/Title";

const StaffManagement = ({ modalProps }) => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let positions = useSelector((state) => state.employees.positions);
  let user = useSelector((state) => state.auth.user);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);

  useEffect(() => {
    if (!loading.departments && !loading.sites) {
      if (sites.length > 0) {
        dispatch(getPositions(true));
        dispatch(getEmployees(true, false));
      }
    }
  }, [current.department, current.site]);

  return (
    <Fragment>
      <div className="banner">
        <div className="wrapper--md flex-container--between-start">
          <Title name="Staff Management" breakWord={false} />
          {/* <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div> */}
        </div>
      </div>
      {/* <div className="container-2">
        <Title name="Staff Management" />
      </div> */}

      <div className="list-block wrapper--md">
        {business.plan != "F" && (
          <Fragment>
            <SitePicker {...modalProps} admin={user.business ? true : false} />
            <DepartmentPicker {...modalProps} admin={true} />
          </Fragment>
        )}

        {current.department != 0 && (
          <Fragment>
            <PositionPicker
              {...modalProps}
              positions={positions.filter(
                (item) => item.department.id == current.department.id
              )}
            />
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
