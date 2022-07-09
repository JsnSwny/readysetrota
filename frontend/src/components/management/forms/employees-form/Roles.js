import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import { components } from "react-select";

const Roles = ({
  positionList,
  setPositionList,
  selectedDepartments,
  setSelectedDepartments,
}) => {
  const departments = useSelector((state) => state.employees.departments);
  const positions = useSelector((state) => state.employees.positions);
  let errors = useSelector((state) => state.errors.msg);

  const options = departments.map((item) => ({
    label: item.name,
    options: positions
      .filter((pos) => pos.department.id == item.id)
      .map((pos) => ({ label: pos.name, value: pos.id })),
  }));

  return (
    <div className="roles-form">
      <Select
        isMulti
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        value={positionList}
        onChange={(e) => {
          setPositionList(e);
        }}
        placeholder={"Select position(s)"}
        hideSelectedOptions={false}
      />
    </div>
  );
};

export default Roles;
