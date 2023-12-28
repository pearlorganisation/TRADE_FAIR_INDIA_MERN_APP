import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postEnquiry } from "../../features/actions/enquiryAction";
import Loader from "../../components/common/Loader";
import { getOwenerShop, getShopById, getVendorShop } from "../../features/actions/shopActions";
import { useParams } from "react-router";
import { resetFields } from "../../features/slices/enquirySlice";

const EnquiryModal = ({ onClose,shopID }) => {
  const { shopData } = useSelector((state) => state.shops);
  const { role,isUserLoggedIn,loggedInUserData } = useSelector((state) => state.auth);

  const { enquiryData, isLoading } = useSelector((state) => state.enquiry);
  const { shopId } = useParams();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(postEnquiry({ payload: data, shopId: shopID }));
  };
 console.log("Role::::" , role)

  useEffect(() => {
    if(enquiryData && enquiryData.status === 'SUCCESS'){
      onClose()
      dispatch(resetFields())
      if(shopId)
      {
        dispatch(getShopById(shopId));
      }else{
       if(role === 'owner'){
        dispatch(getOwenerShop({email:loggedInUserData?.email}))
       }else{
        dispatch(getVendorShop({id:loggedInUserData?.user?._id}))
       }
      }
    }
   
  }, [enquiryData])
  
 
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-slate-300/20 backdrop-blur-sm">
      <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md bg-white">
          <button
            className="py-2 px-4 text-gray-400 rounded-md hover:bg-gray-100 float-right "
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="text-center border border-transparent">
            {/* <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Trade Fair India
              </h3> */}

            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Have Some Question?
              </h3>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter Name"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  {...register("email", { required: true ,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:'Please Enter Valid Email Address'}})}
                  placeholder="Email"
                  type="email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.email && (
                  <span className="text-red-500">{errors?.email?.message || "Email is required"}</span>
                )}
              </div>
              <div>
                <label className="font-medium">Mobile Number</label>
                <input
                  {...register("number", { required: true,pattern: {
                    value: /^[6789]\d{9}$/,
                    message: "Please enter a valid 10 digit mobile number"
                  }, })}
                  placeholder="Phone Number"
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.number && (
                  <span className="text-red-500">{errors?.number?.message || "Number is required"}</span>
                )}
              </div>
              <div>
                <label className="font-medium">Query</label>
                <textarea
                  {...register("query", { required: true })}
                  placeholder="Query"
                  rows={6}
                  cols={4}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.query && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {isLoading ? (
                <button
                  type="button"
                  className="w-full px-4 py-2 grid place-items-center text-white font-medium bg-indigo-500 cursor-not-allowed  rounded-lg duration-150"
                >
                  <Loader />{" "}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnquiryModal;
