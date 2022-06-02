import React from "react";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";

const Permissions = ({ permissions, setPermissions }) => {
  const permission_types = useSelector(
    (state) => state.permissions.permission_types
  );

  return (
    <div>
      {/* <Multiselect
        options={permission_types.map((item) => ({
          name: item.name,
          id: item.id,
        }))}
        className="react-select"
        selectedValues={permissions}
        onSelect={(e) => {
          setPermissions(e);
        }}
        onRemove={(e) => {
          setPermissions(e);
        }}
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox
        placeholder={"Select Permission(s)"}
      /> */}
      <Select
        isMulti
        options={permission_types.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        className="react-select-container"
        classNamePrefix="react-select"
        value={permissions}
        onChange={(e) => {
          setPermissions(e);
        }}
        placeholder={"Select position(s)"}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default Permissions;
