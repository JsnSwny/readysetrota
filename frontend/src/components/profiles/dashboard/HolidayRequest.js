import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import Pagination from "../../common/Pagination";
import { Link } from "react-router-dom";

const HolidayRequest = (props) => {
  const { admin } = props;

  let holidays = useSelector((state) => state.employees.holidays);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredHolidays, setFilteredHolidays] = useState(holidays);
  const [filter, setFilter] = useState(admin ? "Unmarked" : "All");

  useEffect(() => {
    if (filter == "All") {
      setFilteredHolidays(holidays);
    } else if (filter == "Unmarked") {
      setFilteredHolidays(holidays.filter((item) => item.approved === null));
    } else if (filter == "Unapproved") {
      setFilteredHolidays(holidays.filter((item) => item.approved === false));
    } else if (filter == "Approved") {
      setFilteredHolidays(holidays.filter((item) => item.approved));
    }
  }, [filter, holidays]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHolidays = filteredHolidays.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div
      className={`dashboard__block${
        admin ? "" : "--half"
      } dashboard__block-container`}
    >
      <div className="dashboard__block-title-container">
        <p className="dashboard__block-title">
          {admin ? "" : "Your"} Availability Requests
        </p>
      </div>
      {admin && (
        <Fragment>
          <p>
            You have {holidays.filter((item) => item.approved == null).length}{" "}
            unmarked availabilities to review.
          </p>
          <Link className="link" to="/list/holidays">
            View all availability requests
          </Link>
        </Fragment>
      )}
      {currentHolidays.length == 0 && <p>No availabilities to display</p>}
      {currentHolidays.length > 0 && (
        <div className="list dash">
          <table>
            <tr>
              {admin && <th>Employee</th>}
              <th>Date</th>
              <th>Type</th>
              <th>Approved</th>
              {admin && <th>Requested</th>}
            </tr>
            {currentHolidays.map((item) => (
              <tr>
                {admin && <td>{item.employee.full_name}</td>}
                <td>{format(parseISO(item.date), "cccc do MMMM yyyy")}</td>
                <td>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </td>
                <td>
                  {item.approved == null
                    ? "Unmarked"
                    : item.approved
                    ? "Approved"
                    : "Not Approved"}
                </td>
                {admin && (
                  <td>
                    {format(parseISO(item.updated_at), "cccc do MMMM yyyy")}
                  </td>
                )}
              </tr>
            ))}
          </table>
        </div>
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredHolidays.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HolidayRequest;
