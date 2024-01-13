import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

const Header = () => {
  const [state, setState] = useState(false);
  const [showNav, setShowNav] = useState(false);

  let prevScroll = window.scrollY;
  let currScroll = 0;
  const handleNavBar = () => {
    currScroll = window.scrollY;
    if (prevScroll < currScroll) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }

    prevScroll = currScroll;
  };
  useEffect(() => {
    window.addEventListener("scroll", handleNavBar);

    return () => {
      window.removeEventListener("scroll", handleNavBar);
    };
  }, []);

  return (
    <nav
      className={`bg-[#00373E]  ${
        showNav ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"
      } transition-all duration-200 fixed border-b w-full md:text-sm md:border-none z-20`}
    >
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/">
            <div className="font-medium text-lg flex justify-content items-center gap-2">
              <div className="rounded-md  h-[2.5rem] w-[2.5rem] bg-white text-[#00373E] grid place-items-center">
                TF
              </div>{" "}
              <span className="text-white">TRADE FAIR</span>
            </div>
          </Link>
          <div className="md:hidden">
            <button className="text-white " onClick={() => setState(!state)}>
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 md:pb-3 md:mt-8 md:block pb-0 mt-0 absolute left-0 w-full top-[4rem] md:static md:h-auto md:w-auto transition-all bg-[#00373E] ${
            state
              ? "h-[100vh] px-3 md:px-0"
              : "h-[0vh] px-3 md:px-0 overflow-hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <li className="text-white border-2 border-white py-1 px-3 rounded-2xl">
              List Your Event
            </li>
            <li className="text-white border-2 border-white py-1 px-3 rounded-2xl flex justify-evenly items-center gap-1">
              <FaMapMarkerAlt />{" "}
              <span className="font-medium text-nowrap">Deahradun</span>
              <FaChevronDown />
            </li>

            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                <a
                  href="javascript:void(0)"
                  className="block py-3 text-center text-white  border rounded-lg md:border-none"
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="block py-3 px-4 font-medium text-center bg-white text-[#00373E]  active:shadow-none rounded-lg shadow md:inline"
                >
                  Sign in
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
