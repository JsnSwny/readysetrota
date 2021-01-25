import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDepartment } from "../../../actions/employees";

import { toast } from "react-toastify";


const DepartmentPicker = (props) => {
  const dispatch = useDispatch();

  const { setOpen, setUpdate, setType, admin } = props;

  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let user = useSelector((state) => state.auth.user);
  let plan = useSelector((state) => state.employees.business.plan);
  let loading = useSelector((state) => state.loading);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };  

  return (
    <Fragment>
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <div className="flex-container--align-center">
            <p className="dashboard__block-title">Departments</p>
              {admin && (
                <i
                  onClick={() => {
                    if (plan == "F" && departments.length >= 1) {
                      toast.warning(
                        "Upgrade to premium to unlock unlimited departments"
                      );
                      return false;
                    }

                    setOpen(true);
                    setType("Department");
                    setUpdate(false);
                  }}
                  className="fas fa-plus"
                ></i>
              )}
            </div>
          </div>
          
          {loading.departments && <small className="loading-text">Loading departments...</small>}

          <div className="dashboard__wrapper">
            
            {departments.map((item, i) => (
              <div
                key={item.id}
                className={`dashboard__item--sm ${
                  (current.department == item.id || current.department == 0) && "current"
                }`}
              >
                <div className="title-md bold flex-container--between-center">
                  <p>{item.name}{" "}</p>
                  <div className="flex">
                    {admin && (
                      <i
                      onClick={() => {
                        setOpen(true);
                        setType("Department");
                        setUpdate(item);
                      }}
                      className="fas fa-edit"
                    ></i>
                    )}
                    
                    {current.department != item.id && (
                      <i
                      onClick={() => {
                        if (
                          plan == "F" &&
                          i > 0 &&
                          item.business.id == current.business
                        ) {
                          toast.warning(
                            "Upgrade to premium to unlock unlimited departments"
                          );
                          return false;
                        } else {
                          if(current.department != item.id) {
                            setDep(item.id);
                          }
                        }
                      }}
                      className="fas fa-check-circle"
                    ></i>
                    )}
                    
                  </div>
                </div>
                <p className="subtitle-sm" style={{ flex: "0" }}>
                  {current.site == 0 && item.site.name}
                </p>
                <p className="subtitle-sm" style={{ marginBottom: "10px" }}>
                  {item.number_of_employees}{" "}
                  {item.number_of_employees == 1 ? "employee" : "employees"}
                </p>
              </div>
            ))}
          </div>
        </div>
    </Fragment>
  );
};

export default DepartmentPicker;
