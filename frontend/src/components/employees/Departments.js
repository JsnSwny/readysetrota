import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getPositions } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";
import SmallModal from "./SmallModal";
import DepartmentForm from "./DepartmentForm";
import { deleteDepartment } from "../../actions/employees";
import ConfirmModal from "./ConfirmModal";
import SearchField from "./SearchField";

const Departments = () => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let departments = useSelector((state) => state.employees.departments);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState({});
  const [nameSortAZ, setNameSortAZ] = useState(false);

  useEffect(() => {
    if (departments.length > 0) {
      setFilteredDepartments(departments);
    }
  }, [departments]);

  useEffect(() => {
    console.log(filteredDepartments);
  }, [filteredDepartments]);

  return (
    <Fragment>
      {open && (
        <SmallModal
          open={open}
          setOpen={setOpen}
          form={<DepartmentForm open={open} setOpen={setOpen} />}
          title="Add a new department"
        />
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
          searchValue={departmentSearch}
          setSearchValue={setDepartmentSearch}
          setFilteredObjects={setFilteredDepartments}
          objs={departments}
          filterField={"name"}
        />
        <div className="list-banner__right">
          <button
            className="btn-3"
            onClick={() => {
              setOpen(true);
            }}
          >
            + Add Department
          </button>
        </div>
      </div>
      <div className="employees">
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
                      <i class="fas fa-edit"></i>
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
      </div>
    </Fragment>
  );
};

export default Departments;
