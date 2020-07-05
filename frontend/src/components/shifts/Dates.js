import React, { Fragment, useState, useEffect } from "react";
import { format } from "date-fns";
import UpdateDate from "./UpdateDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateShift from "../layout/CreateShift";

const Dates = (dates) => {
  const { filterEmployees } = dates;
  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  let user = useSelector((state) => state.auth.user);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <UpdateDate />
      <CreateShift
        open={open}
        type="Staff"
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
      <section
        className={`dates container ${scrollPosition >= 260 ? " fixed" : ""}`}
      >
        <div className="dates__container">
          <div className="container-left">
            {user && user.profile.role == "Business" && (
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="btn-1"
              >
                <i class="fas fa-user-plus"></i>Add Staff
              </button>
            )}
          </div>
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
