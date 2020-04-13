import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Nav = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let user = useSelector((state) => state.auth.user);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  const authLinks = (
    <div className="nav__lisection">
      {user && (
        <div className="nav__welcome">
          <span>Welcome {user.username} </span>
          <li className="nav__logout">
            <a
              onClick={() => {
                dispatch(logout());
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
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav>
        <div>
          <h1>
            <span style={{ color: "#EC70C9" }}>Rota</span>Ready
          </h1>
          <ul>
            <div className="nav__lisection">
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
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </Fragment>
  );
};

export default Nav;
