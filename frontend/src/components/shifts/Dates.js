import React, { Fragment, useState, useEffect } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { useSelector } from "react-redux";
import CreateShift from "../layout/CreateShift";

const Dates = (dates) => {
  const {
    filterEmployees,
    updateShifts,
    showAvailabilities,
    setShowAvailabilities,
    scrollPosition,
  } = dates;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <UpdateDate
        showAvailabilities={showAvailabilities}
        setShowAvailabilities={setShowAvailabilities}
        updateShifts={updateShifts}
        scrollPosition={scrollPosition}
      />
      <CreateShift
        open={open}
        type="staff"
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
      <section
        className={`dates container ${scrollPosition >= 360 ? " fixed" : ""}`}
      >
        <div className="dates__container">
          <div className="container-left"></div>
          <div className="container-right">
            {dates.dates.map((date) => (
              <div key={date} className="item-block dates__date">
                <p>
                  {format(date, "ccc do MMM").split(" ")[0]}
                  <br></br>
                  {format(date, "ccc do MMM").split(" ")[1]}{" "}
                  {format(date, "ccc do MMM").split(" ")[2]}
                </p>
                <i
                  className="dates__sort fas fa-sort-down"
                  onClick={() => filterEmployees(format(date, "yyyy-MM-dd"))}
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
