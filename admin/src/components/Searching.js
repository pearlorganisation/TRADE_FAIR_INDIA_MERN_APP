import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const Searching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSearch = useDebouncedCallback((name, term) => {
    console.log(name, term);
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set(name, term);
      params.set("page", 1);
    } else {
      params.delete(name);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="">
      <div className="mx-3">
        <InputGroup className="w-100">
          <FormControl
            placeholder="Search"
            onChange={(e) => {
              console.log(e.target.value);
              handleSearch("search", e.target.value);
            }} // Update search on input change
          />
          <Button
            variant="info"
            // Trigger search function on button click
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Searching;
