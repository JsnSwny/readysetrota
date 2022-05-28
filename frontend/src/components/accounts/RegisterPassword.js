import React, { Fragment } from "react";

const RegisterPassword = ({
  password,
  setPassword,
  password2,
  setPassword2,
}) => {
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
      </div>
    </Fragment>
  );
};

export default RegisterPassword;
