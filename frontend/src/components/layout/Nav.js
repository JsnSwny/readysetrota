import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Nav = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let user = useSelector((state) => state.auth.user);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  let employee = [];
  const authLinks = (
    <div className="nav__lisection">
      {user && (
        <div className="nav__welcome">
          <span>Welcome {user.username} </span>
          <li className="nav__logout">
            <a
              onClick={() => {
                dispatch(logout());
                setBurger(false);
              }}
            >
              Logout
            </a>
          </li>
        </div>
      )}
    </div>
  );

  const guestLinks = (
    <Fragment>
      <li
        onClick={() => {
          setBurger(false);
        }}
      >
        <Link to="/register">Register</Link>
      </li>
      <li
        onClick={() => {
          setBurger(false);
        }}
      >
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav>
        <div>
          <p className="nav__title">
            <Link to="/">
              <span>Ready</span>
              <span>Set</span>
              <span>Rota</span>
            </Link>
          </p>
          <ul>
            <div className="nav__lisection">
              {user &&
                (user.employee.length > 0 ||
                  user.profile.role == "Business") && (
                  <Fragment>
                    <Link to="/">
                      <li>Home</li>
                    </Link>
                    <Link to="/rota">
                      <li>Rota</li>
                    </Link>
                    {user && user.profile.role == "Business" && (
                      <Link to="/staff">
                        <li>Staff</li>
                      </Link>
                    )}
                  </Fragment>
                )}
            </div>
            <div className="nav__lisection">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
            <div
              onClick={() => {
                setBurger(!burger);
              }}
              className="hamburger"
            >
              <i class="fas fa-bars"></i>
            </div>
          </ul>
        </div>
      </nav>
      <div className={`hamburger__dropdown ${burger ? " active" : ""}`}>
        <ul>
          <Link to="/">
            <li
              onClick={() => {
                setBurger(false);
              }}
            >
              Home
            </li>
          </Link>
          <Link to="/rota">
            <li
              onClick={() => {
                setBurger(false);
              }}
            >
              Rota
            </li>
          </Link>
          {user && user.profile.role == "Business" && (
            <Link to="/staff">
              <li
                onClick={() => {
                  setBurger(false);
                }}
              >
                Staff
              </li>
            </Link>
          )}
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </Fragment>
  );
};

export default Nav;
