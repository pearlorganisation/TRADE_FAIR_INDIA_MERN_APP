import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import CommonQuestion from "../../components/CommonQuestion/CommonQuestion";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import ExploreByChoice from "../../components/ExploreByChoice/ExploreByChoice";
import PopularTradeEvent from "../../components/PopularTradeEvent/PopularTradeEvent";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import TopEvents from "../../components/TopEvents/TopEvents";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <TopEvents />
      <FeaturedEvents />
      <ExploreByChoice />
      <PopularTradeEvent />
      <UpcomingEvents />
      <CommonQuestion />
    </div>
  );
};

export default Home;
