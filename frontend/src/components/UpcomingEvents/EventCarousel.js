import React, { useMemo, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./styles.module.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import sampleImage from "../assets/UpEvents.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventCarousel = () => {
  const swiperRef = useRef(null);
  const { isLoading, eventData } = useSelector((state) => state.events);

  const filteredData = useMemo(() => {
    return eventData?.filter((item) => {
      const dates = item?.eventDate;
      const currentDate = new Date();

      const startDate = new Date(dates[1]);
      const endDate = new Date(dates[0]);
      return currentDate < startDate;
    });
  }, [eventData]);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className="container mx-auto relative">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className={styles.swiper}
      >
        {Array.isArray(filteredData) &&
          filteredData?.length > 0 &&
          filteredData?.map((item) => {
            return (
              <SwiperSlide className="">
                {" "}
                <Link to={`/event/${item?.randomString}`} state={item}>
                  <div className="bg-white min-h-[20rem] max-w-[22rem] px-3 pt-3 rounded-lg grid grid-rows-[auto_6rem] mx-auto">
                    <div className=" flex justify-center items-center">
                      <img
                        className="w-full h-full"
                        src={item?.eventBanner?.path}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-xl w-[60%] line-clamp-2">
                        {item?.eventName ||
                          "Startup Tour 2023 ft. 50 Cent | Mumbai"}
                      </div>
                      <FaAngleRight className="cursor-pointer" size={25} />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* Custom next and prev buttons */}
      <div
        onClick={() => {
          goNext();
        }}
        className="bg-[#DFFEC8] text-xl md:text-2xl lg:text-3xl text-[#00373E] rounded-full p-1 absolute top-[50%] right-0 z-10 cursor-pointer"
      >
        <FaAngleRight />
      </div>
      <div
        onClick={() => {
          goPrev();
        }}
        className="bg-[#DFFEC8] text-xl md:text-2xl lg:text-3xl text-[#00373E] rounded-full p-1 absolute top-[50%] z-10 cursor-pointer"
      >
        <FaAngleLeft />
      </div>
    </div>
  );
};

export default EventCarousel;
