import React, { Fragment, useEffect } from "react";

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

  useEffect(() => {
    if (totalShifts > 0 && currentPage > pageNumbers.length) {
      setCurrentPage(currentPage - 1);
    }
  }, [pageNumbers]);

  return (
    pageNumbers.length > 1 && (
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
    )
  );
};

export default Pagination;
