import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDepartment } from "../../../actions/employees";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardBlock from "./DashboardBlock";

const DepartmentPicker = (props) => {
  const dispatch = useDispatch();
  const { setOpen, setUpdate, setType, admin, disabled } = props;

  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let plan = useSelector((state) => state.employees.business.plan);
  let loading = useSelector((state) => state.loading);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let user = useSelector((state) => state.auth.user);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };

  return (
    <DashboardBlock disabled={disabled} disabledText={"add more departments"}>
      <div className="flex-container--align-center">
        <p className="list-block__title">
          <i class="fas fa-sitemap"></i> Departments
        </p>
        {permissions.includes("manage_departments") && (
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
      <hr className="separator" />
      {loading.departments && (
        <small className="loading-text">Loading departments...</small>
      )}

      <div className="list-block__wrapper">
        {departments.map((item, i) => (
          <div
            key={item.id}
            className={`list-block__item--sm ${
              (current.department.id == item.id || current.department == 0) &&
              "current"
            }`}
          >
            <div className="title-md bold flex-container--between-center">
              <p>{item.name} </p>
              <div className="flex">
                {permissions.includes("manage_departments") && (
                  <i
                    onClick={() => {
                      setOpen(true);
                      setType("Department");
                      setUpdate(item);
                    }}
                    className="fas fa-edit"
                  ></i>
                )}
                <i
                  onClick={() => {
                    if (
                      plan == "F" &&
                      i > 0 &&
                      item.business.id == current.business.id
                    ) {
                      toast.warning(
                        "Upgrade to premium to unlock unlimited departments"
                      );
                      return false;
                    } else {
                      if (current.department.id != item.id) {
                        setDep(item);
                      }
                    }
                  }}
                  className={`${
                    current.department.id != item.id
                      ? "far fa-check-square"
                      : "fas fa-check-square"
                  }`}
                ></i>
              </div>
            </div>
            <p className="subtitle-sm" style={{ flex: "0" }}>
              {current.site.id == 0 && item.site.name}
            </p>
            <p className="subtitle-sm" style={{ marginBottom: "10px" }}>
              {item.number_of_employees}{" "}
              {item.number_of_employees == 1 ? "employee" : "employees"}
            </p>
          </div>
        ))}
      </div>
    </DashboardBlock>
  );
};

export default DepartmentPicker;
