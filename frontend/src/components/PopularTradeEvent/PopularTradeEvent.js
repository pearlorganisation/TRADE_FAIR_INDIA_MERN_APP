import React from "react";
import PopularEventCarousel from "./PopularEventCarousel";
import { useSelector } from "react-redux";

const PopularTradeEvent = () => {
  const { isLoading, eventData, filteredEventData, filteredExploreByChoice } =
    useSelector((state) => state.events);
  return (
    <div className="min-h-[50dvh] bg-transparent container space-y-12 mx-auto">
      <div className="text-center text-[#00373E] font-medium text-4xl">
        All Trade Events
      </div>
      <PopularEventCarousel
        isLoading={isLoading}
        eventData={filteredExploreByChoice}
      />
    </div>
  );
};

export default PopularTradeEvent;
