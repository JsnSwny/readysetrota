import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavLink = (props) => {
  const {
    link,
    icon,
    title,
    setSidebarOpen,
    sidebarOpen,
    toggleNav,
    disabled,
    dropdown,
    dropdownAction,
    disabledMessage,
  } = props;
  return (
    <div
      className={`sidenav__link-container ${
        location.pathname == link ? "current" : ""
      } ${disabled ? "disabled" : ""}`}
    >
      <div
        onClick={() => disabled && toast.error(disabledMessage)}
        className="sidenav__link"
      >
        <Link
          onClick={() => {
            toggleNav();
          }}
          to={link}
        >
          <div className="sidenav__link-text">
            <i className={icon}></i> {title}
          </div>
        </Link>
        {dropdown && (
          <i onClick={dropdownAction} className="fas fa-chevron-down"></i>
        )}
      </div>
    </div>
  );
};
export default NavLink;
