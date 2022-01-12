import React, { Fragment, useState, useEffect } from "react";

const PersonalDetails = ({
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
        <div className="form__control--half">
          <label className="form-block__label">First name*</label>
          <input
            className="form__input"
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            value={firstName}
          ></input>
        </div>
        <div className="form__control--half">
          <label className="form-block__label">Last name*</label>
          <input
            className="form__input"
            type="text"
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
        </div>
      </div>
      <div className="flex-container--between">
        <div className="form__control--half">
          <label className="form-block__label">Email</label>
          <input
            className="form__input"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalDetails;
