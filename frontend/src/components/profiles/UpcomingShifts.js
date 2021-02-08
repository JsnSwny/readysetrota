import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  parseISO,
  
} from "date-fns";
import Pagination from "../common/Pagination";

const UpcomingShifts = (props) => {
    const { employee, admin, shifts, title, allow_export } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [shiftsPerPage, setShiftsPerPage] = useState(5);
    const indexOfLastShift = currentPage * shiftsPerPage;
    const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
    const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);

    let departments = useSelector((state) => state.employees.departments);

    let width = useSelector((state) => state.responsive.width)

    let business = useSelector((state) => state.auth.business);

    let published_shifts = currentShifts.filter((item) => item.published)

    if(!shifts.some(item => departments.some(dep => dep.id == item.department))) {
      return false;
    }

    const toMinutes = (val) => {
      let n = new Date(0,0);
      n.setMinutes(+val * 60);
      return n.getMinutes() > 0 ? `${n.getMinutes()}mins` : "";
  }

    return (
        <div className="dashboard__block">
            <div className="dashboard__block-title-container">
              <p className="dashboard__block-title">{title}</p>
              {published_shifts.length > 0 && allow_export && (
                <a
                  className="btn-7"
                  target="_blank"
                  href={`/export?id=${employee && employee.id}`}
                >
                  <i class="fas fa-file-export"></i> Export Shifts
                </a>
              )}
            </div>
            {published_shifts.length > 0 ? (
              <div className="list dash">
                <table>
                  <tr>
                      <th>Date</th>
                      <th>Start time</th>
                      <th>End time</th>
                      <th className="no-mobile">Length</th>
                      <th className="no-mobile">Pay</th>
                      {admin && <th>Employee</th>}
                      {admin && <th>Published</th>}
                  </tr>
                  {published_shifts.map(item => (
                      <tr>
                          <td>{format(parseISO(item.date), `${width < 1000 ? "ccc do MMM yyyy" : "cccc do MMMM yyyy"}`)}</td>
                          <td>{item.start_time}</td>
                          <td>{item.end_time}</td>
                          <td className="no-mobile">{parseInt(item.length) > 0 ? `${parseInt(item.length)}hrs` : ""} {toMinutes(item.length)}</td>
                          <td className="no-mobile">£{item.length * item.wage}</td>
                          {admin && <td>{item.employee ? item.employee.full_name : "Open Shift"}</td>}
                          {admin && <td>{item.published ? "Published" : "Not Published"}</td>}
                      </tr>
                  ))} 
              </table>
            </div>
            ) : (
              <p className="dashboard__text helper-text">
                You currently have no upcoming shifts.
              </p>
            )}

            <Pagination
              itemsPerPage={shiftsPerPage}
              totalItems={shifts.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
    )
}

export default UpcomingShifts;