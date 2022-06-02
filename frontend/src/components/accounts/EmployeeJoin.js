import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { register, registerEmployee } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";

const EmployeeJoin = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [idInfo, setIdInfo] = useState(false);

  const { id } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: idInfo.employee.first_name,
      last_name: idInfo.employee.last_name,
      username: idInfo.employee.email,
      email: idInfo.employee.email,
      password,
      password2,
      role: "User",
      code: id,
    };

    console.log(id);

    dispatch(register(newUser));
  };

  useEffect(() => {
    axios
      .post("/api/auth/verify", { uuid: id })
      .then((res) => {
        setIdInfo(res.data);
      })
      .catch((err) => {
        console.log(err.response.data, err.response.status);
        setIdInfo(true);
      });
  }, []);

  if (useSelector((state) => state.auth.isAuthenticated)) {
    return <Redirect to="/" />;
  }

  if (!idInfo) {
    return <Loading active={true} />;
  }

  return (
    <Fragment>
      {idInfo.has_error ? (
        <div className="wrapper--xs register register--sm">
          <h1 class="register__title">Error</h1>
          <p class="register__subtitle">{idInfo.error}</p>
        </div>
      ) : (
        <div className="wrapper--xs register">
          <h1 class="register__title">Hi {idInfo.employee.first_name}</h1>
          <p class="register__subtitle">
            You have been invited to join{" "}
            <strong>{idInfo.business.name}</strong>.
            <br />
            Fill out the details below to create your account.
          </p>
          <form onSubmit={onSubmit} className="register__form">
            <div className="register__fields">
              <div className="register__control">
                <label for="first_name">Password:</label>
                <input
                  required
                  autoFocus
                  className="register__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register__control">
                <label for="first_name">Confirm password:</label>
                <input
                  required
                  className="register__input"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="register__button">
              Get started
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default EmployeeJoin;
