import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList } from "../../features/actions/categoryAction";

const ExploreByChoice = () => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, []);

  return (
    <div className="container mx-auto min-h-[50dvh] flex flex-col gap-12 justify-center items-center">
      <div className="text-center text-[#00373E] font-medium text-4xl">
        Explore By Choice
      </div>
      <div className="flex items-end flex-wrap w-full md:w-[60%] gap-10">
        {Array.isArray(categoryData) &&
          categoryData?.length > 0 &&
          categoryData
            ?.filter((item, idx) => idx < 5)
            ?.map((item, idx) => {
              const emoji = ["🎉", "😍", "📆", "🌟", "🍭"];
              return (
                <div className="bg-white font-medium text-2xl flex-grow basis-[15rem] text-center py-3 rounded-3xl cursor-pointer hover:scale-110 hover:shadow-2xl transition-all">
                  {emoji[idx] + item?.category}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ExploreByChoice;
