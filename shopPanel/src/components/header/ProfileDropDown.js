import { useState, useRef, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ProfileS from '../assets/ProfileS.png'
import { createPortal } from "react-dom";
import LogoutAlert from "../LogoutAlert/LogoutAlert";
import { logout } from "../../features/actions/authAction";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);
  const profileRef = useRef(null);
  const {loggedInUserData} = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const navigation = [
    { title: "Dashboard", path: "" },
    { title: "Settings", path: "" },
  ];

  const handleDropDown = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            // src="https://randomuser.me/api/portraits/men/46.jpg"
            src={ProfileS}
            className="w-full h-full rounded-full"
          />
        </button>
        <div className="lg:hidden">
          <span className="block">User</span>
          <span className="block text-sm text-gray-500">{loggedInUserData?.email || 'user@gmail.com'}</span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {/* {navigation.map((item, idx) => (
          <li>
            <a
              key={idx}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))} */}
        <li
          className="flex justify-start items-center gap-1 cursor-pointer text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
        
        >
          Profile
        </li>
        <li
          className="flex justify-start items-center gap-1 cursor-pointer text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Logout 
        </li>
      </ul>
      {isOpen &&
        createPortal(
          <LogoutAlert setIsOpen={setIsOpen} isOpen={isOpen}/>,
          document.body
        )}
    </div>
  );
};

export default ProfileDropDown;
