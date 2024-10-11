import React, { useEffect, useState } from "react";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
const Pagination = ({ totalPages }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.get("page")) || 1
  );
  const location = useLocation();
  const navigate = useNavigate();
  const handlePagination = useDebouncedCallback((name, term) => {
    console.log(name, term);
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  }, 500);

  const handleNextPage = () => {
    handlePagination(
      "page",
      currentPage === totalPages ? currentPage : currentPage + 1
    );
    setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
  };
  const handlePrevPage = () => {
    handlePagination("page", currentPage === 1 ? currentPage : currentPage - 1);
    setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  useEffect(() => {
    let currPage = Number(searchParams.get("page"));
    setCurrentPage(currPage < 1 ? 1 : currPage);
  }, [Number(searchParams.get("page"))]);

  return (
    <div>
      {" "}
      {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Pagination;
