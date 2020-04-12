import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (password != password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = { username: email, password, email, role };
      dispatch(register(newUser));
    }
  };
  if (useSelector((state) => state.auth.isAuthenticated)) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login">
        <div className="login__box">
          <div className="login__left">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>What role are you?</label>
                <div className="form-selector">
                  <span
                    className={`form-control ${
                      role == "User" ? " active" : ""
                    }`}
                    onClick={() => {
                      setRole("User");
                    }}
                  >
                    Employee
                  </span>
                  <span
                    className={`form-control ${
                      role == "Business" ? " active" : ""
                    }`}
                    onClick={() => {
                      setRole("Business");
                    }}
                  >
                    Business
                  </span>
                </div>
              </div>
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
          <div className="login__right">Register</div>
        </div>
      </div>
    );
  }
};

export default Register;
