import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileLink = ({
  closeNav,
  icon,
  title,
  link,
  openDropdown,
  setOpenDropdown,
  children,
  onClick,
  perms,
}) => {
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  if (perms && !permissions.some((item) => perms.includes(item))) {
    return false;
  }
  return (
    <Fragment>
      <li className="mobile-nav__link" onClick={onClick}>
        <Link to={link} onClick={() => closeNav()}>
          <i class={`fas ${icon}`}></i>
          {title}
        </Link>
        {children &&
          (!perms || perms.some((item) => permissions.includes(item))) && (
            <i
              className={`fas fa-angle-down ${
                openDropdown == title ? "active" : ""
              }`}
              onClick={() =>
                openDropdown != title
                  ? setOpenDropdown(title)
                  : setOpenDropdown(false)
              }
            ></i>
          )}
      </li>
      <div
        className={`mobile-nav__sublinks ${
          openDropdown == title ? "open" : ""
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default MobileLink;
