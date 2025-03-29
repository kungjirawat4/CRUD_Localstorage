
// import React from 'react';
// import { PaginationProps } from '@/types/types';
// const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
//   return (
//     <div className="join mt-4">
//       {[...Array(totalPages)].map((_, index) => (
//         <input
//           key={index}
//           className="join-item btn btn-square"
//           type="radio"
//           name="options"
//           aria-label={`${index + 1}`}
//           checked={currentPage === index + 1}
//           onChange={() => onPageChange(index + 1)} 
//         />
//       ))}
//     </div>
//   );
// };

// export default Pagination;

import React from 'react';
import { PaginationProps } from '@/types/types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange,hasData }) => {
  return (
    <div className="join mt-4 flex justify-end">

      <button
        className="join-item btn"
        disabled={!hasData || currentPage === 1} 
        onClick={() => handlePageChange(currentPage - 1)}
      >
        «
      </button>

      <button
        className="join-item btn btn-active"
        disabled={!hasData}
      >
        {currentPage}
      </button>

      <button
        className="join-item btn"
        disabled={!hasData || currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
