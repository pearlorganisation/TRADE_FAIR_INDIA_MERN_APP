import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { FaCheck } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenue } from "../../features/actions/venueAction";
import {
  exploreByChoice,
  filterEvent,
} from "../../features/slices/eventsSlice";

const LocationDropDown = () => {
  const dispatch = useDispatch();
  const { venueData } = useSelector((state) => state.venue);
  const { filteredEventData } = useSelector((state) => state.events);
  const people = [{ name: "Select Location" }];
  const [isSelected, setSelected] = useState(false);
  const [selectedData, setSelectedData] = useState({ name: "Select Location" });

  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    dispatch(fetchVenue());
  }, []);
  useEffect(() => {
    setLocationData((prev) => {
      const location = venueData?.map((venue) => {
        return { name: venue?.City };
      });
      return [{ name: "All" }, ...location];
    });
  }, [venueData]);
  useEffect(() => {
    dispatch(filterEvent({ name: "All" }));
  }, [venueData]);

  useEffect(() => {
    dispatch(exploreByChoice({ category: "All" }));
  }, [filteredEventData]);

  useEffect(() => {
    console.log("locationData::", locationData);
  }, [locationData]);

  return (
    <div className="z-50">
      <div
        onClick={() => setSelected(!isSelected)}
        className="w-full md:w-72  font-medium relative  text-left  border-2 bg-white h-full px-3 py-2 rounded-md flex justify-between items-center"
      >
        {selectedData?.name}
        <RiExpandUpDownLine className="!cursor-pointer" />
        {isSelected ? (
          <div className="absolute  top-[2.6rem] bg-white left-0  w-full rounded-md flex flex-col">
            {locationData?.map((item) => {
              console.log(`${selectedData.name == item.name ? true : false}`);
              return (
                <span
                  className={`${
                    selectedData.name == item.name ? "bg-blue-100" : ""
                  } py-2 px-3 hover:bg-[#00373E]/10 cursor-pointer`}
                  onClick={() => {
                    setSelectedData({ name: item?.name });
                    dispatch(filterEvent(item));
                  }}
                >
                  {item?.name}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LocationDropDown;
