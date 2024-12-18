import React, { useEffect } from "react";
import FeatureEventCarousel from "./FeatureEventCarousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList } from "../../features/actions/eventActions";

const FeaturedEvents = () => {
  const { isLoading, eventData, filteredEventData } = useSelector(
    (state) => state.events
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("filteredEventData::", filteredEventData);
  }, [filteredEventData]);

  return (
    <div className="max-h-dvh py-3 bg-[#FFFEF1] flex flex-col justify-center items-center">
      <div className="container relative space-y-12 px-4 sm:px-10 md:px-14">
        <div className="text-center text-[#00373E] font-medium text-4xl">
          Featured Events
        </div>
        <FeatureEventCarousel
          isLoading={isLoading}
          eventsData={filteredEventData}
        />
      </div>
    </div>
  );
};

export default FeaturedEvents;
