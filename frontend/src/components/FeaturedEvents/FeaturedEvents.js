import React, { useEffect } from "react";
import FeatureEventCarousel from "./FeatureEventCarousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList } from "../../features/actions/eventActions";

const FeaturedEvents = () => {
  const { isLoading, eventData } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchEventList());
  // }, []);

  return (
    <div className="min-h-dvh bg-[#FFFEF1] flex flex-col justify-center items-center ">
      <div className="container mx-auto space-y-12">
        <div className="text-center text-[#00373E] font-medium text-4xl">
          Featured Events
        </div>
        <FeatureEventCarousel isLoading={isLoading} eventsData={eventData} />
      </div>
    </div>
  );
};

export default FeaturedEvents;
