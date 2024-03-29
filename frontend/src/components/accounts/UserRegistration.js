import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const UserRegistration = (props) => {
  let path = false;
  if (props.location.state) {
    path = props.location.state.path.url;
    if (path && !path.includes("/join")) {
      path = false;
    }
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [stage, setStage] = useState(1);
  const [role, setRole] = useState(`${path ? "User" : "Business"}`);
  let errors = useSelector((state) => state.errors.msg);
  const dispatch = useDispatch();
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

  if (useSelector((state) => state.auth.isAuthenticated)) {
    if (path) {
      return <Redirect to={path} />;
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return (
      <div className="login">
        <div className="login__box">
          <h2>Register</h2>
          <hr className="separator" />
          <form onSubmit={onSubmit}>
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
              <p className="error">{errors.first_name}</p>
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
              <p className="error">{errors.last_name}</p>
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
              <p className="error">{errors.username}</p>
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
              <p className="error">{errors.password}</p>
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
              <p className="error">{errors.password2}</p>
            </div>
          </form>
          <hr className="separator" />
          <div className="login__register">
            <h4>Already have an account?</h4>
            <Link
              to={{
                pathname: `/login`,
                state: {
                  path,
                },
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default UserRegistration;
