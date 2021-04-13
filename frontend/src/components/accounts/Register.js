import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Register = (props) => {
  let path = false;
  if (props.location.state) {
    path = props.location.state.path.url;
    if (!path.includes("/join")) {
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
          <div className="login__left login__part">
            <form onSubmit={onSubmit}>
              {!path && (
                <div className="form-group">
                  <label>What role are you?</label>
                  <div className="flex-container">
                    <span
                      className={`form-control ${
                        role == "User" ? "active" : ""
                      } btn-toggle`}
                      onClick={() => {
                        setRole("User");
                      }}
                    >
                      Employee
                    </span>
                    <span
                      className={`form-control ${
                        role == "Business" ? "active" : ""
                      } btn-toggle`}
                      onClick={() => {
                        setRole("Business");
                      }}
                    >
                      Business
                    </span>
                  </div>
                  <p className="error">{errors.role}</p>
                </div>
              )}

              {role == "Business" && (
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    className="form-control input-1"
                    name="business_name"
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                    }}
                    value={businessName}
                  />
                  <p className="error">{errors.businessName}</p>
                </div>
              )}
              {role == "User" && (
                <Fragment>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control input-1"
                      name="business_name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                    <p className="error">{errors.first_name}</p>
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control input-1"
                      name="business_name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                    <p className="error">{errors.last_name}</p>
                  </div>
                </Fragment>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control input-1"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <p className="error">{errors.username}</p>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control input-1"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <p className="error">{errors.password}</p>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control input-1"
                  name="password"
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  value={password2}
                />
                <p className="error">{errors.password2}</p>
              </div>
              <div className="form-group">
                <button type="submit" className="btn-2">
                  Register
                </button>
              </div>
              <p className="login__leftExtra">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
