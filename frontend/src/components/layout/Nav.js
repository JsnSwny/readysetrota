import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Nav = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let user = useSelector((state) => state.auth.user);
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
    <div className="nav__lisection">
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </div>
  );

  return (
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
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
