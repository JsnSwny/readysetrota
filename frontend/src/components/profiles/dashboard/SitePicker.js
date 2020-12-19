import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSite, setDepartment } from "../../../actions/employees";
import { toast } from "react-toastify";

const SitePicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  let sites = useSelector((state) => state.employees.sites);
  let current = useSelector((state) => state.employees.current);
  let plan = useSelector((state) => state.employees.business.plan);
  let departments = useSelector((state) => state.employees.departments)
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="dashboard container-2">
        <div className="dashboard__block">
          <div className="dashboard__block-title-container">
            <p className="dashboard__block-title">Sites</p>
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
              className="fas fa-plus-square"
            ></i>
          </div>
          <div className="dashboard__wrapper">
            {sites.map((item) => (
              <div
                key={item.id}
                className={`dashboard__item--sm ${
                  (current.site == item.id || current.site == 0) && "current"
                }`}
              >
                <p className="title-md bold">
                  {item.name}{" "}
                  <i
                    onClick={() => {
                      setOpen(true);
                      setUpdate(item);
                      setType("Site");
                    }}
                    class="fas fa-edit"
                  ></i>
                  <i
                    onClick={() => {
                      dispatch(setSite(item.id));
                      if(current.site == item.id) {
                        dispatch(setSite(0))
                      } else {
                        // console.log(departments.filter(dep => dep.site.id == item.id))
                        // if(departments.filter(dep => dep.site.id == item.id).length == 1) {
                        //   console.log(departments.filter(dep => dep.site.id == item.id)[0].id)
                        //   dispatch(setDepartment(departments.filter(dep => dep.site.id == item.id)[0].id))
                        // }
                      }
                      
                    }}
                    class="fas fa-check-circle"
                  ></i>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SitePicker;
