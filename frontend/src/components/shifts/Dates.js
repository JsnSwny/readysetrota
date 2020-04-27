import React, { Fragment } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dates = (dates) => {
  let user = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      <section className="dates">
        <UpdateDate daterange="7" />

        <div className="dates__container">
          <div className="dates__namesection"></div>
          <div className="dates__wrapper">
            {dates.dates.map((date) => (
              <div key={date} className="dates__date">
                <p>
                  {format(date, "ccc do MMM").split(" ")[0]}
                  <br></br>
                  {format(date, "ccc do MMM").split(" ")[1]}{" "}
                  {format(date, "ccc do MMM").split(" ")[2]}
                </p>
                {user.profile.role == "Business" && (
                  <Link
                    className="btn-1"
                    to={`/shift/${format(date, "YYY-MM-dd")}`}
                  >
                    Edit
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dates;
