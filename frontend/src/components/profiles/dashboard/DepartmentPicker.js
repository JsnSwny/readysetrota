import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDepartment } from "../../../actions/employees";
import CreateShift from "../../modals/CreateShift";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DepartmentPicker = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [update, setUpdate] = useState(false);

  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);
  let user = useSelector((state) => state.auth.user);
  let plan = useSelector((state) => state.employees.business.plan);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };  

  return (
    <Fragment>
      <CreateShift
        open={open}
        type={type}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        update={update}
      />
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">Departments</p>
            {user.business && (
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
                className="fas fa-plus-square"
              ></i>
            )}
          </div>
          {departments.length == 0 && !user.business && (
            <Fragment>
              <p>You are not associated with any businesses yet</p>
              <Link to="/join">
                <button
                  className="btn-4"
                  style={{
                    marginLeft: "0",
                    padding: "15px 20px",
                    marginTop: "20px",
                  }}
                >
                  Join a Business
                </button>
              </Link>
            </Fragment>
          )}

          <div className="dashboard__wrapper">
            {departments.map((item, i) => (
              <div
                key={item.id}
                className={`dashboard__item--sm ${
                  (current.department == item.id || current.department == 0) && "current"
                }`}
              >
                <p className="title-md bold">
                  {item.name}{" "}
                  {user.business && (
                    <i
                    onClick={() => {
                      setOpen(true);
                      setType("Department");
                      setUpdate(item);
                    }}
                    class="fas fa-edit"
                  ></i>
                  )}
                  
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
                        if(current.department == item.id) {
                          setDep(0)
                        } else {
                          setDep(item.id);
                        }
                      }
                    }}
                    class="fas fa-check-circle"
                  ></i>
                </p>
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
      </div>
    </Fragment>
  );
};

export default DepartmentPicker;
