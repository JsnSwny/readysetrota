import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  parseISO,
  
} from "date-fns";
import Pagination from "../../common/Pagination";

const SiteOverview = (props) => {


    let sites = useSelector((state) => state.employees.sites);
    const [currentPage, setCurrentPage] = useState(1);
    const [shiftsPerPage, setShiftsPerPage] = useState(5);
    const indexOfLastShift = currentPage * shiftsPerPage;
    const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
    const currentSites = sites.slice(indexOfFirstShift, indexOfLastShift);

    return (
        <div className="dashboard__block">
            <div className="dashboard__block-title-container">
              <p className="dashboard__block-title">Business Overview</p>
            </div>
            {currentSites.length > 0 ? (
              <div className="list dash">
                <table>
                  <tr>
                      <th>Site</th>
                      <th>Employees</th>
                      <th>Unpublished Shifts</th>
                      <th>Unmarked Availabilities</th>
                  </tr>
                  {currentSites.map(item => (
                      <tr>
                          <td>{item.name}</td>
                          <td>{item.number_of_employees}</td>
                          <td className={`${item.unpublished_shifts > 10 ? "red" : item.unpublished_shifts == 0 ? "green" : "orange"}`}>{item.unpublished_shifts}</td>
                          <td className={`${item.unmarked_holidays > 10 ? "red" : item.unmarked_holidays == 0 ? "green" : "orange"}`}>{item.unmarked_holidays}</td>
                      </tr>
                  ))} 
              </table>
            </div>
            ) : (
              <p className="dashboard__text helper-text">
                You currently have no sites.
              </p>
            )}

            <Pagination
              itemsPerPage={shiftsPerPage}
              totalItems={sites.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
    )
}

export default SiteOverview;