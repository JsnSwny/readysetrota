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
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { toast } from "react-toastify";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const current = useSelector((state) => state.employees.current);

  const [filteredEmployees, setFilteredEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    dispatch(getEmployees(true, false));
  }, [current.site]);

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
            <th className="hide-mobile">
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
                  <span className="profile-picture hide-tablet">
                    {item.first_name.substr(0, 1)}
                    {item.last_name.substr(0, 1)}
                  </span>
                  {item.full_name}
                </td>
                {item.user ? (
                  <td>{item.user.email}</td>
                ) : (
                  <td>
                    <p
                      className="highlight"
                      onClick={(e) => {
                        toast.info(
                          <div>
                            {`${item.first_name} ${item.last_name}`}
                            <br /> UUID copied! <br /> <br />{" "}
                            <small>{item.uuid}</small>
                          </div>
                        );
                        copyToClipboard(
                          `www.readysetrota.com/join/${item.uuid}/`
                        );
                      }}
                    >
                      Copy invite link
                    </p>
                  </td>
                )}
                <td>
                  {item.current_wage &&
                    `£${numberWithCommas(item.current_wage.amount)} per ${
                      item.current_wage.type == "H" ? "hour" : "annum"
                    }`}{" "}
                </td>
                <td className="hide-mobile">
                  {format(parseISO(item.created_at), "do MMM yyyy")}
                </td>
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
