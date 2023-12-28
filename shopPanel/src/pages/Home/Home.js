import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <section className="py-14 h-screen grid place-items-center">
      
      <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8 space-y-[1rem] sm:space-y-[3rem]">
        <div className="max-w-5xl md:mx-auto">
          <h3 className="text-resp bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 font-semibold s leading-[1.1]">
            Welcome To <br /> Trade Fair India <br />
            Shop Panel
          </h3>
          {/* <p className="mt-3 text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
            </p> */}
        </div>
        <div className="flex gap-3 items-center mt- md:justify-center">
          <Link
            to={`/${role}/shop`}
            className="inline-block py-3 px-3 md:py-4 md:px-6 text-xs sm:text-base text-white font-medium bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:opacity-90  rounded-lg shadow-md "
          >
            Go To Shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
