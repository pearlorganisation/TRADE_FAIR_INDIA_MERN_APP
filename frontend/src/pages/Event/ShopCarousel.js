import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./styles.module.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import sampleImage from "../../components/assets/UpEvents.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCarousel = ({ shopDetails }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(isAuthenticated, ":::isUserLoggedIn");
  }, [isAuthenticated]);

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
        {Array.isArray(shopDetails) &&
          shopDetails?.length > 0 &&
          shopDetails?.map((item) => {
            console.log("item::", item);
            return (
              <SwiperSlide className="">
                <Link
                  // to={`${
                  //   isAuthenticated
                  //     ? `/shop/${item?.shopName?.randomString}`
                  //     : "#"
                  // }`}
                  to={`/shop/${item?.shopName?.randomString}`}
                  state={item}
                >
                  <div className="bg-white max-h-[20rem] max-w-[22rem] rounded-lg grid grid-rows-[13rem_auto] mx-auto">
                    <div className=" flex justify-center items-center relative">
                      <img
                        className="w-full h-full"
                        src={item?.shopName?.logo?.path || sampleImage}
                        alt=""
                      />
                    </div>
                    <div className="divide-y-2 p-2">
                      <div className="font-medium text-lg py-1">
                        {item?.shopName?.shopName || ""}
                      </div>
                      <div className="font-medium text-sm text-[#00373E] py-1">
                        <span className="flex justify-start items-center gap-1">
                          {" "}
                          <HiOutlineLocationMarker /> D Y Patil Stadium Raipur
                        </span>
                      </div>
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
        className="bg-[#DFFEC8] text-[#00373E] rounded-full p-1 absolute top-[50%] right-[-0.5rem] md:top-[50%] md:right-[-2.8rem] z-10 cursor-pointer"
      >
        <FaAngleRight size={30} />
      </div>
      <div
        onClick={() => {
          goPrev();
        }}
        className="bg-[#DFFEC8] text-[#00373E] rounded-full p-1 absolute left-[-0.5rem] top-[50%] md:left-[-2.8rem] md:top-[50%] z-10 cursor-pointer"
      >
        <FaAngleLeft size={30} />
      </div>
    </div>
  );
};

export default ShopCarousel;
