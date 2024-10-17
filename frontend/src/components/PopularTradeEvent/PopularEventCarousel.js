import React, { useMemo, useRef, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

const PopularEventCarousel = ({ isLoading, eventData }) => {
  // screen width state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [activeIndex, setActiveIndex] = useState(0);

  const filteredData = useMemo(() => {
    return eventData?.filter((item) => item?.isPopular === true);
  }, [eventData]);
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
        onSlideChange={(swipe) => {
          setActiveIndex(swipe.activeIndex);
        }}
      >
        {isLoading ? (
          Array(6)
            .fill(true)
            .map((item) => {
              return (
                <SwiperSlide>
                  <div
                    className={`bg-white h-[30rem] max-w-[25rem] px-3 pt-3 rounded-lg grid grid-rows-[15rem_auto] mx-auto`}
                  >
                    <SkeletonTheme>
                      <div className="space-y-2">
                        <span className="block">
                          <Skeleton height={250} />
                        </span>
                        <div className="space-y-2">
                          <span className="block h-[3rem] w-[90%]">
                            <Skeleton height="100%" />
                          </span>
                          <span className="block w-[60%] h-[2rem]">
                            <Skeleton height="100%" />
                          </span>{" "}
                          <span className="block w-[70%] h-[2rem]">
                            <Skeleton height="100%" />
                          </span>{" "}
                          <span className="block w-[80%] h-[2rem]">
                            <Skeleton height="100%" />
                          </span>
                        </div>
                      </div>
                    </SkeletonTheme>
                  </div>
                </SwiperSlide>
              );
            })
        ) : Array.isArray(eventData) && eventData.length > 0 ? (
          eventData?.map((item, idx) => {
            const isPrev = idx === activeIndex - 1;
            const isNext = idx === activeIndex + 1;
            const isActive = idx === activeIndex + 1;
            return (
              <SwiperSlide className="py-6">
                <Link to={`/event/${item?.randomString}`} state={item}>
                  {" "}
                  <div
                    className={`bg-white max-w-[20rem] md:h-[30rem] md:max-w-[25rem]  rounded-lg overflow-hidden grid grid-rows-[15rem_auto] mx-auto shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px]`}
                  >
                    <div className=" flex justify-center items-center relative">
                      <div className="absolute w-full h-full bg-gradient-to-bl from-gray-700/10 via-gray-900/20 to-black/70 font-medium text-lg text-white flex flex-col justify-end items-start p-2">
                        {/* <span>MeetUp 2023</span> <span>Raipur</span> */}
                        <span>
                          MeetUp{" "}
                          {" - " +
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
                      <img
                        className="w-full h-full"
                        src={item?.eventBanner?.path}
                        alt=""
                      />
                    </div>
                    <div className="divide-y-2 p-2">
                      <div className="font-medium text-lg line-clamp-1 mb-2">
                        {item?.eventName ||
                          "All Inida Meetup 2023 ft. 50 Cent | Mumbai"}
                      </div>
                      <div className="font-medium text-sm text-[#00373E] space-y-2 py-1">
                        <span className="text-xs">By Bombay inc</span>
                        <span className="flex justify-start items-center gap-1">
                          <FaCalendarAlt className="text-[#59B6E1]" />{" "}
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
                        <span className="flex justify-start items-center gap-1">
                          {" "}
                          <HiOutlineLocationMarker className="text-[#5DB881]" />{" "}
                          {item?.venue?.Address || "D Y Patil Stadium Raipur"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <div
            className={`bg-white h-[30rem] max-w-[25rem] px-3 pt-3 rounded-lg grid place-items-center mx-auto text-4xl font-medium`}
          >
            <span>No Data</span>
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
        } bg-[#00373E] text-[28px] md:text-3xl  text-[#DFFEC8] rounded-full p-1 absolute top-[45%] translate-y-[1rem] right-[1.5rem] lg:-right-6  z-10 cursor-pointer`}
      >
        <FaAngleRight />
      </div>
      <div
        onClick={() => {
          goPrev();
        }}
        className={`${
          windowWidth < 390 ? "opacity-70" : ""
        } bg-[#00373E] text-[28px] md:text-3xl  text-[#DFFEC8] rounded-full p-1 absolute top-[45%] translate-y-[1rem] left-[1.5rem] lg:-left-4 z-10 cursor-pointer`}
      >
        <FaAngleLeft />
      </div>
    </div>
  );
};

export default PopularEventCarousel;
