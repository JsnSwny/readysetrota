import React, { Fragment } from "react";

const RegisterPersonalDetails = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) => {
  return (
    <Fragment>
      <div className="flex-container--between">
        <div className="register__control--half">
          <label for="first_name">First name:</label>
          <input
            required
            autoFocus
            className="register__input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="register__control--half">
          <label for="last_name">Last name:</label>
          <input
            required
            className="register__input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="register__control">
        <label for="email">Email:</label>
        <input
          required
          className="register__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </Fragment>
  );
};

export default RegisterPersonalDetails;
