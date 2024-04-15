import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { FaCalendarAlt } from "react-icons/fa";

const EventCarousel = () => {
  // screen width state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [activeIndex, setActiveIndex] = useState(0);

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
  console.log("filtered Data", filteredData);
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

  // useEffect for window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial class
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-row">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className={styles.swiper}
      >
        {Array.isArray(filteredData) && filteredData?.length > 0 ? (
          filteredData?.map((item) => {
            return (
              <SwiperSlide className="">
                <Link to={`/event/${item?.randomString}`} state={item}>
                  {" "}
                  <div
                    className={`bg-white max-w-[20rem]  md:max-w-[25rem] px-1 pt-1 rounded-lg  mx-auto border border-neutral-400 shadow-sm`}
                  >
                    <div className=" flex justify-center items-center text-center relative">
                      <div className="absolute bottom-1 w-full bg-gradient-to-bl from-gray-700/10 via-gray-900/20 to-black/70 font-medium text-lg text-white p-2">
                        <span>MeetUp 2023</span> <span>Raipur</span>
                      </div>
                      <img
                        className="w-full h-[13rem]"
                        src={item?.eventBanner?.path}
                        alt=""
                      />
                    </div>
                    <div className=" p-2">
                      <div className="font-medium text-lg line-clamp-1">
                        {item?.eventName ||
                          "All Inida Meetup 2023 ft. 50 Cent | Mumbai"}
                      </div>
                      <div className="font-medium text-sm text-[#00373E] py-1">
                        <span className="text-xs">By Bombay inc</span>{" "}
                        <span className="flex justify-start items-center gap-1">
                          <FaCalendarAlt />{" "}
                          {new Date(item?.eventDate[1]).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          ) +
                            " - " +
                            new Date(item?.eventDate[0]).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="text-white text-4xl font-semibold grid place-items-center pb-8 h-[20rem]">
            No Data Found
          </div>
        )}
      </Swiper>
      {/* Custom next and prev buttons */}
      <div
        onClick={() => {
          goNext();
        }}
        className={`${
          windowWidth < 390 ? "opacity-70" : ""
        } absolute bg-[#DFFEC8] text-[18px] md:text-3xl  text-[#00373E] rounded-full p-1  top-[50%] translate-y-1/2 right-[3rem] lg:-right-6  z-10 cursor-pointer`}
      >
        <FaAngleRight />
      </div>
      <div
        onClick={() => {
          goPrev();
        }}
        className={`${
          windowWidth < 390 ? "opacity-70" : ""
        } bg-[#DFFEC8] text-[18px] md:text-3xl  text-[#00373E] rounded-full p-1 absolute top-[50%] translate-y-1/2 left-[3rem] lg:-left-4 z-10 cursor-pointer`}
      >
        <FaAngleLeft />
      </div>
    </div>
  );
};

export default EventCarousel;
