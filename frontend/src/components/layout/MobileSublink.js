import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileSublink = ({ title, link, closeNav, perm }) => {
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );

  if (perm && !permissions.includes(perm)) {
    return false;
  }
  return (
    <li className="mobile-nav__sublink">
      <Link to={link} onClick={() => closeNav()}>
        {title}
      </Link>
    </li>
  );
};

export default MobileSublink;
