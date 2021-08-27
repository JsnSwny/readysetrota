import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../../actions/auth";
import { resetErrors } from "../../actions/errors";

const PasswordSettings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const dispatch = useDispatch();
  let errors = useSelector((state) => state.errors.msg);
  let success = useSelector((state) => state.errors.success);

  useEffect(() => {
    if (success) {
      setPassword("");
      setNewPassword("");
      setNewPassword2("");
      dispatch(resetErrors());
      toast.success("Password Changed");
    }
  }, [success]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword == newPassword2) {
      dispatch(changePassword(password, newPassword));
    } else {
      setPasswordMatch("Passwords do not match.");
    }
  };

  return (
    <Fragment>
      <h3>Password</h3>
      <form onSubmit={onSubmit}>
        <div className="settings__control">
          <div className="settings__group">
            <label>Current Password</label>
            <input
              type="password"
              className="input"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <p className="error">{errors.old_password}</p>
          </div>
        </div>

        <div className="settings__control">
          <div className="settings__group">
            <label>New Password</label>
            <input
              type="password"
              className="input"
              name="newPassword"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />
            <p className="error">{errors.new_password}</p>
          </div>

          <div className="settings__group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="input"
              name="newPassword2"
              onChange={(e) => {
                setNewPassword2(e.target.value);
              }}
              value={newPassword2}
            />
            <p className="error">{passwordMatch}</p>
          </div>
        </div>
        <button type="submit" className="btn-3">
          Change Password
        </button>
      </form>
    </Fragment>
  );
};

export default PasswordSettings;
