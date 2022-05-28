import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PersonalDetails = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) => {
  let errors = useSelector((state) => state.errors.msg);
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
          <p className="error">{errors.first_name}</p>
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
          <p className="error">{errors.last_name}</p>
        </div>
      </div>
      <div className="form__control">
        <label className="form-block__label">Email</label>
        <input
          className="form__input"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      {/* <div className="flex-container--between">
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
      </div> */}
    </Fragment>
  );
};

export default PersonalDetails;
