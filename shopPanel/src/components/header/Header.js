import { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const navigation = [
    { title: "Customers", path: "/" },
    { title: "Careers", path: "/" },
    { title: "Guides", path: "/" },
    { title: "Partners", path: "/" },
  ];
  return (
    <nav className="bg-transparent border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
         
          <Link to="/">
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-xl  sm:text-2xl">Trade Fair India</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <div
            className={`bg-white absolute z-10  w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
           {
            isUserLoggedIn &&  <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
           }

            {/* <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-gray-900">
                  <Link>{item.title}</Link>
                </li>
              ))}
            </ul> */}
          </div>
          {isUserLoggedIn ? (
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">

              <ProfileDropDown class="hidden lg:block" />
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuState(!menuState)}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="cta-pr-btn px-4 py-2 float-right text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-1 duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          )}
          <style jsx>{`
            .cta-pr-btn:hover svg {
              transform: translateX(5px);
            }
          `}</style>
        </div>
      </div>
    </nav>
  );
};

export default Header;
