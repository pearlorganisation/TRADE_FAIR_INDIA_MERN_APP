import React, { useEffect, useState } from 'react'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
 const Pagination = () => {
    const[searchParams,setSearchParams]=useSearchParams()
    const [currentPage,setCurrentPage]=useState(()=>{
        return searchParams.get("page")||1;
       })
       const totalPages=2;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      useEffect(()=>{
        setSearchParams({ page:currentPage})
      },[,currentPage])

  return (
    <div> {/* Pagination */}
<div className="d-flex gap-2 justify-content-center align-items-center mt-4 mb-4">
<button
        className="btn btn-info"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <TbPlayerTrackPrevFilled size={16} color="white" />
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-info"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <TbPlayerTrackNextFilled size={16} color="white" />
      </button>
    </div></div>
  )
}


export default Pagination
