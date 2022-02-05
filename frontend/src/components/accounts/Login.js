import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { location } = props;
  let errors = useSelector((state) => state.errors.msg);
  let path = { url: "/" };
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
          <h2>readysetrota</h2>
          <hr className="separator" />
          <form onSubmit={onSubmit} autoComplete="on">
            <div className="form__control">
              <label className="form-block__label">Email</label>
              <input
                type="email"
                className="form__input"
                name="email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                autoComplete="email"
              />
              <p className="error">{errors.username}</p>
            </div>
            <div className="form__control">
              <label className="form-block__label">Password</label>
              <input
                type="password"
                className="form__input"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
                value={password}
              />
              <p className="error">{errors.password}</p>
              <p className="error">{errors.non_field_errors}</p>
            </div>
            <div className="form__control">
              <button type="submit" className="btn-3">
                Login
              </button>
            </div>
            <p className="login__reset">
              <a href="/reset_password">Forgot Password? </a>
            </p>
          </form>
          <hr className="separator" />
          <div className="login__register">
            <h4>Don't have an account?</h4>
            <Link
              to={{
                pathname: `/register`,
                state: {
                  path,
                },
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
