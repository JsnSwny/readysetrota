import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getDepartments,
  getPositions,
} from "../../actions/employees";
import CreateShift from "../layout/CreateShift";
import DepartmentPicker from "./DepartmentPicker";
import { toast } from "react-toastify";

const BusinessProfile = (props) => {
  const dispatch = useDispatch();
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getPositions(true));
    dispatch(getPositions());
    dispatch(getEmployees());
  }, [currentDepartment]);

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [type, setType] = useState("");
  let user = useSelector((state) => state.auth.user);
  let permissions = user.all_permissions;

  let positions = useSelector((state) => state.employees.positions);
  let employees = useSelector((state) => state.employees.employees);

  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
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
        <Fragment>
          <div className="dashboard container-2">
            <div className="dashboard__block">
              <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">Positions</p>
                <i
                  onClick={() => {
                    setOpen(true);
                    setType("Position");
                    setUpdate(false);
                  }}
                  className="fas fa-plus-square"
                ></i>
              </div>
              <div className="dashboard__wrapper">
                {positions.map((item) => (
                  <div key={item.id} className="dashboard__item">
                    <p className="title-md bold">{item.name}</p>
                    <p className="subtitle-sm">
                      {
                        employees.filter((employee) =>
                          employee.position.some(
                            (position) => position.id == item.id
                          )
                        ).length
                      }{" "}
                      employees
                    </p>

                    <button
                      onClick={() => {
                        setOpen(true);
                        setType("Position");
                        setUpdate(item);
                      }}
                      className="btn-4"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard container-2">
            <div className="dashboard__block">
              <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">Staff</p>
                <i
                  onClick={() => {
                    setOpen(true);
                    setType("staff");
                    setUpdate(false);
                  }}
                  className="fas fa-plus-square"
                ></i>
              </div>
              <div className="dashboard__wrapper">
                {employees.map((item) => (
                  <div key={item.id} className="dashboard__item">
                    <p className="title-md bold">
                      {item.first_name} <strong>{item.last_name}</strong>
                      {permissions.includes("can_view_uuid") && !item.user && (
                        <Fragment>
                          <i
                            style={{
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              toast.info(
                                <div>
                                  {item.first_name + " " + item.last_name}
                                  <br /> UUID copied! <br /> <br />{" "}
                                  <small>{item.uuid}</small>
                                </div>,
                                { position: "bottom-center" }
                              );
                              copyToClipboard(
                                `www.readysetrota.com/join/${item.uuid}/`
                              );
                            }}
                            className="fas fa-clipboard"
                          ></i>
                        </Fragment>
                      )}
                    </p>
                    <p className="subtitle-sm">
                      {item.position.map(
                        (position) =>
                          position.department.id == currentDepartment && (
                            <span key={position.id}>{position.name}</span>
                          )
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setType("staff");
                        setUpdate(item);
                      }}
                      className="btn-4"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BusinessProfile;
