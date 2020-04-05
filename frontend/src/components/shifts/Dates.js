import React, { Fragment, useEffect } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { Link } from "react-router-dom";

const Dates = (dates) => {
  return (
    <Fragment>
      <section className="dates">
        <UpdateDate />
        <div className="dates__container">
          <div className="dates__namesection"></div>
          <div className="dates__wrapper">
            {dates.dates.map((date) => (
              <div className="dates__date">
                <p>
                  {format(date, "ccc do MMM").split(" ")[0]}
                  <br></br>
                  {format(date, "ccc do MMM").split(" ")[1]}{" "}
                  {format(date, "ccc do MMM").split(" ")[2]}
                </p>
                <Link
                  className="btn-1"
                  to={`/shift/${format(date, "YYY-MM-dd")}`}
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dates;
