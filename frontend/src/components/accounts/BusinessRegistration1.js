import React, { Fragment } from "react";

const BusinessRegistration1 = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
}) => {
  return (
    <Fragment>
      <div className="form__control">
        <label className="form__label">First Name</label>
        <input
          type="text"
          className="form__input"
          name="business_name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
        {/* <p className="error">{errors.first_name}</p> */}
      </div>
      <div className="form__control">
        <label className="form__label">Last Name</label>
        <input
          type="text"
          className="form__input"
          name="business_name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
        {/* <p className="error">{errors.last_name}</p> */}
      </div>
      <div className="form__control">
        <label className="form__label">Email</label>
        <input
          type="text"
          className="form__input"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        {/* <p className="error">{errors.username}</p> */}
      </div>
      <div className="form__control">
        <label className="form__label">Password</label>
        <input
          type="password"
          className="form__input"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        {/* <p className="error">{errors.password}</p> */}
      </div>
      <div className="form__control">
        <label className="form__label">Confirm Password</label>
        <input
          type="password"
          className="form__input"
          name="password"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          value={password2}
        />
        {/* <p className="error">{errors.password2}</p> */}
      </div>
    </Fragment>
  );
};

export default BusinessRegistration1;
