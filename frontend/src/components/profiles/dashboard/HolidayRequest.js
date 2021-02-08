import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { updateAvailability } from "../../../actions/employees";
import { useDispatch } from "react-redux";
import Pagination from "../../common/Pagination";
import { Link } from "react-router-dom";

const HolidayRequest = (props) => {
  const { admin } = props;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  let holidays = useSelector((state) => state.employees.holidays);
  const [filteredHolidays, setFilteredHolidays] = useState(holidays);

  

  const [filter, setFilter] = useState(admin ? "Unmarked" : "All");

  const filters = ["All", "Unmarked", "Unapproved", "Approved"];

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
    <div className={`dashboard__block${admin ? "" : "--half"}`}>
      <div className="dashboard__block-title-container">
        <p className="dashboard__block-title">
          {admin ? "" : "Your"} Holiday Requests
        </p>
      </div>
      {/* <div className="flex-container--wrap">
        {filters.map((item) => (
          <span
            key={item}
            className={`btn-toggle--sm ${filter == item && "active"}`}
            onClick={() => {
              setFilter(item);
            }}
          >
            {item}
          </span>
        ))}
      </div> */}
      {admin && (
        <Fragment>
          <p>You have {holidays.filter(item => item.approved == null).length} unmarked holidays to review.</p>
          <Link className="link" to="/list/holidays">View all holiday requests</Link>
        </Fragment>
      )}
      
      {currentHolidays.length > 0 && (
        <div className="list dash">
          <table>
            <tr>
                {admin && <th>Employee</th>}
                <th>Date</th>
                <th>Approved</th>
                {admin && <th>Requested</th>}
            </tr>
            {currentHolidays.map(item => (
                    <tr>
                    {admin && <td>{item.employee.full_name}</td>}
                    <td>{format(parseISO(item.date), "cccc do MMMM yyyy")}</td>
                    <td>{item.approved == null ? "Unmarked" : item.approved ? "Approved" : "Not Approved"}</td>
                    {admin && <td>{format(parseISO(item.updated_at), "cccc do MMMM yyyy")}</td>}
                </tr>
            ))}
            
          </table>
        </div>
      ) }
      
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
