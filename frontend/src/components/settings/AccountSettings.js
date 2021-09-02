import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBusinessName } from "../../actions/employees";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const [businessName, setBusinessName] = useState(user.business.name);
  const [emailAddress, setEmailAddress] = useState(user.email);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBusinessName(user.business.id, { name: businessName }));
    toast.success("Submitted");
  };

  return (
    <Fragment>
      <h3>Account</h3>
      <form onSubmit={onSubmit}>
        <div className="settings__control">
          <div className="settings__group">
            <label>Business Name</label>
            <input
              className="input"
              onChange={(e) => setBusinessName(e.target.value)}
              type="text"
              value={businessName}
            />
          </div>
        </div>
        <button className="btn-3" type="submit">
          Save
        </button>
      </form>
    </Fragment>
  );
};

export default AccountSettings;
