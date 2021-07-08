import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSite } from "../../../actions/employees";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DashboardBlock from "./DashboardBlock";

const SitePicker = (props) => {
  const { setOpen, setUpdate, setType, admin, disabled } = props;
  const dispatch = useDispatch();
  let sites = useSelector((state) => state.employees.sites);
  let current = useSelector((state) => state.employees.current);
  let plan = useSelector((state) => state.employees.business.plan);
  let loading = useSelector((state) => state.loading);
  let user = useSelector((state) => state.auth.user);

  return (
    <DashboardBlock disabled={disabled} disabledText={"add more sites"}>
      <div className="flex-container--align-center">
        <p className="list-block__title">
          <i class="fas fa-store"></i> Sites
        </p>
        {admin && (
          <i
            onClick={() => {
              if (plan == "F" && sites.length >= 1) {
                toast.warning(
                  "Upgrade to premium to unlock unlimited departments"
                );
                return false;
              }
              setOpen(true);
              setUpdate(false);
              setType("Site");
            }}
            className="fas fa-plus"
          ></i>
        )}
      </div>
      <hr className="separator" />
      {sites.length == 0 && !user.business && (
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
      {loading.sites && (
        <small className="loading-text">Loading sites...</small>
      )}

      <div className="list-block__wrapper">
        {sites.map((item) => (
          <div
            key={item.id}
            className={`list-block__item--sm ${
              (current.site.id == item.id || current.site.id == 0) && "current"
            }`}
          >
            <div className="title-md bold flex-container--between-center">
              {item.name}{" "}
              <div className="flex">
                {admin && (
                  <i
                    onClick={() => {
                      setOpen(true);
                      setUpdate(item);
                      setType("Site");
                    }}
                    className="fas fa-edit"
                  ></i>
                )}
                <i
                  onClick={() => {
                    if (current.site.id != item.id) {
                      dispatch(setSite(item));
                    }
                  }}
                  className={`${
                    current.site.id != item.id
                      ? "far fa-check-square"
                      : "fas fa-check-square"
                  }`}
                ></i>
              </div>
            </div>
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

export default SitePicker;
