import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const RegisterPassword = ({
  password,
  setPassword,
  password2,
  setPassword2,
}) => {
  let errors = useSelector((state) => state.errors.msg);
  return (
    <Fragment>
      <div className="register__control">
        <label for="first_name">Password:</label>
        <input
          required
          autoFocus
          className="register__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="register__control">
        <label for="first_name">Confirm password:</label>
        <input
          required
          className="register__input"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className="error">{errors.password}</p>
      </div>
    </Fragment>
  );
};

export default RegisterPassword;
