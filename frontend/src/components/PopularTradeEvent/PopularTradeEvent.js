import React from "react";
import PopularEventCarousel from "./PopularEventCarousel";
import { useSelector } from "react-redux";

const PopularTradeEvent = () => {
  const { isLoading, eventData, filteredEventData, filteredExploreByChoice } =
    useSelector((state) => state.events);
  return (
    <div className="max-h-dvh py-3 bg-[#FFFEF1] flex flex-col justify-center items-center">
      <div className="container relative space-y-12 px-4 sm:px-10 md:px-14">
        <div className="text-center text-[#00373E] font-medium text-4xl">
          All Trade Events
        </div>
        <PopularEventCarousel
          isLoading={isLoading}
          eventData={filteredExploreByChoice}
        />
      </div>
    </div>
  );
};

export default PopularTradeEvent;
