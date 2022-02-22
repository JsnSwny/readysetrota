import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePosition, getPositions } from "../../../actions/employees";
import TabItem from "../../common/TabItem";
import PersonalDetails from "../forms/employees-form/PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../../common/Title";
import SmallModal from "../../layout/SmallModal";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import SearchField from "../SearchField";
import ManagementPage from "../ManagementPage";
import PositionForm from "../forms/PositionForm";

const Positions = () => {
  const dispatch = useDispatch();

  let positions = useSelector((state) => state.employees.positions);
  const employees = useSelector((state) => state.employees.employees);
  const departments = useSelector((state) => state.employees.departments);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [filteredPositions, setFilteredPositions] = useState({});
  const [editPosition, setEditPosition] = useState(false);

  useEffect(() => {
    dispatch(getPositions(false));
  }, []);

  useEffect(() => {
    setFilteredPositions(positions);
  }, [positions]);

  return (
    <ManagementPage currentSection="Positions">
      {open && (
        <SmallModal
          title={
            editPosition ? `Edit ${editPosition.name}` : "Add a new position"
          }
          open={open}
          setOpen={setOpen}
        >
          <PositionForm setOpen={setOpen} editPosition={editPosition} />
        </SmallModal>
      )}

      {confirmOpen && selectedPosition && (
        <ConfirmModal
          title={`Are you sure you want to delete the ${selectedPosition.name} position?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deletePosition(selectedPosition.id));
          }}
        />
      )}

      <div className="list-banner">
        <SearchField
          placeholder="Search positions..."
          setFilteredObjects={setFilteredPositions}
          objs={positions}
          filterField={"name"}
        />
        <div className="list-banner__right">
          <button className="btn-3" onClick={() => setOpen(true)}>
            + Add Position
          </button>
        </div>
      </div>
      <table className="listing">
        <thead>
          <tr>
            <th>
              Name <i class="fas fa-sort"></i>
            </th>
            <th>Department</th>
            <th>No. of Employees</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {filteredPositions.length > 0 &&
            filteredPositions.map((item) => (
              <tr className="listing__row">
                <td className="bold">{item.name}</td>
                <td>{item.department.name}</td>
                <td>
                  {
                    employees.filter((employee) =>
                      employee.position.some((pos) => pos.id == item.id)
                    ).length
                  }
                </td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      className="fas fa-edit"
                      onClick={() => {
                        setEditPosition(item);
                        setOpen(true);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={() => {
                        setSelectedPosition(item);
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

export default Positions;
