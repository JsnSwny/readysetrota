import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllEmployees,
  getPositions,
  batchDeleteEmployees,
  updateEmployee,
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
  const employees = useSelector((state) => state.employees.all_employees);
  const current = useSelector((state) => state.employees.current);

  const [filteredEmployees, setFilteredEmployees] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmRestoreOpen, setConfirmRestoreOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    if (employees.length == 0) {
      dispatch(getAllEmployees());
    }
  }, [current.site]);

  const handleCheckChange = (employee) => {
    if (selectedEmployees.some((item) => item.id == employee.id)) {
      setSelectedEmployees(
        selectedEmployees.filter((item) => item.id != employee.id)
      );
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const isArchived = (date) => {
    return parseISO(date) <= new Date();
  };

  return (
    <ManagementPage currentSection="Employees">
      {confirmOpen && selectedEmployees && (
        <ConfirmModal
          title={`Are you sure you want to archive this employee? This will delete all of their future shifts`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(
              batchDeleteEmployees(selectedEmployees.map((item) => item))
            );
          }}
          actionTitle="Archive"
        />
      )}
      {confirmRestoreOpen && selectedEmployees && (
        <ConfirmModal
          title={`Are you sure you want to restore this employee?`}
          open={confirmRestoreOpen}
          setOpen={setConfirmRestoreOpen}
          setConfirmOpen={setConfirmRestoreOpen}
          action={() => {
            dispatch(
              updateEmployee(selectedEmployees[0].id, {
                first_name: selectedEmployees[0].first_name,
                last_name: selectedEmployees[0].last_name,
                start_working_date: format(new Date(), "yyyy-MM-dd"),
                end_working_date: null,
              })
            );
          }}
          actionTitle="Restore"
        />
      )}
      {confirmDeleteOpen && selectedEmployees && (
        <ConfirmModal
          title={`Are you sure you want to delete this employee?`}
          open={confirmDeleteOpen}
          setOpen={setConfirmDeleteOpen}
          setConfirmOpen={setConfirmDeleteOpen}
          action={() => {
            dispatch(deleteEmployee(selectedEmployees[0].id));
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

        {/* <div className="list-dropdown">
          Actions
          <ul>
            <li>Show Archived Employees</li>
            <li>Delete Selected Employees</li>
          </ul>
        </div> */}

        <div className="list-banner__right">
          {/* <button
            className="btn-3"
            onClick={() =>
              dispatch(
                batchDeleteEmployees(selectedEmployees.map((item) => item))
              )
            }
          >
            Delete All
          </button> */}
          <Link to="/employees/create" className="btn-3">
            + Add Employee
          </Link>
        </div>
      </div>
      <table className="listing">
        <thead>
          <tr>
            {/* <th className="selector">
              <input
                type="checkbox"
                onClick={(e) => {
                  e.target.checked
                    ? setSelectedEmployees(employees)
                    : setSelectedEmployees([]);
                }}
              />
            </th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Wage</th>
            <th className="hide-mobile">Status</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 &&
            filteredEmployees.map((item) => (
              <tr
                className={`listing__row ${
                  isArchived(item.current_status?.end_date) ? "archived" : ""
                }`}
              >
                {/* <td>
                  <input
                    checked={selectedEmployees.some(
                      (employee) => employee.id == item.id
                    )}
                    onChange={() => handleCheckChange(item)}
                    type="checkbox"
                  />
                </td> */}
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
                <td className="hide-tablet">
                  {item.current_status && (
                    <Fragment>
                      {format(
                        parseISO(item.current_status.start_date),
                        "dd/MM/yyyy"
                      )}{" "}
                      -{" "}
                      {item.current_status.end_date
                        ? format(
                            parseISO(item.current_status.end_date),
                            "dd/MM/yyyy"
                          )
                        : "Present"}
                    </Fragment>
                  )}
                </td>
                {isArchived(item.current_status?.end_date) ? (
                  <ListAction
                    actions={
                      <ul>
                        <li
                          onClick={() => {
                            setSelectedEmployees([item]);
                            setConfirmRestoreOpen(true);
                          }}
                        >
                          Restore
                        </li>
                        {item.total_shifts == 0 && (
                          <li
                            onClick={() => {
                              setSelectedEmployees([item]);
                              setConfirmDeleteOpen(true);
                            }}
                          >
                            Permanently Delete
                          </li>
                        )}
                      </ul>
                    }
                  />
                ) : (
                  <ListAction
                    actions={
                      <ul>
                        <Link to={`/employees/edit/${item.id}`}>
                          <li>Edit</li>
                        </Link>
                        <li
                          onClick={() => {
                            setSelectedEmployees([item]);
                            setConfirmOpen(true);
                          }}
                        >
                          Archive
                        </li>
                        {item.total_shifts == 0 && (
                          <li
                            onClick={() => {
                              setSelectedEmployees([item]);
                              setConfirmDeleteOpen(true);
                            }}
                          >
                            Permanently Delete
                          </li>
                        )}
                      </ul>
                    }
                  />
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </ManagementPage>
  );
};

export default Employees;
