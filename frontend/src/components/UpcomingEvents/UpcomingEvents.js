import React, { useEffect, useMemo } from "react";

import EventCarousel from "./EventCarousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowsBanner } from "../../features/actions/showsBannerAction";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { isLoading, showsBannerData } = useSelector(
    (state) => state.showsBanner
  );

  const filteredData = useMemo(() => {
    return showsBannerData.filter((item) => item?.active === true);
  }, [showsBannerData]);
  useEffect(() => {
    dispatch(fetchShowsBanner());
  }, []);

  return (
    <div className="h-dvh space-y-12">
      <div className="bg-white flex container mx-auto rounded-xl h-[12rem] relative overflow-hidden">
        <div className="w-full h-full z-10 text-5xl font-semibold flex justify-center items-center flex-col text-[#00373E]">
          {" "}va
          <p className="text-center w-[35%]">
            {showsBannerData[0]?.bannerData}
          </p>
          {/* <span className="text-center ">Trade Shows, </span>{" "}
          <span className="text-center">Exhibitions, Confrence</span>{" "} */}
        </div>
        <svg
          className="absolute left-[-12rem] top-[-15rem] rotate-[35deg]"
          width="408"
          height="408"
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M969,562.9999999999999C954.492234095782,640.0101591772853,765.4407870642419,759.7739534862953,673.4534045746917,818.9005412228228C581.4660220851415,878.0271289593502,489.99094442911496,957.5762832896351,417.07570506269883,917.7595264191646C344.1604656962827,877.9427695486941,243.8912525533115,670.8079045500197,235.961968376195,580C228.0326841990785,489.19209544998034,282.0769947293657,410.10550142586163,369.49999999999983,372.9120991190467C456.92300527063395,335.7186968122317,660.583333333333,325.158269345618,760.4999999999998,356.83958615911024C860.4166666666665,388.52090297260247,983.507765904218,485.9898408227145,969,562.9999999999999C954.492234095782,640.0101591772853,765.4407870642419,759.7739534862953,673.4534045746917,818.9005412228228"
            fill="#fbd3b6"
          />
        </svg>

        <svg
          className="absolute left-[-12rem] bottom-[-15rem] rotate-[-35deg]"
          width="408"
          height="408"
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M880.2172936849066,566.9999999999999C880.1768031575039,662.8773237449825,815.6877350664288,872.5422066165697,745.2570568355832,900.7595264191646C674.8263786047376,928.9768462217594,542.3801041847174,794.4305065520963,457.6332242998331,736.3039188155689C372.8863444149488,678.1773310790414,240.20845979098533,637.5105742057889,236.77577752627707,552C233.3430952615688,466.4894257942111,352.2497602992963,260.99120958929086,437.0371307115835,223.2404735808356C521.8245011238706,185.4897375723804,671.636639504446,268.20232954607457,745.4999999999998,325.4955839492686C819.3633604955536,382.7888383524627,880.2577842123094,471.1226762550172,880.2172936849066,566.9999999999999C880.1768031575039,662.8773237449825,815.6877350664288,872.5422066165697,745.2570568355832,900.7595264191646"
            fill="#00373e"
          />
        </svg>

        <svg
          className="absolute right-[-12rem] top-[-15rem] rotate-[70deg] z-10"
          width="408"
          height="408"
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M880.2172936849066,566.9999999999999C880.1768031575039,662.8773237449825,815.6877350664288,872.5422066165697,745.2570568355832,900.7595264191646C674.8263786047376,928.9768462217594,542.3801041847174,794.4305065520963,457.6332242998331,736.3039188155689C372.8863444149488,678.1773310790414,240.20845979098533,637.5105742057889,236.77577752627707,552C233.3430952615688,466.4894257942111,352.2497602992963,260.99120958929086,437.0371307115835,223.2404735808356C521.8245011238706,185.4897375723804,671.636639504446,268.20232954607457,745.4999999999998,325.4955839492686C819.3633604955536,382.7888383524627,880.2577842123094,471.1226762550172,880.2172936849066,566.9999999999999C880.1768031575039,662.8773237449825,815.6877350664288,872.5422066165697,745.2570568355832,900.7595264191646"
            fill="#00373e"
          />
        </svg>

        <svg
          className="absolute bottom-[-12rem] right-[-10rem] rotate-[90deg] z-0"
          width="408"
          height="408"
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M961,555.9999999999999C960.6666666666667,656.3518008110915,841.1849737886264,767.0691763438626,745.5,818.3512784473852C649.8150262113736,869.6333805509078,460.9651166998185,906.0844923623663,386.8901572682415,863.6926126211354C312.81519783666454,821.3007328799044,302.4486029552452,665.0678993928248,301.0502434105382,564C299.6518838658312,462.9321006071752,304.0917072350896,315.2451373340474,378.49999999999983,257.28521626418666C452.9082927649101,199.3252951943259,650.4166666666664,166.4546762915332,747.4999999999998,216.24047358083538C844.5833333333331,266.0262708701376,961.3333333333333,455.6481991889082,961,555.9999999999999C960.6666666666667,656.3518008110915,841.1849737886264,767.0691763438626,745.5,818.3512784473852"
            fill="#dffec8"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center gap-12">
        <div className="text-4xl font-semibold text-[00373E] text-[#00373E]">
          Upcoming Events
        </div>
        <div className="bg-[#00373E] min-h-[30rem] w-full flex justify-start items-center">
          <EventCarousel />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
