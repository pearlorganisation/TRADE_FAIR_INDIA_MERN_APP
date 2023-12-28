import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../../components/assets/AuthImg.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { resestForgotPasswordStates } from "../../../features/slices/authSlice";
import { ownerResetPassword } from "../../../features/actions/authAction";
import Loader from "../../../components/common/Loader";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";

const ResetPassword = () => {
  const { isPasswordUpdated, userEmail,isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState({password:false,confirmPassword:false})

  const schema = z
    .object({
      password: z.string().min(8, { message: "New Password is required" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password must match",
      path: ["confirmPassword"],
    });

  const resolver = zodResolver(schema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: resolver });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(ownerResetPassword({ ...data, email: userEmail }));
  };
  useEffect(() => {
    if (isPasswordUpdated) {
      dispatch(resestForgotPasswordStates());
      navigate("/login");
    }
  }, [isPasswordUpdated]);
  //   useEffect(() => {
  //     return () => {
  //       dispatch(resestForgotPasswordStates());
  //     };
  //   }, []);
  const iconStyle = {
    height: "20px",
    width: "20px",
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-gray-600 space-y-8 p-4 shadow-lg">
        <div className="text-center">
          <img src={AuthImg} width={80} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Reset Password
            </h3>
            <p className="">
              Back to{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <label className="font-medium">New Password</label>
            <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPasswordVisible((prev=>{
                    return {...prev,password:!passwordVisible.password}
                  }));
                }}
                className={`absolute top-[2.8rem] right-[0.8rem]`}
              >
                {passwordVisible.password ? (
                  <PiEye style={iconStyle} />
                ) : (
                  <PiEyeClosed style={iconStyle} />
                )}
              </span>
            <input
              {...register("password", { required: true })}
              type={`${passwordVisible.password ? 'text' : 'password'}`}
              placeholder="Enter New Password"
              className="w-full my-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg font-overPass"
            />
            {errors?.password && (
              <span className="text-red-500">
                {errors?.password?.message || "New Password is required"}
              </span>
            )}
          </div>
          <div className="relative">
            <label className="font-medium">Confirm New Password</label>
            <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPasswordVisible((prev=>{
                    return {...prev,confirmPassword:!passwordVisible.confirmPassword}
                  }));
                }}
                className={`absolute  top-[2.8rem] right-[0.8rem]`}
              >
                {passwordVisible.confirmPassword ? (
                  <PiEye style={iconStyle} />
                ) : (
                  <PiEyeClosed style={iconStyle} />
                )}
              </span>
            <input
              {...register("confirmPassword", { required: true })}
              type={`${passwordVisible.confirmPassword ? 'text' : 'password'}`}
              placeholder="Enter Confirm Password"
              className="w-full my-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg font-overPass"
            />
            {errors?.confirmPassword && (
              <span className="text-red-500">
                {errors?.confirmPassword?.message ||
                  "Confirm Password is required"}
              </span>
            )}
          </div>
          {
            isLoading ? <button
            disabled={isLoading}
            type="button"
            className="w-full px-4 mt-4 py-2 opacity-70 grid place-items-center text-white font-medium bg-indigo-600 hover:bg-indigo-500  rounded-lg duration-150"
          >
            <Loader/>
          </button>  : <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Submit
          </button>
          }
          
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
