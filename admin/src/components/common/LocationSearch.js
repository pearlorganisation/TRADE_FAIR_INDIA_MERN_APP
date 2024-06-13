import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const LocationSearch = () => {
  const inputRef = useRef();
  const handlePlaceChange = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };
  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyAEg8nFyUAu8zlt1NK5N1HrqLYLhpPhIlQ"
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => {
            inputRef.current = ref;
          }}
          onPlacesChanged={handlePlaceChange}
        >
          <input
            type="text"
            placeholder="Enter Your Location..."
            className="form-control"
          />
        </StandaloneSearchBox>
      </LoadScript>
    </div>
  );
};

export default LocationSearch;
