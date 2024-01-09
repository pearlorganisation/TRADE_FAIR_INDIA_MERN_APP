import React, { useRef, useState } from "react";
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
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PopularEventCarousel = () => {
  const swiperRef = useRef(null);
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
        {!true
          ? Array(6)
              .fill(true)
              .map((item) => {
                return (
                  <SwiperSlide>
                    <div className="bg-white h-[20rem] max-w-[22rem] px-3 pt-3 rounded-lg grid grid-rows-[10rem_auto] mx-auto">
                      <SkeletonTheme>
                        <p className="">
                          <span className="block">
                            <Skeleton height={150} />
                          </span>
                          <span className="block h-[3rem] mt-1 w-[90%]">
                            <Skeleton height="100%" />
                          </span>
                          <span className="block w-[60%] mt-2">
                            <Skeleton height="100%" />
                          </span>{" "}
                          <span className="block w-[70%]">
                            <Skeleton height="100%" />
                          </span>{" "}
                          <span className="block w-[80%]">
                            <Skeleton height="100%" />
                          </span>
                        </p>
                      </SkeletonTheme>
                    </div>
                  </SwiperSlide>
                );
              })
          : Array(6)
              .fill(true)
              .map((item) => {
                return (
                  <SwiperSlide className="">
                    {" "}
                    <div className="bg-white h-[20rem] max-w-[22rem] px-3 pt-3 rounded-lg grid grid-rows-[10rem_auto] mx-auto">
                      <div className=" flex justify-center items-center relative">
                        <div className="absolute w-full h-full bg-gradient-to-bl from-gray-700/10 via-gray-900/20 to-black/70 font-medium text-lg text-white flex flex-col justify-end items-start p-2">
                          <span>MeetUp 2023</span> <span>Raipur</span>
                        </div>
                        <img
                          className="w-full h-full"
                          src={sampleImage}
                          alt=""
                        />
                      </div>
                      <div className="     divide-y-2 p-2">
                        <div className="font-medium text-lg">
                          All Inida Meetup 2023 ft. 50 Cent | Mumbai
                        </div>
                        <div className="font-medium text-sm text-[#00373E]">
                          <span className="text-xs">By Bombay inc</span>
                          <span className="flex justify-start items-center gap-1">
                            <FaCalendarAlt /> November 25
                          </span>
                          <span className="flex justify-start items-center gap-1">
                            {" "}
                            <HiOutlineLocationMarker /> D Y Patil Stadium Raipur
                          </span>
                        </div>
                      </div>
                    </div>
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

export default PopularEventCarousel;
