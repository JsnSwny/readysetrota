import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { location, history } = props;
  let errors = useSelector((state) => state.errors.msg);
  let path = "/";
  if (location.state) {
    path = location.state;
  }

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username.toLowerCase(), password));
  };

  if (useSelector((state) => state.auth.isAuthenticated)) {
    return <Redirect to={path.url} />;
  } else {
    return (
      <div className="login">
        <div className="login__box">
          <div className="login__left login__part">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control input-1"
                  name="email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
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
                <p className="error">{errors.non_field_errors}</p>
              </div>
              <div className="form-group">
                <button type="submit" className="btn-2">
                  Login
                </button>
              </div>
              <p className="login__leftExtra">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <p className="login__leftExtra">
                <a href="/reset_password">Forgot Password? </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
