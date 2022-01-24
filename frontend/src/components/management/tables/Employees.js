import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../../actions/employees";
import { parseISO, format } from "date-fns";
import Title from "../../common/Title";
import ListAction from "./ListAction";
import SearchField from "../SearchField";
import { Link } from "react-router-dom";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import { numberWithCommas } from "../../Utilities";
import ManagementPage from "../ManagementPage";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  const [filteredEmployees, setFilteredEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (employees.length > 0) {
      setFilteredEmployees(employees);
    }
  }, [employees]);

  return (
    <ManagementPage currentSection="Employees">
      {confirmOpen && selectedEmployee && (
        <ConfirmModal
          title={`Are you sure you want to delete ${selectedEmployee.full_name}?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteEmployee(selectedEmployee.id));
          }}
        />
      )}
      <div className="list-banner">
        <SearchField
          placeholder="Search employees..."
          setFilteredObjects={setFilteredEmployees}
          objs={employees}
          filterField={"full_name"}
        />
        <div className="list-banner__right">
          <Link to="/employees/create" className="btn-3">
            + Add Employee
          </Link>
        </div>
      </div>
      <table className="listing">
        <thead>
          <tr>
            <th>
              Name <i class="fas fa-sort"></i>
            </th>
            <th>Email</th>
            <th>
              Wage <i class="fas fa-sort"></i>
            </th>
            <th>
              Created <i class="fas fa-sort"></i>
            </th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 &&
            filteredEmployees.map((item) => (
              <tr className="listing__row">
                <td className="bold">
                  <span className="profile-picture">
                    {item.first_name.substr(0, 1)}
                    {item.last_name.substr(0, 1)}
                  </span>
                  {item.full_name}
                </td>
                <td className="highlight">jason@readysetcore.com</td>
                <td>
                  {item.current_wage &&
                    `£${numberWithCommas(item.current_wage.amount)} per ${
                      item.current_wage.type == "H" ? "hour" : "annum"
                    }`}{" "}
                </td>
                <td>{format(parseISO(item.created_at), "do MMM yyyy")}</td>
                <ListAction
                  actions={
                    <ul>
                      <Link to={`/employees/edit/${item.id}`}>
                        <li>Edit</li>
                      </Link>
                      <li
                        onClick={() => {
                          setSelectedEmployee(item);
                          setConfirmOpen(true);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  }
                />
              </tr>
            ))}
        </tbody>
      </table>
    </ManagementPage>
  );
};

export default Employees;
