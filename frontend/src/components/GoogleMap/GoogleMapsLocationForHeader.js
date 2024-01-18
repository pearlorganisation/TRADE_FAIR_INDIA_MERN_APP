import React from "react";
import { useEffect, useState } from "react";
// ---------------------------------------------------------------------------------------
const GoogleMapsLocationForHeader = ({ sendCurrentLocationData }) => {
  const myApiKey = "AIzaSyA0IsdMLKWpkqHggok3Lw5AYei3wjDvfCY";

  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  const [address, setAddress] = useState("");
  const [cityName, setCityName] = useState("");

  // This code is used to fetch address and set address in useState variable
  useEffect(() => {
    if (position.latitude && position.longitude) {
      getAddressFromCoordinates(position.latitude, position.longitude).then(
        (address) => {
          if (address) {
            console.log("Address is: ", address?.formatted_address);
            setAddress(address?.formatted_address);
          }
        }
      );
    }
  }, [position]);

  // This code is used to fetch current location's Latitude and Longitude value.
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position:: ", position, position?.coords);

        setPosition({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      },
      (error) => {
        console.log("error:: ", error);
      }
    );
  }, []);
  // ---------------------------------------------------------------------------------

  // This method is ised to fetch address based on Latitude and Longitude values.
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=30.282788,77.9852741&key=AIzaSyCULDuqbNZRxYX7JtxEVtD1trka9l5M9nA
      );
      const json = await response.json();
      const city = json?.plus_code?.compound_code
        ?.split(" ")
        .slice(1)
        .join(" ")
        ?.split(",")?.[0];

      setCityName(city || "");
      return json?.results[0];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (position?.latitude && position?.longitude && cityName && address) {
      const geoLocationData = {
        latitude: position?.latitude,
        longitude: position?.longitude,
        cityName,
        address,
      };
      sendCurrentLocationData(geoLocationData);
    }
  }, [position, address, cityName]);

  // --------------------------------------------------------------------------------
  return (
    <div>
      {/* <h1>Geolocation in React J.S</h1>
      {position.latitude && position.longitude ? (
        <>
          <h2>
            Latitude: {position.latitude}, Longitude: {position.longitude}
          </h2>
          {address ? (
            <div>
              <b>My Current Address is:</b> {address}
              <br />
              <br />
              <b>My Current City is:</b> {cityName}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default GoogleMapsLocationForHeader;
