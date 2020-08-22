import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyUUID from "../common/CopyUUID";

const StaffPicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  let business = useSelector((state) => state.auth.business);
  let employees = useSelector((state) => state.employees.employees);
  let user = useSelector((state) => state.auth.user);
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  return (
    <Fragment>
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">Staff</p>
            <i
              onClick={() => {
                setOpen(true);
                setUpdate(false);
                setType("staff");
              }}
              className="fas fa-plus-square"
            ></i>
          </div>
          <div className="dashboard__wrapper">
            {employees.map((item) => (
              <div key={item.id} className="dashboard__item">
                <p className="title-md bold">
                  <Link to={`/profile/${item.id}`}>
                    {item.first_name} <strong>{item.last_name}</strong>
                  </Link>
                  {business && !item.user && <CopyUUID employee={item} />}
                </p>

                <p className="subtitle-sm">
                  {item.position.map(
                    (position) =>
                      position.department.id == currentDepartment && (
                        <span key={position.id}>{position.name}</span>
                      )
                  )}
                </p>
                {item.user != user.id && (
                  <div>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setUpdate(item);
                        setType("staff");
                      }}
                      className="btn-4"
                    >
                      Edit
                    </button>
                    <Link to={`/profile/${item.id}`}>
                      <button className="btn-4">Profile</button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StaffPicker;
