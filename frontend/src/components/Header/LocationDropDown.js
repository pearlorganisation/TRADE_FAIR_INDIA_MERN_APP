import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { FaCheck } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenue } from "../../features/actions/venueAction";
import { filterEvent } from "../../features/slices/eventsSlice";

const LocationDropDown = () => {
  const dispatch = useDispatch();
  const { venueData } = useSelector((state) => state.venue);
  const people = [{ name: "Select Location" }];

  const [selected, setSelected] = useState(people[0]);
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
    console.log(
      venueData?.map((venue) => {
        return { name: venue?.City };
      })
    );
  }, [venueData]);
  useEffect(() => {
    dispatch(filterEvent({ name: "All" }));
  }, [venueData]);

  return (
    <div className="fixed top-[1.25rem] right-[44rem]  w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <RiExpandUpDownLine
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pt-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {locationData?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 ${
                      personIdx === 0 ? "bg-slate-300/50" : null
                    } pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        onClick={() => {
                          dispatch(filterEvent(person));
                        }}
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default LocationDropDown;