import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import CommonQuestion from "../../components/CommonQuestion/CommonQuestion";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import ExploreByChoice from "../../components/ExploreByChoice/ExploreByChoice";
import PopularTradeEvent from "../../components/PopularTradeEvent/PopularTradeEvent";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      {/* <TopEvents /> */}
      <FeaturedEvents />
      <div className="grid place-items-center pt-8">
        {" "}
        <button
          className="bg-[#00373E] px-6 text-white font-medium py-2 rounded-3xl"
          type="button"
        >
          Get Ticket
        </button>{" "}
      </div>
      <ExploreByChoice />
      <PopularTradeEvent />
      <UpcomingEvents />
      <CommonQuestion />
    </div>
  );
};

export default Home;
