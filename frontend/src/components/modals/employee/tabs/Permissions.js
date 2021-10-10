import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSite } from "../../../../actions/employees";
import PermissionItem from "./PermissionItem";

const Permissions = ({ permissions, setPermissions }) => {
  const permProps = { permissions, setPermissions };
  return (
    <div className="form__perms">
      <h3>Staff Management</h3>
      <PermissionItem
        perm="manage_departments"
        permText="Manage Departments"
        permHelper="Create, Update and Delete Departments (Access to all departments in site)"
        {...permProps}
      />
      <PermissionItem
        perm="manage_positions"
        permText="Manage Positions"
        permHelper="Create, Update and Delete Positions"
        {...permProps}
      />
      <h4>Employees</h4>
      <PermissionItem
        perm="manage_employees"
        permText="Manage Employees"
        permHelper="Create, Update and Delete Employees"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="manage_wages"
        permText="Manage Employee Wages"
        permHelper="Allow to set an employee's wage in staff creation"
        {...permProps}
        indent={true}
      />
      <h3>Rota</h3>
      <PermissionItem
        perm="manage_shifts"
        permText="Manage Shifts"
        permHelper="Create, Update and Delete Shifts"
        {...permProps}
      />
      <h4>Forecast</h4>
      <PermissionItem
        perm="create_forecasts"
        permText="Create Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <PermissionItem
        perm="view_forecasts"
        permText="View Forecasts"
        {...permProps}
        indent={true}
      />
      <h3>Availabilities</h3>
      <PermissionItem
        perm="manage_availabilities"
        permText="Manage Availabilities"
        {...permProps}
      />
      <h3>Statistics</h3>
      <PermissionItem perm="view_stats" permText="View Stats" {...permProps} />
    </div>
  );
};

export default Permissions;
