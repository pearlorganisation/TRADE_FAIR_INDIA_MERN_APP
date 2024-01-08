import React from "react";
import Confrence from "../assets/Confrence.png";
import ListEvents from "../assets/ListEvents.png";

const TopEvents = () => {
  return (
    <div className="min-h-dvh">
      <div>
        <div>
          {" "}
          <img className="w-full h-[30rem]" src={ListEvents} alt="" />{" "}
        </div>
      </div>

      <div className=" container mx-auto bg-transparent space-y-12 p-5 relative grid place-items-center text-[#00373E]">
        <div className="bg-[#DFFEC8] h-[23.5rem] w-[90%] mx-auto p-8 grid place-items-center absolute top-[-15rem] rounded-2xl">
          <div className="text-3xl/tight md:text-4xl/tight lg:text-5xl/tight max-w-[40rem] text-center">
            Trade Shows, Exhibitions, Conferences & Business Events India
          </div>
          <button
            className="bg-[#00373E] hover:ring-[5px] ring-[#00373E]/50 transition-all active:scale-95 px-16 font-medium text-white py-3 rounded-3xl"
            type="button"
          >
            Explore Now
          </button>
        </div>

        {/* <----------------------Top List of events-------------------------------> */}

        <div className="text-center text-[#00373E] font-medium text-4xl pt-[10rem]">
          Top List of events
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-10 w-full lg:w-[80%]">
          {Array(5)
            .fill(true)
            .map((item, idx) => {
              return (
                <div className="bg-white h-[28rem] rounded-2xl relative overflow-hidden p-3">
                  <div className="flex flex-col font-medium text-[#00373E] ">
                    <span className="text-2xl">Trade Show</span>
                    <span className="text-sm">30+Events</span>
                  </div>
                  <img
                    className="absolute right-0 top-[12rem] z-10"
                    width={200}
                    src={Confrence}
                    alt=""
                  />
                  <svg
                    className="absolute right-[-7rem] bottom-[-7rem] rotate-[180deg]"
                    width="408"
                    height="408"
                    viewBox="0 0 1080 1080"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M959,548C947.079072587574,626.0806110680097,777.724435525444,727.6530712774788,677.974435525444,782.2796590140063C578.224435525444,836.9062467505337,444.4957392542408,907.4728029214989,360.5000000000001,875.7595264191646C276.50426074575944,844.0462499168302,171.00000000000006,698.7531754730549,174,592C176.99999999999994,485.2468245269452,282.5833333333332,281.60780814651093,378.49999999999983,235.2404735808356C474.41666666666646,188.87313901516026,652.7499999999998,261.66940486942053,749.4999999999998,313.7959926059479C846.2499999999998,365.92258034247527,970.920927412426,469.9193889319903,959,548C947.079072587574,626.0806110680097,777.724435525444,727.6530712774788,677.974435525444,782.2796590140063"
                      fill="#FBD3B6"
                    />
                  </svg>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopEvents;
