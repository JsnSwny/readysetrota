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
      <nav className="nav">
        <Link className="nav__title-link" to="/">
          <img className="nav__title" src="/static/media/logo-01.svg"></img>
        </Link>
        <ul>
          <div className="nav__lisection">
            {user && (
              <Fragment>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/rota">
                  <li>Rota</li>
                </Link>
                {user && !user.business && (
                  <Link to="/join">
                    <li>Join</li>
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
            <i className="fas fa-bars"></i>
          </div>
        </ul>
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
          {user && !user.business && (
            <Link to="/join">
              <li
                onClick={() => {
                  setBurger(false);
                }}
              >
                Join
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
