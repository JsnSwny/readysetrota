import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import RegisterPersonalDetails from "./RegisterPersonalDetails";
import RegisterBusinessDetails from "./RegisterBusinessDetails";
import { number } from "prop-types";
import RegisterPassword from "./RegisterPassword";
import Loading from "../common/Loading";

const Register = (props) => {
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
  const [numberOfEmployees, setNumberOfEmployees] = useState(5);
  const [stage, setStage] = useState(1);
  const [role, setRole] = useState(`${path ? "User" : "Business"}`);
  let errors = useSelector((state) => state.errors.msg);
  const loading = useSelector((state) => state.loading.register);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    if (stage != 3) {
      setStage(stage + 1);
    } else {
      const newUser = {
        username: email.toLowerCase(),
        password,
        password2,
        email,
        role,
        businessName,
        first_name: firstName,
        last_name: lastName,
        numberOfEmployees,
      };
      dispatch(register(newUser));
    }
  };

  const currentSlide = () => {
    switch (stage) {
      case 1:
        return (
          <RegisterPersonalDetails
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
          />
        );
      case 2:
        return (
          <RegisterBusinessDetails
            businessName={businessName}
            setBusinessName={setBusinessName}
            numberOfEmployees={numberOfEmployees}
            setNumberOfEmployees={setNumberOfEmployees}
          />
        );
      case 3:
        return (
          <RegisterPassword
            password={password}
            setPassword={setPassword}
            password2={password2}
            setPassword2={setPassword2}
          />
        );
      default:
    }
  };

  const getButton = () => {
    switch (stage) {
      case 1:
        return (
          <div className="register__btn-wrapper">
            <button type="submit" className="register__button">
              Next Step
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex-container--between register__btn-wrapper register__btn-wrapper--half">
            <span
              className="register__button register__button--aqua"
              onClick={() => {
                setStage(stage - 1);
              }}
            >
              Previous Step
            </span>
            <button type="submit" className="register__button">
              Next Step
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex-container--between register__btn-wrapper register__btn-wrapper--half">
            <span
              onClick={() => setStage(stage - 1)}
              className="register__button register__button--aqua"
            >
              Previous Step
            </span>
            <button type="submit" className="register__button">
              Get started
            </button>
          </div>
        );
    }
  };

  if (useSelector((state) => state.auth.isAuthenticated)) {
    if (path) {
      return <Redirect to={path} />;
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return (
      <div className="wrapper--xs">
        <div class="register">
          <Loading active={loading} />
          <h1 className="register__title">Start your 30-day Free Trial</h1>
          <p className="register__subtitle">No Card Required.</p>

          <div className="progress">
            <div
              className={`progress__item ${stage == 1 ? "active" : ""} ${
                stage >= 1 ? "post-active" : ""
              }`}
            >
              <div className="progress__counter">1</div>
              <div className="progress__name">Personal Details</div>
            </div>
            <div
              className={`progress__item ${stage == 2 ? "active" : ""} ${
                stage >= 2 ? "post-active" : ""
              }`}
            >
              <div className="progress__counter">2</div>
              <div className="progress__name">Business Details</div>
            </div>
            <div
              className={`progress__item ${stage == 3 ? "active" : ""} ${
                stage >= 3 ? "post-active" : ""
              }`}
            >
              <div className="progress__counter">3</div>
              <div className="progress__name">Password</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="register__form">
            <div className="register__fields">{currentSlide()}</div>

            {getButton()}
          </form>
        </div>
      </div>
    );
  }
};

export default Register;
