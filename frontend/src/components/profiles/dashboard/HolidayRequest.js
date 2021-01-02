import React, { Fragment, useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { updateAvailability } from "../../../actions/employees";
import { useDispatch } from "react-redux";
import Pagination from "../../common/Pagination";

const HolidayRequest = (props) => {
  const { holidays, admin } = props;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
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
    <div className="dashboard__block--half">
      <div className="dashboard__block-title-container">
        <p className="dashboard__block-title">
          {admin ? "Review" : "Your"} Holiday Requests
        </p>
      </div>
      <div className="btn-wrapper">
        {filters.map((item) => (
          <span
            className={`btn-toggle--sm ${filter == item && "active"}`}
            onClick={() => {
              setFilter(item);
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="dashboard__block-container-lg">
        {!filteredHolidays.length > 0 ? (
          <p className="dashboard__text">
            There are no holidays of type "{filter}" to display.
          </p>
        ) : (
          <Fragment>
            {currentHolidays.map(
              (item) =>
                item.name == "holiday" && (
                  <div
                    className={`dashboard__holiday ${
                      item.approved
                        ? "approved"
                        : item.approved != null && "not-approved"
                    }`}
                  >
                    <p>
                      {item.employee.first_name} {item.employee.last_name} -{" "}
                      {format(parseISO(item.date), "dd MMMM yyyy")} (
                      {item.site.name})
                    </p>
                    {admin && (
                      <Fragment>
                        <i
                          onClick={() => {
                            let obj = {
                              name: item.name,
                              employee_id: item.employee.id,
                              date: item.date,
                              approved: true,
                              site_id: item.site.id,
                            };
                            dispatch(updateAvailability(item.id, obj));
                          }}
                          className="fas fa-check-circle"
                        ></i>
                        <i
                          onClick={() => {
                            let obj = {
                              name: item.name,
                              employee_id: item.employee.id,
                              date: item.date,
                              approved: false,
                              site_id: item.site.id,
                            };
                            dispatch(updateAvailability(item.id, obj));
                          }}
                          className="fas fa-times-circle"
                        ></i>
                      </Fragment>
                    )}
                  </div>
                )
            )}
          </Fragment>
        )}
      </div>
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
