import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = (e) => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };
  return (
    <ul className="pagination justify-content-start">
      <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
        <Link to="#" className="page-link" onClick={handlePrevious}>
          <i className="material-icons md-chevron_left"></i>
        </Link>
      </li>
      {pageNumbers.map((number) => {
        if (pageNumbers.length > 5) {
          if (
            number === 1 ||
            number === pageNumbers.length ||
            (number >= currentPage - 1 && number <= currentPage + 1)
          ) {
            return (
              <li
                key={number}
                className={
                  currentPage === number ? "page-item active" : "page-item"
                }
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => paginate(number)}
                >
                  {number}
                </Link>
              </li>
            );
          } else if (number === currentPage - 2 || number === currentPage + 2) {
            return (
              <li key={number} className="page-item disabled">
                <Link to="#" className="page-link">
                  ...
                </Link>
              </li>
            );
          }
        } else {
          return (
            <li
              key={number}
              className={
                currentPage === number ? "page-item active" : "page-item"
              }
            >
              <Link
                to="#"
                className="page-link"
                onClick={() => paginate(number)}
              >
                {number}
              </Link>
            </li>
          );
        }
      })}
      <li
        className={
          currentPage === pageNumbers.length
            ? "page-item disabled"
            : "page-item"
        }
      >
        <Link to="#" className="page-link" onClick={handleNext}>
          <i className="material-icons md-chevron_right"></i>
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
