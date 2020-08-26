import React, { Fragment, useState } from "react";
import { format, parseISO } from "date-fns";
import { updateAvailability } from "../../actions/employees";
import { useDispatch } from "react-redux";
import Pagination from "./Pagination";

const HolidayRequest = (props) => {
  const { holidays, business } = props;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHolidays = holidays.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="dashboard__block--half">
      <div className="dashboard__block-title-container">
        <p className="dashboard__block-title">
          {business ? "Review" : "Your"} Holiday Requests
        </p>
      </div>
      <div className="dashboard__block-container-lg">
        {!holidays.length > 0 ? (
          <p className="dashboard__text">
            You currently have no holiday requests.
          </p>
        ) : (
          currentHolidays.map(
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
                    {format(parseISO(item.date), "dd MMMM YYY")} (
                    {item.business.name})
                  </p>
                  {business && (
                    <Fragment>
                      <i
                        onClick={() => {
                          let obj = {
                            name: item.name,
                            employee_id: item.employee.id,
                            date: item.date,
                            approved: true,
                            business_id: item.business.id,
                          };
                          dispatch(updateAvailability(item.id, obj));
                        }}
                        class="fas fa-check-circle"
                      ></i>
                      <i
                        onClick={() => {
                          let obj = {
                            name: item.name,
                            employee_id: item.employee.id,
                            date: item.date,
                            approved: false,
                            business_id: item.business.id,
                          };
                          dispatch(updateAvailability(item.id, obj));
                        }}
                        class="fas fa-times-circle"
                      ></i>
                    </Fragment>
                  )}
                </div>
              )
          )
        )}
      </div>
      <Pagination
        shiftsPerPage={itemsPerPage}
        totalShifts={holidays.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HolidayRequest;
