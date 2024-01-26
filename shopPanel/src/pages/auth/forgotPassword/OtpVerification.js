import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthImg from "../../../components/assets/AuthImg.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./ResetPassword";
import {
  ownerForgotPasswordOTP,
  ownerOTPVerification,
} from "../../../features/actions/authAction";
import { resestForgotPasswordStates } from "../../../features/slices/authSlice";
import Loader from "../../../components/common/Loader";
import useOTPTimer from "../../../utils/useOTPTimer";

const OtpVerification = () => {
  const { isOTPVerified, isLoading, userEmail } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [minutes, seconds, resetTimer] = useOTPTimer();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const inputRefs = useRef([...Array(6)].map(() => React.createRef())); // Refs for each input

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(
      "otp::",
      otp.map((item) => parseInt(item, 10))
    );
    const completeOTP = otp.join("");

    console.log("completeOTP", completeOTP);
    if (completeOTP.length != 6) {
      setError("otp", { type: "custom", message: "Otp is required." });
    } else {
      dispatch(ownerOTPVerification({otp:completeOTP}));
      console.log("completeOTP", completeOTP);
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      resetTimer();
    }
  }, [isLoading]);
  useEffect(() => {
    console.log(otp);
  }, [otp]);

  const handleOtp = (e, index) => {
    const value = e.target.value;

    if (value === "" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = value;
      index != 0 && inputRefs.current[index - 1].current.focus(); // Move to the previous input on backspace
      setOtp(newOtp);
      clearErrors("otp");
    }

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      clearErrors("otp");

      if (index < 5 && value !== "") {
        inputRefs.current[index + 1].current.focus(); // Move to the next input
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").split("");

    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
        if (index < 5) {
          inputRefs.current[index + 1].current.focus(); // Move to the next input
        }
      }
    });

    setOtp(newOtp);
    clearErrors("otp");
  };

  return isOTPVerified ? (
    <ResetPassword />
  ) : (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-gray-600 space-y-8 p-4 shadow-lg">
        <div className="text-center">
          <img src={AuthImg} width={80} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              OTP Verification
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between items-center">
              <label className="font-medium">OTP</label>
              <span className="text-indigo-600">
                {" "}
                00:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((item, index) => {
                return (
                  <input
                    {...register(`otp${index}`, {
                      onChange: (e) => {
                        handleOtp(e, index);
                      },
                    })}
                    key={index}
                    ref={inputRefs.current[index]}
                    type="text"
                    maxLength="1"
                    value={item}
                    onPaste={(e) => handlePaste(e)}
                    className="w-full text-center mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:ring-4 ring-indigo-600/30 focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                );
              })}
            </div>
            {errors?.otp && (
              <span className="text-red-500">
                {errors?.otp?.message || "This Field is reqired"}
              </span>
            )}
          </div>
          {isLoading ? (
            <button
              disabled={isLoading}
              type="button"
              className="w-full px-4 mt-4 py-2 opacity-70 grid place-items-center text-white font-medium bg-indigo-600 hover:bg-indigo-500  rounded-lg duration-150"
            >
              <Loader />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Send OTP
            </button>
          )}
          <button
            type="button"
            disabled={seconds > 0}
            className={`w-full py-2 ${
              seconds === 0
                ? "text-indigo-600 font-bold"
                : "text-gray-400 font-medium cursor-not-allowed"
            }   active:text-indigo-600 rounded-lg duration-150`}
            onClick={() => {
              dispatch(ownerForgotPasswordOTP({ email: userEmail }));
            }}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </main>
  );
};

export default OtpVerification;
