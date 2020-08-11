import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/auth";

const ChangePassword = (props) => {
  const { location } = props;

  let errors = useSelector((state) => state.errors.msg);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword == newPassword2) {
      dispatch(changePassword(password, newPassword));
    } else {
      setPasswordMatch("Passwords do not match.");
    }
  };

  return (
    <div className="login">
      <div className="login__box">
        <div className="login__left login__part">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                className="form-control input-1"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <p className="error">{errors.old_password}</p>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control input-1"
                name="newPassword"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
              />
              <p className="error">{errors.new_password}</p>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-control input-1"
                name="newPassword2"
                onChange={(e) => {
                  setNewPassword2(e.target.value);
                }}
                value={newPassword2}
              />
              <p className="error">{passwordMatch}</p>
            </div>
            <div className="form-group">
              <button style={{ width: "70%" }} type="submit" className="btn-2">
                Change Password
              </button>
            </div>
            <p className="success">{success}</p>
          </form>
        </div>
        <div className="login__right login__part"></div>
      </div>
    </div>
  );
};

export default ChangePassword;
