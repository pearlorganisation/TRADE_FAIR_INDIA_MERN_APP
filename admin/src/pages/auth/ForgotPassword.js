import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../../features/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { resetFields } from "../../features/slices/authSlice";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";
// ---------------------------------------------------------------------------------------------------------
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLogInSuccess,
    isLoading,
    isOtpMailSent,
    isOtpVerified,
    isPasswordReset,
  } = useSelector((state) => {
    return state?.auth;
  });

  //   ------------------------------------------------State----------------------------------------------------
  const [toggle, setToggle] = useState(false);
  const [Timer, setTimer] = useState(0);
  const [verifyOtpField, setVerifyOtpField] = useState(false); // to change the email field to otp field
  const [resetPasswordField, setResetPasswordField] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isVerifyOTPButtonCalled, setIsVerifyOTPButtonCalled] = useState(false);

  // -------------------------------------------------Functions-------------------------------------------------

  ////function for Resend OTP

  useEffect(() => {
    if (verifyOtpField) {
      Timer >= 60 || setTimeout(() => setTimer((prev) => prev + 1), 1000);
    }
  }, [Timer, verifyOtpField]);
  //

  //   sendOtpHandler - to call the sendOtp api
  const sendOtpHandler = (data) => {
    try {
      const { email } = data;
      if (!email) {
        console.error("Email Field cannot be empty");
      } else {
        setUserEmail(email);
        dispatch(sendOtp({ email }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   verifyOtpHandler - to call the sendOtp api
  const verifyOtpHandler = (data) => {
    try {
      setIsVerifyOTPButtonCalled(true);
      const { otp } = data;
      if (!userEmail || !otp) {
        console.error("Email && Otp are required");
      } else {
        dispatch(verifyOtp({ email: userEmail, otp }));
        reset();
      }
    } catch (error) {
      setIsVerifyOTPButtonCalled(false);

      console.error(error.message);
    }
  };

  // resetPasswordHandler - to call the resetPassword api
  const resetPasswordHandler = (data) => {
    try {
      const { password, confirmPassword } = data;

      if (!password || !confirmPassword || !userEmail) {
        console.error("Email && Password are required");
      } else {
        dispatch(
          resetPassword({ email: userEmail, password, confirmPassword })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // onIdle - function to handle the idle state of user
  const onIdle = () => {
    dispatch(resetFields);
    setVerifyOtpField(false);
    setResetPasswordField(false);
  };

  const { isIdle } = useIdleTimer({
    timeout: 1000 * 60 * 3, // 3 minutes idle timer
    onIdle,
  });

  // -------------------------------------------------useEffect------------------------------------------
  useEffect(() => {
    if (isOtpMailSent) {
      reset();

      setVerifyOtpField(true);
    }

    if (isOtpVerified) {
      reset();

      setVerifyOtpField(false);
      setResetPasswordField(true);
    }
    if (isPasswordReset) {
      toast.success("Password Reset Successfully", {
        position: "bottom-center",
      });

      setResetPasswordField(false);
      navigate("/login");

      return () => {
        dispatch(resetFields());
        setResetPasswordField(false);
      };
    }
  }, [isOtpMailSent, isOtpVerified, isPasswordReset]);

  useEffect(() => {
    setResetPasswordField(false);
    return () => {
      dispatch(resetFields());
      setResetPasswordField(false);
    };
  }, []);

  // -----------------------------------------------------------------------------------------------------

  return (
    <>
      <div style={{ height: "75vh" }} className="position-relative ">
        {/* header start */}
        {/* header ends */}

        {/* login page start */}

        <div className="h-100  d-flex justify-content-center align-items-center">
          <>
            <div className="container">
              <form
                onSubmit={
                  verifyOtpField
                    ? handleSubmit(verifyOtpHandler)
                    : resetPasswordField
                    ? handleSubmit(resetPasswordHandler)
                    : handleSubmit(sendOtpHandler)
                }
                style={{ height: "auto" }}
                className="col-md-6 mx-auto p-4 d-grid gap-4 loginForm "
              >
                {verifyOtpField ? (
                  <>
                    <div className="d-flex flex-column gap-1">
                      <span
                        style={{ color: "#5369F8", fontWeight: "bolder" }}
                        className="fs-3"
                      >
                        Enter the OTP sent to your mail
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="mb-3">
                        <label htmlFor="otp" className="form-label">
                          OTP
                        </label>
                        <input
                          {...register("otp", {
                            required: {
                              value: true,
                              message: "OTP is required",
                            },
                            pattern: {
                              value: /^[A-Z0-9._%+-]/i,
                              message: "OTP is invalid",
                            },
                            minLength: {
                              value: 6,
                              message: "OTP cannot be less than 6 digits.",
                            },

                            maxLength: {
                              value: 6,
                              message: "OTP cannot be more than 6 digits.",
                            },
                          })}
                          type="number"
                          className="form-control"
                          id="otp"
                          placeholder="Enter OTP here..."
                        />
                        {errors.otp && (
                          <div className="text-danger pt-1">
                            {errors.otp.message || "OTP is required"}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : resetPasswordField ? (
                  <>
                    <div className="d-flex flex-column gap-1">
                      <span
                        style={{ color: "#5369F8", fontWeight: "bolder" }}
                        className="fs-3"
                      >
                        Enter your New Password
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          New Password
                        </label>
                        <input
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is required",
                            },
                            pattern: {
                              // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Password is invalid",
                            },
                          })}
                          type="text"
                          className="form-control"
                          id="password"
                          placeholder="Enter password here..."
                        />
                        {errors.password && (
                          <div className="text-danger pt-1">
                            {errors.password.message || "password is required"}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Confirm New Password
                        </label>
                        <input
                          {...register("confirmPassword", {
                            required: {
                              value: true,
                              message: "Confirm Password is required",
                            },
                            pattern: {
                              // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Confirm Password is invalid",
                            },
                          })}
                          type="text"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Enter Password here..."
                        />
                        {errors.confirmPassword && (
                          <div className="text-danger pt-1">
                            {errors.confirmPassword.message ||
                              "Confirm Password is required"}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="">
                    <div className="d-flex flex-column gap-1 mb-4">
                      <span
                        style={{ color: "#5369F8", fontWeight: "bolder" }}
                        className="fs-3"
                      >
                        Reset Your Login Password
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email Address is required",
                            },
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email Address is invalid",
                            },
                          })}
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter email here..."
                        />
                        {errors.email && (
                          <div className="text-danger pt-1">
                            {errors.email.message || "Email is required"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {verifyOtpField ? (
                  <div className="d-flex justify-content-between align-items-center">
                    {isLoading && isVerifyOTPButtonCalled ? (
                      <button
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="px-1">Loading...</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                      >
                        Verify Otp
                      </button>
                    )}
                    <div>
                      <button
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                        disabled={Timer < 60}
                        onClick={() => {
                          dispatch(sendOtp({ email: userEmail }));
                          setTimer(0);
                        }}
                      >
                        Resend OTP {Timer >= 60 ? "" : "in"}{" "}
                        {Timer >= 60 ? "" : 60 - Timer}{" "}
                        {Timer >= 60 ? "" : "Seconds"}
                      </button>
                    </div>
                  </div>
                ) : resetPasswordField ? (
                  <div className="d-flex justify-content-between align-items-center">
                    {isLoading ? (
                      <button
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="px-1">Loading...</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                      >
                        Reset Password
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    {isLoading ? (
                      <button
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="px-1">Loading...</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        style={{ backgroundColor: "#5369F8", color: "white" }}
                        className="btn"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                )}
              </form>
              {/* <div className="row">
          <div className="col-md-6">
            
            <div className="card">
              
              <form onSubmit={handleSubmit(loginHandler)} className="box">
                
                <h1>ADMIN PANEL</h1>
                <p style={{color:"white"}}> Please enter your email/username and password!</p>
                <input type="text" name="username" placeholder="Email/Username" {...register("username")}/>
                <input type="password" name="password" placeholder="Password" {...register("password")}/>
                <a className="forgot" href="#" style={{color:"white"}}>
                  Forgot password?
                </a>
                <input type="submit" name="" value="Login"/>
                
              </form>
            </div>
          </div>
        </div> */}
            </div>
          </>
        </div>

        {/* login page ends */}

        {/* foooter start */}
        {/* <ul className="nav border position-fixed w-100 bottom-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Disabled
          </a>
        </li>
      </ul> */}
        {/* footer ends */}
      </div>
    </>
  );
}

export default ForgotPassword;
