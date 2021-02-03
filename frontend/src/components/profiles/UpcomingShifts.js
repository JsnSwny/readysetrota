import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  parseISO,
  
} from "date-fns";
import Pagination from "../common/Pagination";

const UpcomingShifts = (props) => {
    let shifts = useSelector((state) => state.shifts.user_shifts);
    const { employee } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [shiftsPerPage, setShiftsPerPage] = useState(5);
    const indexOfLastShift = currentPage * shiftsPerPage;
    const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
    const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);

    let departments = useSelector((state) => state.employees.departments);

    let business = useSelector((state) => state.auth.business);

    let published_shifts = currentShifts.filter((item) => item.published)
    

    return (
        <div className="dashboard__block">
            <div className="dashboard__block-title-container">
              <p className="dashboard__block-title">Upcoming Shifts</p>
              {published_shifts.length > 0 && (
                <a
                  className="btn-4"
                  target="_blank"
                  href={`/export?id=${employee && employee.id}`}
                >
                  Export Shifts as PDF
                </a>
              )}
            </div>
            {published_shifts.length > 0 ? (
              <div className="dashboard__block-container">
                <div className="dashboard__table-heading table">
                  <p className="short">Date</p>
                  <p className="short">Time</p>
                  <p className="long">Info</p>
                  <p className="short">Department</p>
                  <p className="short">Business</p>
                </div>

                {published_shifts.map((item) => (
                  <Fragment key={item.id}>
                    {!item.published && !business ? (
                      ""
                    ) : (
                      <div
                        className={`dashboard__table-row table ${
                          !item.published ? "unpublished" : ""
                        }`}
                      >
                        <p className="short">
                          <span className="block">
                            {format(parseISO(item.date, "dd-MM-yyyy"), "EEEE ")}
                          </span>
                          <span>
                            {format(
                              parseISO(item.date, "dd-MM-yyyy"),
                              "MMMM d yyyy"
                            )}
                          </span>
                        </p>
                        <p className="short">
                          {item.start_time} - {item.end_time}
                        </p>
                        <p className={`long ${item.info ? "" : "info"}`}>
                          {item.info ? item.info : "N/A"}
                        </p>
                        <p className="short extra">{departments.find(dep => dep.id == item.department).name}</p>
                        <p className="short extra">
                          {departments.find(dep => dep.id == item.department).business.name}
                        </p>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            ) : (
              <p className="dashboard__text helper-text">
                You currently have no upcoming shifts.
              </p>
            )}

            <Pagination
              itemsPerPage={shiftsPerPage}
              totalItems={published_shifts.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
    )
}

export default UpcomingShifts;