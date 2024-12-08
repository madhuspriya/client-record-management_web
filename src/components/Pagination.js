import React from 'react';

const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? 'active' : ''}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
