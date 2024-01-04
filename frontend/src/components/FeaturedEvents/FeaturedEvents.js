import React from "react";
import FeatureEventCarousel from "./FeatureEventCarousel";

const FeaturedEvents = () => {
  return (
    <div className="min-h-dvh bg-[#FFFEF1] flex flex-col justify-center items-center ">
      <div className="container mx-auto space-y-12">
        <div className="text-center text-[#00373E] font-medium text-4xl">
          Featured Events
        </div>
        <FeatureEventCarousel />
      </div>
    </div>
  );
};

export default FeaturedEvents;