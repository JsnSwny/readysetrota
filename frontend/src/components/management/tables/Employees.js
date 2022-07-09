import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllEmployees,
  batchDeleteEmployees,
  updateEmployee,
  deleteEmployee,
} from "../../../actions/employees";
import { sendInvite } from "../../../actions/auth";
import { parseISO, format } from "date-fns";
import ListAction from "./ListAction";
import { Link } from "react-router-dom";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import { numberWithCommas } from "../../Utilities";
import Title from "../../common/Title";
import EmptyView from "../../layout/EmptyView";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.all_employees);
  const current = useSelector((state) => state.employees.current);
  const loading = useSelector((state) => state.loading.employees);

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

  if (employees.length == 0 && !loading) {
    return (
      <EmptyView
        title="You haven't added any employees yet"
        subtitle="Once you have created an employee, you will be able to start creating shifts."
        button={{ title: "Add an employee", link: "/employees/create" }}
      />
    );
  }

  return (
    <div className="wrapper--md">
      <Title
        name="Employees"
        subtitle="Manage your employees"
        buttons={[{ name: "+ Add an employee", link: "/employees/create" }]}
      />
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
      <table className="listing">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden sm:table-cell">Wage</th>
            <th className="hidden sm:table-cell">Status</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <tr
              className={`listing__row ${
                isArchived(item.current_status?.end_date) ? "archived" : ""
              }`}
            >
              <td>
                <div className="flex items-center">
                  <span className="profile-picture mr-4">
                    {item.first_name.substr(0, 1)}
                    {item.last_name.substr(0, 1)}
                  </span>
                  <div>
                    <p className="bold text-black">{item.full_name}</p>

                    {!item.user && item.email ? (
                      <p
                        className="text-xs sm:text-sm link mt-1"
                        onClick={() =>
                          dispatch(sendInvite(item.email, item.uuid))
                        }
                      >
                        {item.has_been_invited
                          ? "Resend invite"
                          : "Send invite"}
                      </p>
                    ) : (
                      <p>{item.email}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                {item.current_wage
                  ? `£${numberWithCommas(item.current_wage.amount)} per ${
                      item.current_wage.type == "H" ? "hour" : "annum"
                    }`
                  : "N/A"}
              </td>
              <td className="hidden sm:table-cell">
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
    </div>
  );
};

export default Employees;
