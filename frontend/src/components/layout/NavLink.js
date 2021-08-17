import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const NavLink = ({ title, link, alignRight }) => {
  const location = useLocation().pathname;
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
