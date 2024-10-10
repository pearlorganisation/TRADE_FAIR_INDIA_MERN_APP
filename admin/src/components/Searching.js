import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const Searching = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('query') || '';
  });

  useEffect(() => {
    setSearchParams({ query: search });
  }, [search, setSearchParams]);

  const handleSearch = (e) => {
    setSearch(e.target.value); // Correct this from `e.target.name` to `e.target.value`
  };

  const handleSearchClick = () => {
    // Perform search or handle button click functionality
    console.log('Search button clicked with query:', search);
  };

  return (
    <div className="">
      <div className="mx-3"> 
        <InputGroup className="w-100">
          <FormControl
            placeholder="Search"
            value={search}
            onChange={handleSearch} // Update search on input change
          />
          <Button 
            variant="info"
            onClick={()=>{
                setSearch('')
            }} // Trigger search function on button click
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Searching;
