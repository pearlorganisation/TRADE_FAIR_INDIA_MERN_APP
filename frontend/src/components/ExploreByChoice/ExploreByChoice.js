import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList } from "../../features/actions/categoryAction";
import { exploreByChoice } from "../../features/slices/eventsSlice";

import "./ExploreByChoice.css";

const ExploreByChoice = () => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, []);
  useEffect(() => {
    dispatch(exploreByChoice({ category: "All" }));
  }, [categoryData]);

  return (
    <div className="container mx-auto px-2 sm:px-0 py-4 min-h-[350px] flex flex-col justify-around items-center">
      <div className="text-center text-[#00373E] font-medium text-4xl mb-5 sm:mb-0">
        Explore By Choice
      </div>
      <div className="flex items-end flex-wrap w-full lg:w-4/5 gap-6 px-5 md:px-0">
        <div
          onClick={() => {
            dispatch(exploreByChoice({ category: "All" }));
          }}
          className="flex  box justify-between px-4 bg-white font-medium text-2xl flex-grow basis-[15rem] text-center py-3 rounded-full cursor-pointer md:hover:scale-105 hover:shadow-2xl transition-all duration-200"
        >
          <span className="w-full">Show All 👍</span>
          <span className="icon w-1/5 flex flex-col justify-center">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M312,256l-199-199a15,15 0 01 0-19l29-29a15,15 0 01 19,0l236,235a16,16 0 01 0,24l-236,235a15,15 0 01-19,0l-29-29a15,15 0 01 0-19z" />
            </svg>
          </span>
        </div>
        {Array.isArray(categoryData) &&
          categoryData?.length > 0 &&
          categoryData?.map((item, idx) => {
            const emoji = ["🎉", "😍", "📆", "🌟", "🍭"];
            return (
              <div
                onClick={() => {
                  dispatch(exploreByChoice(item));
                }}
                className="flex  box justify-between px-4 bg-white font-medium text-2xl flex-grow basis-[15rem] text-center py-3 rounded-full cursor-pointer md:hover:scale-105 hover:shadow-2xl transition-all duration-200"
              >
                <style jsx>{`
                  .box {
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                  }
                `}</style>
                <span className="w-full">
                  {
                    // emoji[idx] +
                    item?.category
                  }
                </span>
                <span className="icon w-1/5 flex flex-col justify-center">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M312,256l-199-199a15,15 0 01 0-19l29-29a15,15 0 01 19,0l236,235a16,16 0 01 0,24l-236,235a15,15 0 01-19,0l-29-29a15,15 0 01 0-19z" />
                  </svg>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExploreByChoice;
