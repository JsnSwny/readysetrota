import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { format, parseISO } from "date-fns";
import { batchPublish, batchDeleteShifts } from "../../actions/shifts";
import DropButton from "./DropButton";
import TableHeaders from "./TableHeaders";

const ShiftList = ({ listProps }) => {
  const dispatch = useDispatch();
  const { action, selected, setSelected, selectAll, setSelectAll } = listProps;

  let shifts = useSelector((state) => state.shifts.shifts);
  let width = useSelector((state) => state.responsive.width);

  useEffect(() => {
    dispatch(getShifts(format(new Date(), "yyyy-MM-dd"), "", true));
  }, []);

  const toMinutes = (val) => {
    let n = new Date(0, 0);
    n.setMinutes(+val * 60);
    return n.getMinutes() > 0 ? `${n.getMinutes()}mins` : "";
  };

  const publishAction = {
    name: "Publish",
    action: () => action("Shifts Published", batchPublish(selected, true)),
  };
  const unpublishAction = {
    name: "Unpublish",
    action: () => action("Shifts Unpublished", batchPublish(selected, false)),
  };
  const deleteAction = {
    name: "Delete",
    action: () => action("Shifts Deleted", batchDeleteShifts(selected)),
  };
  return (
    <Fragment>
      <DropButton
        title="Actions"
        actions={[publishAction, unpublishAction, deleteAction]}
      />
      <table>
        <TableHeaders
          check={true}
          items={shifts}
          titles={[
            { name: "Date" },
            { name: "Start Time" },
            { name: "End Time" },
            { name: "Length", nomobile: true },
            { name: "Break", nomobile: true },
            { name: "Cost", nomobile: true },
            { name: "Employee" },
            { name: "Stage" },
          ]}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          setSelected={setSelected}
        />
        {shifts.map((item) => (
          <tr
            className={`${
              selected.some((sel) => sel.id == item.id) ? "selected" : ""
            }`}
          >
            <td>
              <input
                checked={selected.some((sel) => sel.id == item.id)}
                onClick={() =>
                  selected.some((sel) => sel.id == item.id)
                    ? setSelected(selected.filter((sel) => sel.id != item.id))
                    : setSelected([...selected, item])
                }
                type="checkbox"
              ></input>
            </td>
            <td>
              {format(
                parseISO(item.date),
                `${width < 1000 ? "ccc do MMM yyyy" : "cccc do MMMM yyyy"}`
              )}
            </td>
            <td>{item.start_time}</td>
            <td>{item.end_time}</td>
            <td className="no-mobile">
              {parseInt(item.length) > 0 ? `${parseInt(item.length)}hrs` : ""}{" "}
              {toMinutes(item.length)}
            </td>
            <td className="no-mobile">{item.break_length}mins</td>
            <td className="no-mobile">
              {item.employee
                ? item.employee.wage_type == "H"
                  ? `£${item.length * item.wage}`
                  : "Salary"
                : ""}
            </td>
            {console.log(item)}
            <td>{item.employee ? item.employee.full_name : "Open Shift"}</td>
            <td>{item.stage}</td>
          </tr>
        ))}
      </table>
    </Fragment>
  );
};

export default ShiftList;
