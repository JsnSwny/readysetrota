import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PermissionItem = ({
  perm,
  permText,
  permHelper,
  permissions,
  setPermissions,
  indent,
}) => {
  let current = useSelector((state) => state.employees.current);
  return (
    <div
      className={`form__check ${indent ? "form__check--indent" : ""}`}
      onClick={(e) => {
        permissions.includes(perm)
          ? setPermissions(permissions.filter((item) => item != perm))
          : setPermissions([...permissions, perm]);
      }}
    >
      <input
        type="checkbox"
        checked={permissions.includes(perm)}
        name={perm}
      ></input>
      <label for={perm} className="form__label--inline">
        {permText}{" "}
        {permHelper && (
          <i class="fas fa-info-circle">
            <div>{permHelper}</div>
          </i>
        )}
      </label>
    </div>
  );
};

export default PermissionItem;
