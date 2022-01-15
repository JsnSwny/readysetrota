import React, { useState, useEffect } from "react";
import SearchField from "../../SearchField";
import { useSelector } from "react-redux";

const Roles = ({
  positionList,
  setPositionList,
  selectedDepartments,
  setSelectedDepartments,
}) => {
  const departments = useSelector((state) => state.employees.departments);
  const positions = useSelector((state) => state.employees.positions);

  const [departmentSearch, setDepartmentSearch] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [positionSearch, setPositionSearch] = useState("");
  const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    setPositionList([
      ...positionList.filter((item) =>
        selectedDepartments.find((dep) => dep.id == item.department.id)
      ),
    ]);
  }, [selectedDepartments]);

  useEffect(() => {
    if (departments.length > 0) {
      setFilteredDepartments(departments);
    }
  }, [departments]);

  useEffect(() => {
    if (positions.length > 0) {
      setFilteredPositions(positions);
    }
  }, [positions]);

  return (
    <div className="roles-form">
      <div className="roles-form__section">
        <h4>Departments</h4>
        {selectedDepartments.length > 0 && (
          <ul className="tag-container">
            {selectedDepartments.map((item) => (
              <li className="tag">{item.name}</li>
            ))}
          </ul>
        )}

        <hr />
        <SearchField
          placeholder="Search departments..."
          searchValue={departmentSearch}
          setSearchValue={setDepartmentSearch}
          setFilteredObjects={setFilteredDepartments}
          objs={departments}
          filterField={"name"}
        />
        {filteredDepartments.map((item) => (
          <div
            className={`checkbox-container`}
            onClick={() =>
              selectedDepartments.find((dep) => dep.id == item.id)
                ? setSelectedDepartments([
                    ...selectedDepartments.filter((dep) => dep.id != item.id),
                  ])
                : setSelectedDepartments([...selectedDepartments, item])
            }
          >
            <span
              className={`checkbox--lg ${
                selectedDepartments.find((dep) => dep.id == item.id)
                  ? "checked"
                  : ""
              }`}
            >
              <i className="fas fa-check"></i>
            </span>{" "}
            {item.name}
          </div>
        ))}
      </div>
      <div className="roles-form__section">
        <h4>Positions</h4>
        {positionList.length > 0 && (
          <ul className="roles-form__list tag-container">
            {positionList.map((item) => (
              <li className="tag">{item.name}</li>
            ))}
          </ul>
        )}

        <hr />
        <SearchField
          placeholder="Search positions..."
          searchValue={positionSearch}
          setSearchValue={setPositionSearch}
          setFilteredObjects={setFilteredPositions}
          objs={positions}
          filterField={"name"}
        />
        {filteredPositions
          .filter((item) =>
            selectedDepartments.find((dep) => dep.id == item.department.id)
          )
          .map((item) => (
            <div
              className={`checkbox-container`}
              onClick={() =>
                positionList.find((pos) => pos.id == item.id)
                  ? setPositionList([
                      ...positionList.filter((pos) => pos.id != item.id),
                    ])
                  : setPositionList([...positionList, item])
              }
            >
              <span
                className={`checkbox--lg ${
                  positionList.find((pos) => pos.id == item.id) ? "checked" : ""
                }`}
              >
                <i className="fas fa-check"></i>
              </span>{" "}
              <div>
                {item.name}
                <h5>{item.department.name}</h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Roles;
