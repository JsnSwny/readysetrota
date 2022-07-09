import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../../actions/employees";
import SmallModal from "../../layout/SmallModal";
import DepartmentForm from "../forms/DepartmentForm";
import { deleteDepartment } from "../../../actions/employees";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import Title from "../../common/Title";
import EmptyView from "../../layout/EmptyView";

const Departments = () => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);
  const loading = useSelector((state) => state.loading.departments);

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

  if (departments.length == 0 && !loading) {
    return (
      <Fragment>
        {open && (
          <SmallModal
            open={open}
            setOpen={setOpen}
            title={"Add a new department"}
          >
            <DepartmentForm setOpen={setOpen} />
          </SmallModal>
        )}
        <EmptyView
          title="You haven't added any departments yet"
          subtitle="Departments allow you to separate your employees for easier management (e.g. Floor and Kitchen)"
          button={{
            title: "Add a department",
            clickAction: () => setOpen(true),
          }}
        />
      </Fragment>
    );
  }

  return (
    <div className="wrapper--md">
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
      <Title
        name="Departments"
        subtitle="Manage your departments"
        buttons={[
          {
            name: "+ Add a department",
            clickAction: () => {
              setEditDepartment(false);
              setOpen(true);
            },
          },
        ]}
      />
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
                <td className="text-black font-bold">{item.name}</td>
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
    </div>
  );
};

export default Departments;
