import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateManager } from "react-select";

const Location = ({ lat, lng, setValue }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: lat,
    lng: lng,
  });
  const [locationName, setLocationName] = useState("second");

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  //For reverse Geolocation
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAEg8nFyUAu8zlt1NK5N1HrqLYLhpPhIlQ`
      );

      if (response.data.status === "OK") {
        // Access location information from the response
        const locationInfo = response.data.results[0];
        const formatted_location_name = locationInfo.formatted_address;
        setLocationName(formatted_location_name);
        console.log(locationName);
        const locationUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        setValue(
          "GeoLocation",
          {
            loactionName: formatted_location_name,
            locationUrl: locationUrl,
            latLng: { lat: lat, lng: lng },
          },
          { shouldValidate: true, shouldDirty: true, shouldTouch: true }
        );
        return { formatted_location_name, locationUrl };
      } else {
        throw new Error("Geocoding request failed");
      }
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  };

  useEffect(() => {
    reverseGeocode(selectedLocation.lat, selectedLocation.lng);
  }, [selectedLocation]);

  return (
    <>
      <div className="google_map">
        <LoadScript googleMapsApiKey="AIzaSyA0IsdMLKWpkqHggok3Lw5AYei3wjDvfCY">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
            onClick={handleMapClick}
            zoom={10}
          >
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
            />
          </GoogleMap>
          <div className="my-2">
            <p>
              <span className="fw-bold"> Selected Location: </span>{" "}
              {selectedLocation.lat}, {selectedLocation.lng}
            </p>
            <p>
              <span className="fw-bold"> Location Name: </span>
              {locationName}
            </p>
          </div>
        </LoadScript>
      </div>
    </>
  );
};

export default Location;
