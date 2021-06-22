import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addForecast, updateForecast } from "../../actions/employees";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";

const RegisterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [forecastAmount, setForecastAmount] = useState(10.0);
  let current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState(`Business`);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: email.toLowerCase(),
      password,
      password2,
      email,
      role,
      businessName,
      first_name: firstName,
      last_name: lastName,
    };
    dispatch(register(newUser));
  };

  if (isAuthenticated) {
    return <Redirect to="/staff-management" />;
  } else {
    return (
      <div className="form form-beta">
        <p className="form__subheading">Register</p>
        <h1 className="form__heading">Join the Free Beta</h1>
        <form onSubmit={onSubmit} className="form__form">
          <div className="form__control">
            <label>Business Name</label>
            <input
              type="text"
              className="form__input input-1"
              name="business_name"
              onChange={(e) => {
                setBusinessName(e.target.value);
              }}
              value={businessName}
            />
            <p className="error">{errors.businessName}</p>
          </div>
          <div className="form__control">
            <label>Email</label>
            <input
              type="text"
              className="form__input input-1"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <p className="error">{errors.username}</p>
          </div>
          <div className="form__control">
            <label>Password</label>
            <input
              type="password"
              className="form__input input-1"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <p className="error">{errors.password}</p>
          </div>
          <div className="form__control">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form__input input-1"
              name="password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              value={password2}
            />
            <p className="error">{errors.password2}</p>
          </div>
          <div className="flex-container--between form__actions">
            <button className="form__save join" type="submit" value="Save">
              Join
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default RegisterModal;
