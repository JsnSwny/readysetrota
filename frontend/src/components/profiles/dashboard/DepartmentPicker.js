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
      <h2 className="title-sm title--margin-top">
        Departments{" "}
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
      </h2>
      <hr class="separator" />
      {loading.departments && (
        <small className="loading-text">Loading departments...</small>
      )}

      <div className="list-block__wrapper">
        {departments.map((item, i) => (
          <div key={item.id} className={`list-block__item--sm`}>
            <h3 className="title-md bold flex-container--between-center">
              <p>{item.name} </p>
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
            </h3>
            <h4 className="subtitle-sm">
              {current.site.id == 0 && item.site.name}
            </h4>
            <p className="subtitle-sm">
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
