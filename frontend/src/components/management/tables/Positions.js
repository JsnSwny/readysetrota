import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePosition, getPositions } from "../../../actions/employees";
import TabItem from "../../common/TabItem";
import PersonalDetails from "../forms/employees-form/PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../../common/Title";
import SmallModal from "../../layout/SmallModal";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import PositionForm from "../forms/PositionForm";
import EmptyView from "../../layout/EmptyView";

const Positions = () => {
  const dispatch = useDispatch();

  let positions = useSelector((state) => state.employees.positions);
  const employees = useSelector((state) => state.employees.employees);
  const loading = useSelector((state) => state.loading.positions);
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

  if (positions.length == 0 && !loading) {
    return (
      <Fragment>
        {open && (
          <SmallModal
            title={"Add a new position"}
            open={open}
            setOpen={setOpen}
          >
            <PositionForm setOpen={setOpen} />
          </SmallModal>
        )}
        <EmptyView
          title="You haven't added any positions yet"
          subtitle="You can use positions to assign to employees and then to set roles
  for individual shifts."
          button={{
            title: "Add a position",
            clickAction: () => {
              setOpen(true);
            },
          }}
        />
      </Fragment>
    );
  }

  return (
    <div className="wrapper--md flex-1 flex flex-col">
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
      <Title
        name="Positions"
        subtitle="Manage your positions"
        buttons={[
          {
            name: "+ Add a position",
            clickAction: () => {
              setOpen(true);
            },
          },
        ]}
      />
      <table className="listing">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden sm:table-cell">Department</th>
            <th>No. of Employees</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {positions.map((item) => (
            <tr className="listing__row">
              <td className="text-black font-bold">{item.name}</td>
              <td className="hidden sm:table-cell">{item.department.name}</td>
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
    </div>
  );
};

export default Positions;
