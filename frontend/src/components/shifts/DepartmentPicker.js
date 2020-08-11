import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getShiftsByID,
  getSwapRequests,
  updateShiftSwap,
  updateShift,
} from "../../actions/shifts";
import {
  getEmployees,
  getDepartments,
  getPositions,
  setDepartment,
} from "../../actions/employees";
import { useParams } from "react-router-dom";
import { format, parse, parseISO } from "date-fns";
import Pagination from "./Pagination";
import { Link, Redirect } from "react-router-dom";
import CreateShift from "../layout/CreateShift";

const BusinessProfile = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getEmployees());
  }, []);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [update, setUpdate] = useState(false);

  let departments = useSelector((state) => state.employees.departments);
  let employees = useSelector((state) => state.employees.departments);
  let positions = useSelector((state) => state.employees.all_positions);
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  let user = useSelector((state) => state.auth.user);
  let business = useSelector((state) => state.auth.business);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };

  if (currentDepartment == 0 && departments.length == 1) {
    setDep(departments[0].id);
  }

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
            {business && (
              <i
                onClick={() => {
                  setOpen(true);
                  setType("Department");
                  setUpdate(false);
                }}
                className="fas fa-plus-square"
              ></i>
            )}
          </div>
          <div className="dashboard__wrapper">
            {departments.map((item) => (
              <div
                key={item.id}
                className={`dashboard__item ${
                  currentDepartment == item.id && "current"
                }`}
              >
                <p className="title-md bold">{item.name}</p>
                <p className="subtitle-sm">
                  {
                    positions.filter(
                      (position) => position.department.id == item.id
                    ).length
                  }{" "}
                  positions
                </p>
                <div>
                  {business && (
                    <button
                      onClick={() => {
                        setOpen(true);
                        setType("Department");
                        setUpdate(item);
                      }}
                      className="btn-4"
                    >
                      Edit
                    </button>
                  )}

                  {currentDepartment != item.id && (
                    <button
                      onClick={() => {
                        setDep(item.id);
                      }}
                      className="btn-4"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessProfile;
