import React, { Fragment, useState, useEffect } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dates = (dates) => {
  const { filterEmployees } = dates;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <section className={`dates ${scrollPosition >= 350 ? " fixed" : ""}`}>
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
                <i
                  className="dates__sort fas fa-sort-down"
                  onClick={() => filterEmployees(format(date, "YYY-MM-dd"))}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dates;
