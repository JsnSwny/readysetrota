import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const NavLink = ({ title, link, alignRight, perms }) => {
  const location = useLocation().pathname;
  let permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  if (perms && !permissions.some((item) => perms.includes(item))) {
    return false;
  }
  return (
    <li
      className={`nav__item ${alignRight ? "align" : ""} ${
        link == "" && location == "/"
          ? "active"
          : link && location.includes(link)
          ? "active"
          : ""
      }`}
    >
      <Link to={`/${link}`}>{title}</Link>
    </li>
  );
};
export default NavLink;
