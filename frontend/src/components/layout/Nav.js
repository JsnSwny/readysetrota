import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
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
            <li>Rota</li>
            <Link to="/staff">
              <li>Staff</li>
            </Link>
          </div>
          <div className="nav__lisection">
            <li>Logout</li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
