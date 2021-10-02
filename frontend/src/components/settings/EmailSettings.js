import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBusinessName } from "../../actions/employees";

const EmailSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const [publishedShifts, setPublishedShifts] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBusinessName(user.business.id, { name: businessName }));
    toast.success("Submitted");
  };
  return (
    <Fragment>
      <h3>Email Preferences</h3>
      <form onSubmit={onSubmit}>
        <ul className="flex-container">
          <li
            onClick={() => setPublishedShifts(!publishedShifts)}
            className="settings__check"
          >
            <span className={`checkbox ${publishedShifts ? "checked" : ""}`}>
              <i className="fas fa-check"></i>
            </span>{" "}
            Published Shifts
          </li>
          <li className="settings__check">
            <span className="checkbox">
              <i className="fas fa-check"></i>
            </span>{" "}
            Published Shifts
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default EmailSettings;
