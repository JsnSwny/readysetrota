import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import AddShiftButton from "./AddShiftButton";

const Dates = (props) => {
  const { filterEmployees, scrollPosition, template, dates, shifts } = props;

  const getCost = (date) => {
    let shifts_filtered = shifts.filter(item => item.date == date)
    return shifts_filtered.map(item => parseFloat(item.wage * item.length)).reduce((a, b) => (a + b), 0.00);
  }
  
  let siteAdmin = useSelector((state) => state.employees.site_admin)

  return (
    <section
      className={`dates container ${scrollPosition >= 250 ? " fixed" : ""}`}
    >
      <div className="dates__container">
        {!template && <div className="container-left"></div>}

        <div className="container-right">
          {dates.map((date) => (
            <div key={date} className="item-block dates__date">
              <p className="item-block__title">
                {format(date, "ccc do MMM").split(" ")[0]}
                <br></br>
                {format(date, "ccc do MMM").split(" ")[1]}{" "}
                {format(date, "ccc do MMM").split(" ")[2]}
              </p>
              {siteAdmin && <small>£{getCost(format(date, "yyyy-MM-dd"))}</small>}
              {template ? (
                <AddShiftButton
                  date={format(date, "yyyy-MM-dd")}
                  white={true}
                  template={true}
                />
              ) : (
                <i
                  className="dates__sort fas fa-sort-down"
                  onClick={() => filterEmployees(format(date, "yyyy-MM-dd"))}
                ></i>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dates;
