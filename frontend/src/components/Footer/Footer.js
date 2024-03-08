import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-500  px-4 py-5 container mx-auto border-t-2">
      <div className="gap-6 md:grid md:grid-cols-[20rem_auto]">
        <div className="border">
          <div className="flex flex-col justify-start items-start gap-6 font-medium  h-full bg-[#00373E] rounded-xl text-white px-8 py-5">
            <span className="text-4xl">Wanna list you Event ?</span>
            <span className="text-lg">List Your Event :</span>
            <button
              className="bg-[#DFFEC8] rounded-3xl px-3 w-full py-2 text-[#00373E]"
              type="button"
            >
              List Event
            </button>
          </div>
        </div>
        <div className="justify-between sm:flex w-full shadow-sm">
          <div className=" p-10 bg-white rounded-xl mt-10 space-y-6 flex flex-col lg:flex-row justify-between  gap-5 md:space-y-0 md:mt-0">
            <div className="flex gap-2 flex-col h-full justify-evenly items-start xl:w-[70%] ">
              <Link to="/">
                <div className="font-medium text-lg flex justify-content items-center gap-2">
                  <div className="rounded-md  h-[2.5rem] w-[2.5rem] bg-[#00373E] text-white grid place-items-center">
                    TF
                  </div>{" "}
                  <span className="text-[#00373E]">TRADE FAIR</span>
                </div>
              </Link>
              <ul className="font-medium w-full list-disc lg:list-none">
                <li>If you’re looking for the best events, look no further.</li>
                <li>
                  These are perfect for building your knowlegde as well as
                  social gathering.
                </li>
              </ul>
              <div className="flex justify-start items-center gap-2 font-medium">
                <div className="flex justify-start items-center gap-1">
                  {" "}
                  <IoMdMail /> trade@gmail.com{" "}
                </div>
                {"|"}
                <div className="flex justify-start items-center gap-1">
                  <IoIosCall />
                  9876543210
                </div>
              </div>
            </div>
            <div className="mt-6 ">
              <div className="flex flex-col gap-3 ">
                <button className="block py-2 px-3 font-medium text-center bg-[#00373e] text-white  active:shadow-none rounded-lg shadow md:inline">
                  Sign in
                </button>
                <button
                  className="flex justify-center items-center gap-2 py-2 px-3 font-medium text-center bg-[#00373e] text-white  active:shadow-none rounded-lg shadow"
                  type="button"
                >
                  <FaMapMarkerAlt />
                  Dehradun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0 text-[#00373e]">
          &copy; All copyrights reserved to @tradefare 2023.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4 text-3xl text-[#00373e]">
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <FaXTwitter />
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <IoLogoInstagram />
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <FaFacebookF />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
