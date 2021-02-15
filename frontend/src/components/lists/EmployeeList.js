import React from "react";
import { useSelector } from "react-redux";
import TableHeaders from "./TableHeaders";

const EmployeeList = ({ listProps }) => {
  let employees = useSelector((state) => state.employees.employees);
  let current = useSelector((state) => state.employees.current);
  const {
    action,
    selected,
    setSelected,
    selectAll,
    setSelectAll,
    filter,
  } = listProps;

  return (
    <table>
      <TableHeaders
        check={true}
        items={employees}
        titles={[
          { name: "First name" },
          { name: "Last name" },
          { name: "Positions" },
          { name: "Departments" },
          { name: "Wage" },
        ]}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        setSelected={setSelected}
      />
      {employees.map((item) => (
        <tr
          onClick={() =>
            selected.some((sel) => sel.id == item.id)
              ? setSelected(selected.filter((sel) => sel.id != item.id))
              : setSelected([...selected, item])
          }
          className={`${
            selected.some((sel) => sel.id == item.id) ? "selected" : ""
          }`}
        >
          <td>
            <input
              checked={selected.some((sel) => sel.id == item.id)}
              type="checkbox"
            ></input>
          </td>

          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>
            {item.position
              .map((pos) => pos.department.site == current.site && pos.name)
              .join(", ")}
          </td>
          <td>
            {item.position
              .map(
                (pos) =>
                  pos.department.site == current.site && pos.department.name
              )
              .join(", ")}
          </td>
          <td>
            {item.wage} ({item.wage_type})
          </td>
        </tr>
      ))}
    </table>
  );
};

export default EmployeeList;
