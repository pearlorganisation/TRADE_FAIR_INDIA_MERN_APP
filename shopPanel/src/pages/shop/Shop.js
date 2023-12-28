import React, { useEffect, useState } from "react";

import Pagination from "../../components/common/Pagination";
import { createPortal } from "react-dom";
import { BiSearch } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import useDebounce from "../../components/common/useDebounce";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getShopById, viewShops } from "../../features/actions/shopActions";
import { PiNeedleThin } from "react-icons/pi";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useParams } from "react-router";
import ViewModal from "../vendor/ViewModal";
// import EnquiryModal from "./EnquiryModal";
// import ViewShopModal from "./ViewShopModal";
import { Link } from "react-router-dom";
import {AiFillSetting} from 'react-icons/ai'
import ViewShopModal from "../../components/ViewShopModal/ViewShopModal";
import EnquiryModal from "../../components/EnquiryModal/EnquiryModal";

const Shop = () => {
  const dispatch = useDispatch();
  const { shopId } = useParams();
  useEffect(() => {
    dispatch(getShopById(shopId));
  }, []);

  const { shopData, isLoading } = useSelector((state) => state.shops);
  const [showModal, setShowModal] = useState(false);
  const [shopInfo, setShopInfo] = useState("");
  const [shopID, setShopId] = useState('')
  const [shopDetails, setShopDetails] = useState([]);
  const [enquiry, setEnquiry] = useState(false)

  useEffect(() => {
    setShopDetails([shopData]);
  }, [shopData]);

  useEffect(() => {
    console.log("shopDetails:::: ", shopDetails);
  }, [shopDetails]);

  const handleView = (item) => {
    setShopInfo([]);
    setShopInfo(item);
    setShowModal(!showModal);
  };
  return (
    <div className="min-h-[70vh] flex flex-col justify-start items-center gap-8">
      <div className="container mx-auto grid place-items-center">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="w-full flex justify-between  mt-4">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Shops Details
              </h3>
              <div className="flex-none mt-4 md:mt-0">
                    <Link to='/' className="flex justify-start items-center gap-2 py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-md hover:shadow-none">
                        Manage Shops <AiFillSetting/>
                    </Link>
                </div>
            </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="min-w-[700px] table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">S.No</th>

                  <th className="py-3 px-6">Shop Id</th>
                  <th className="py-3 px-6">Shop Name</th>
                  <th className="py-3 px-6">State</th>
                  <th className="py-3 px-6">City</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {isLoading
                  ? Array(8)
                      .fill(true)
                      .map((item) => {
                        return <LoadingSkeleton counts={6} />;
                      })
                  : shopDetails &&
                    Array.isArray(shopDetails) &&
                    shopDetails.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {++index}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.shopName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.city}
                        </td>

                        <td className="text-right px-6 whitespace-nowrap border">
                          <button
                            onClick={() => {
                              setShopId(item?._id)
                              handleView(item);
                            }}
                            type="button"
                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none"
                          >
                            <span
                              role="tooltip"
                              id="tooltip-05"
                              class="invisible absolute bottom-full left-1/2 z-10 mb-2 w-auto -translate-x-1/2 rounded bg-slate-700 p-2 text-xs text-white opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-1 before:border-x-4 before:border-t-4 before:border-x-transparent before:border-t-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
                            >
                              View
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <ViewShopModal onClose={() => setShowModal(false)} shopInfo={shopData} setEnquiry={setEnquiry}  />,
          document.body
        )}
         {enquiry &&
        createPortal(
          <EnquiryModal onClose={() => setEnquiry(false)} shopID={shopID} />,
          document.body
        )}
    </div>
  );
};

export default Shop;
