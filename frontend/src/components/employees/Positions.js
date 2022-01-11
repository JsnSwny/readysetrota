import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePosition } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";
import PositionForm from "./PositionForm";
import SmallModal from "./SmallModal";
import ConfirmModal from "./ConfirmModal";
import SearchField from "./SearchField";

const Positions = () => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let positions = useSelector((state) => state.employees.positions);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  const employees = useSelector((state) => state.employees.employees);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [positionSearch, setPositionSearch] = useState("");
  const [filteredPositions, setFilteredPositions] = useState({});

  useEffect(() => {
    if (positions.length > 0) {
      setFilteredPositions(positions);
    }
  }, [positions]);

  return (
    <Fragment>
      {open && (
        <SmallModal
          open={open}
          setOpen={setOpen}
          form={<PositionForm open={open} setOpen={setOpen} />}
          title="Add a new position"
        />
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
          searchValue={positionSearch}
          setSearchValue={setPositionSearch}
          setFilteredObjects={setFilteredPositions}
          objs={positions}
          filterField={"name"}
        />
        <div className="list-banner__right">
          {/* <div>Departments</div>
          <div>Positions</div> */}
          <button className="btn-3" onClick={() => setOpen(true)}>
            + Add Position
          </button>
        </div>
      </div>
      <div className="employees">
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
                      <i class="fas fa-edit"></i>
                      <i
                        class="fas fa-trash"
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
      </div>
    </Fragment>
  );
};

export default Positions;
