import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { login } from "../../features/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isLogInSuccess, isLoading, loggedInUserData } = useSelector(
    (state) => {
      return state?.auth;
    }
  );

  // loginHandler -- handler to call the login api
  const loginHandler = (data) => {
    try {
      dispatch(login(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {}, [isLogInSuccess]);

  return (
    <>
      <div className="container mt-5">
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="col-md-5 mx-auto p-4 d-grid  m-5 loginForm"
        >
          <div className="d-flex flex-column gap-1">
            <span
              style={{ color: "#5369F8", fontWeight: "bolder" }}
              className="fs-3 text-center"
            >
              Trade Fair India
              <br /> Admin Panel - Login
            </span>
            <div className="d-flex flex-column gap-1 mt-4">
              <span className="fw-bold">Welcome back!</span>
              <p className="">
                Enter Your email address and password to access admin panel.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("username", {
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
              {errors.username && (
                <div className="text-danger pt-1">
                  {errors.username.message || "Email is required"}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={`${toggle ? "text" : "password"}`}
                  {...register("password", { required: true })}
                  className="form-control"
                  id="password"
                  placeholder="Enter password here..."
                />
                <span
                  style={{ bottom: "6px", right: "10px", cursor: "pointer" }}
                  className="position-absolute"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {toggle ? <PiEyeLight /> : <PiEyeClosedLight />}
                </span>
              </div>

              {errors.password && (
                <div className="text-danger pt-1">Password is required</div>
              )}
            </div>
          </div>

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
                Login
              </button>
            )}
            <button className="forgetButton" disabled={isLoading}>
              <Link to="/forgotPassword">
                <span type="button" className="text-primary">
                  Forgot password?
                </span>
              </Link>
            </button>
          </div>
          {/* <p>
            Are you a new user?&nbsp;
            <Link to="/signUp">
              <span type="button" className="text-primary">
                Sign Up
              </span>
            </Link>{" "}
          </p> */}
          <p>
            <b>
              Note: For SignUp SuperAdmin (owner) can create a new user after
              Login.
            </b>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
