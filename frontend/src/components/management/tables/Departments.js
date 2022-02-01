import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../../actions/employees";
import SmallModal from "../../layout/SmallModal";
import DepartmentForm from "../forms/DepartmentForm";
import { deleteDepartment } from "../../../actions/employees";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import SearchField from "../SearchField";
import ManagementPage from "../ManagementPage";

const Departments = () => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState({});
  const [nameSortAZ, setNameSortAZ] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  useEffect(() => {
    setFilteredDepartments(departments);
  }, [departments]);

  return (
    <ManagementPage currentSection="Departments">
      {open && (
        <SmallModal
          open={open}
          setOpen={setOpen}
          title={
            editDepartment
              ? `Edit ${editDepartment.name}`
              : "Add a new department"
          }
        >
          <DepartmentForm setOpen={setOpen} editDepartment={editDepartment} />
        </SmallModal>
      )}

      {confirmOpen && selectedDepartment && (
        <ConfirmModal
          title={`Are you sure you want to delete the ${selectedDepartment.name} department?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteDepartment(selectedDepartment.id));
          }}
        />
      )}

      <div className="list-banner">
        <SearchField
          placeholder="Search departments..."
          setFilteredObjects={setFilteredDepartments}
          objs={departments}
          filterField={"name"}
        />
        <div className="list-banner__right">
          <button
            className="btn-3"
            onClick={() => {
              setEditDepartment(false);
              setOpen(true);
            }}
          >
            + Add Department
          </button>
        </div>
      </div>
      <table className="listing">
        <thead>
          <tr>
            <th>
              Name{" "}
              <i
                class="fas fa-sort"
                onClick={() => {
                  let sortedArray = [...filteredDepartments].sort((a, b) => {
                    return !nameSortAZ
                      ? a.name.localeCompare(b.name)
                      : b.name.localeCompare(a.name);
                  });
                  setNameSortAZ(!nameSortAZ);

                  setFilteredDepartments(sortedArray);
                }}
              ></i>
            </th>
            <th>No. of Employees</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.length > 0 &&
            filteredDepartments.map((item) => (
              <tr className="listing__row">
                <td className="bold">{item.name}</td>
                <td>{item.number_of_employees}</td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      class="fas fa-edit"
                      onClick={() => {
                        setEditDepartment(item);
                        setOpen(true);
                      }}
                    ></i>
                    <i
                      class="fas fa-trash"
                      onClick={() => {
                        setSelectedDepartment(item);
                        setConfirmOpen(true);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </ManagementPage>
  );
};

export default Departments;
