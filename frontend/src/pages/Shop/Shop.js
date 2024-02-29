import React, { useEffect } from "react";
import ShopImage from "../../components/assets/ShopI.jpg";
import ShopsImage from "../../components/assets/ShopsI.avif";
import CatProfile from "../../components/assets/CatProfile.jpeg";
import PdfIcon from "../../components/assets/pdf.png";

import { FaShareAlt } from "react-icons/fa";
import ShopCarousel from "./ShopCarousel";
import { IoCall } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { TbPhoneCall } from "react-icons/tb";
import { FaGlobe } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import QueryForm from "./QueryForm";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopByUniqueKey } from "../../features/actions/shopAction";

const Shop = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { shopData } = useSelector((state) => state.shop);
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link Copied.", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  }, []);
  useEffect(() => {
    dispatch(fetchShopByUniqueKey({ uniqueKey: shopId }));
  }, []);

  return (
    <div className="min-h-dvh pb-12">
      <div className="relative">
        {" "}
        <div className="h-[28rem] bg-indigo-500 w-full">
          <img
            className="w-full h-full object-cover object-center"
            src="https://plus.unsplash.com/premium_photo-1661943659036-aa040d92ee64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            srcset=""
          />
        </div>
        <button
          onClick={copyContent}
          className="bg-slate-300 px-8 py-3 rounded-3xl flex justify-center items-center gap-2 font-medium absolute left-[50%] translate-x-[-50%] translate-y-[-50%] active:scale-95 transition-all"
          type="button"
        >
          <FaShareAlt />
          Share
        </button>
      </div>
      <div className="container mx-auto space-y-6 px-3">
        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
            About
          </div>
          <div className="text-slate-700 font-medium">
            {state?.shopName?.aboutUs}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
            Previous Events
          </div>
          <div className="text-slate-700 font-medium bg-[#FFFEF1] space-y-10 py-5">
            <ShopCarousel />
            <div className="grid place-items-center">
              {" "}
              <button
                className=" px-6 py-2 rounded-3xl border-2 active:scale-95 transition-all hover:ring-4 ring-[#00373E]/50 border-[#00373E]"
                type="button"
              >
                Explore All
              </button>{" "}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
            Images from Recent Events :
          </div>
          <div className="text-slate-700 font-medium grid grid-cols-[repeat(_auto-fit,_minmax(450px,_1fr))] gap-3">
            {/* {Array(5)
              .fill(ShopsImage)
              .map((item, idx) => { */}
            {Array.isArray(state?.gallery) &&
              state?.gallery?.length > 0 &&
              state?.gallery
                ?.filter((item, index) => index < 5)
                ?.map((item, idx) => {
                  return (
                    <div className="relative">
                      {idx === 4 ? (
                        <div
                          onClick={() => {
                            navigate("/shop/photos", { state: state?.gallery });
                          }}
                          className="absolute cursor-pointer w-full h-full bg-black/70 flex flex-col justify-center items-center gap-1 text-white font-medium"
                        >
                          {" "}
                          <span className="text-4xl">30 +</span>{" "}
                          <span className="text-sm">See All</span>
                        </div>
                      ) : null}
                      {idx < 4 ? (
                        <div className="absolute w-full h-full bg-gradient-to-b to-black/30 from-black/0 flex items-end p-3">
                          <div className="flex justify-between items-center text-white w-full">
                            <span>📍 Uttarakhand</span>
                            <button
                              type="button"
                              className="border border-white/10 hover:ring-2 ring-white/30 active:scale-95 transition-all bg-white/10 px-3 py-1 rounded-2xl font-normal"
                            >
                              See Photos
                            </button>
                          </div>
                        </div>
                      ) : null}
                      <img
                        className="w-full h-[20rem] object-cover object-top"
                        src={item?.path}
                        alt=""
                      />
                    </div>
                  );
                })}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-6">
          <div className="space-y-2 flex flex-col">
            <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
              Key Person :
            </div>
            <div className="text-slate-700 font-medium bg-white p-3 space-y-3 rounded-xl">
              {state?.shopName?.keyPersonsDetails?.map((item) => {
                return (
                  <div>
                    <div>
                      {/* <img
                        className="rounded-xl"
                        width={110}
                        height={110}
                        src={CatProfile}
                        alt=""
                      /> */}
                    </div>
                    <div className="flex flex-col justify-start items-start gap-3">
                      <span>
                        Name:{" "}
                        <span className="font-normal">
                          {item?.name || "Abhishek Bahuguna"}
                        </span>
                      </span>
                      <span>
                        Designation:{" "}
                        <span className="font-normal">
                          {item?.designation || "Web Developer"}
                        </span>
                      </span>
                      <span className="flex justify-start items-center gap-1">
                        <IoCall />
                        Mobile No. :{" "}
                        <span className="font-normal"> {item?.mobileNo}</span>
                      </span>
                      <div className="space-x-3">
                        {" "}
                        <button
                          className="px-6 py-2 border rounded-2xl"
                          type="button"
                        >
                          Save Details
                        </button>
                        <button
                          className="px-6 py-2 rounded-2xl bg-[#00373E] text-white"
                          type="button"
                        >
                          Contact Now
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
              Brochures :
            </div>
            <div className="flex flex-col justify-center items-center gap-6 bg-white rounded-xl h-full p-2">
              <div className="text-slate-700 font-medium flex justify-center items-center">
                {state?.shopName?.pdfList?.map((item, index) => {
                  return (
                    <a
                      href={item?.path}
                      className="space-y-3 flex flex-col justify-center items-center"
                      download
                      target="_blank"
                    >
                      {" "}
                      <img
                        className="w-[5rem] md:w-[6.5rem] lg:w-[8rem]"
                        src={PdfIcon}
                        alt=""
                      />
                      <button
                        type="button"
                        className="border-2 active:scale-95 transition-all hover:ring-4 ring-[#00373E]/30 font-medium border-[#00373E] p-2 rounded-3xl flex justify-center items-center gap-1"
                      >
                        Download <MdOutlineFileDownload size={20} />
                      </button>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
            Contact Details :
          </div>
          <div className="text-slate-700 font-medium bg-white p-5 space-y-6">
            <div className="flex justify-start items-center gap-2">
              <FaMapMarkerAlt />{" "}
              <span>
                Currency tower, Main road, GE, VIP Rd, Raipur, Chhattisgarh
                492001
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <IoMailOutline size={20} />
              <span>theevents@gmail.com</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              {" "}
              <TbPhoneCall /> <span>928777-03334</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaGlobe />
              <span>www.theevents&co.in</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <BsTwitterX />
              <FaInstagram />
              <FaFacebookF />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">
            Have any Query/Enquire from Event Co. India :
          </div>
          <div className="text-slate-700 font-medium">
            <QueryForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
