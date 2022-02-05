import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const NavLink = ({ title, link, perms, dropdown }) => {
  const location = useLocation().pathname;
  let permissions = useSelector(
    (state) => state.permissions.active_permissions
  );
  if (perms && !permissions.some((item) => perms.includes(item))) {
    return false;
  }

  const isActive = (sublink) => {
    if (!sublink) {
      return link == "" && location == "/"
        ? "active"
        : !dropdown
        ? link && location.includes(link)
          ? "active"
          : ""
        : location.includes(link) ||
          dropdown.some((item) => location.includes(item.link))
        ? "active"
        : "";
    } else {
      return location.includes(sublink) ? "active" : "";
    }
  };

  return (
    <li className={`nav__item ${isActive()}`}>
      <Link className="nav__item-link" to={`/${link}`}>
        {title}{" "}
        {dropdown &&
        dropdown.some((item) => permissions.includes(item.perm)) ? (
          <i class="fas fa-angle-down"></i>
        ) : (
          ""
        )}
      </Link>
      {dropdown && (
        <ul className="nav__dropdown">
          {dropdown.map(
            (item) =>
              !item.perm ||
              (permissions.some((perm) => item.perm == perm) && (
                <li className={`${isActive(item.link)}`}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))
          )}
        </ul>
      )}
    </li>
  );
};
export default NavLink;
