import React, { Fragment } from "react";
import ShiftList from "./ShiftList";

const Pagination = ({
  shiftsPerPage,
  totalShifts,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalShifts / shiftsPerPage); i++) {
    pageNumbers.push(i);
  }

  let filteredNumbers =
    pageNumbers.length > 5
      ? pageNumbers.filter(
          (number) =>
            (number >= currentPage - 1 || number >= currentPage) &&
            number < currentPage + 4
        )
      : pageNumbers;

  return (
    <nav className="pagination">
      <ul className="pagination__container">
        {filteredNumbers.map((number) => (
          <li
            key={number}
            className={`pagination__number ${
              number == currentPage ? "pagination__current" : ""
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
