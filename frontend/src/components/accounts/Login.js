import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
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
                <label>Email</label>
                <input
                  type="email"
                  className="form-control input-1"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
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
                <button type="submit" className="btn-2">
                  Login
                </button>
              </div>
              <p className="login__leftExtra">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
          <div className="login__right">Login</div>
        </div>
      </div>
    );
  }
};

export default Login;
