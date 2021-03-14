import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableHeaders from "./TableHeaders";
import { getAbsences } from "../../actions/shifts";
import { format, parseISO } from "date-fns";

const AbsenceList = ({ listProps }) => {
  const dispatch = useDispatch();
  let shifts = useSelector((state) => state.shifts.shifts);
  let current = useSelector((state) => state.employees.current);
  const {
    action,
    selected,
    setSelected,
    selectAll,
    setSelectAll,
    filter,
  } = listProps;
  let width = useSelector((state) => state.responsive.width);

  useEffect(() => {
    dispatch(getAbsences(format(new Date(), "yyyy-MM-dd")), current.site.id);
  }, []);

  const toMinutes = (val) => {
    let n = new Date(0, 0);
    n.setMinutes(+val * 60);
    return n.getMinutes() > 0 ? `${n.getMinutes()}mins` : "";
  };

  return (
    <table>
      <TableHeaders
        check={false}
        items={shifts}
        titles={[
          { name: "Date" },
          { name: "Start Time" },
          { name: "End Time" },
          { name: "Absence" },
          { name: "Info", nomobile: true },
          { name: "Length", nomobile: true },
          { name: "Employee" },
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
            {format(
              parseISO(item.date),
              `${width < 1000 ? "ccc do MMM yyyy" : "cccc do MMMM yyyy"}`
            )}
          </td>
          <td>{item.start_time}</td>
          <td>{item.end_time}</td>
          <td>{item.absence}</td>
          <td>{item.absence_info}</td>
          <td className="no-mobile">
            {parseInt(item.length) > 0 ? `${parseInt(item.length)}hrs` : ""}{" "}
            {toMinutes(item.length)}
          </td>
          <td>{item.employee ? item.employee.full_name : "Open Shift"}</td>
        </tr>
      ))}
    </table>
  );
};

export default AbsenceList;
