import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginOwner, loginVendor } from "../../features/actions/authAction";
import styles from "./login.module.css";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const iconStyle = {
    height: "20px",
    width: "20px",
  };

  const roles = [
    { value: "owner", label: "Owner" },
    { value: "vendor", label: "Team Member" },
  ];
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>{
    const {email,password,role} = data
    if(role.value === 'vendor'){
      dispatch(loginVendor({email,password,role:role?.value}))
    }else{
      dispatch(loginOwner({email,password,role:role?.value}))
    }
  };

  const { isLogInSuccess, isLoading } = useSelector((state) => state.auth);

  if (isLogInSuccess) {
    Navigate("/");
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-gray-600 shadow-2xl px-6 py-5">
        <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          <div className=" text-xl font-bold sm:text-2xl">
            Trade Fair India
          </div>
          {/* <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
          /> */}
          <div className="mt-5 space-y-2">
            <h3 className=" text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Invalid Email Address",
                },
              })}
              type="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.email && (
              <span className="text-red-400">
                {errors?.email?.message || "Email is required"}
              </span>
            )}
          </div>
          <div className="">
            <label className="font-medium">Password</label>

            <div className="relative">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setToggle(!toggle);
                }}
                className={`absolute ${styles.login_eye}`}
              >
                {toggle ? (
                  <PiEye style={iconStyle} />
                ) : (
                  <PiEyeClosed style={iconStyle} />
                )}
              </span>
              <input
                {...register("password", { required: true })}
                type={toggle ? "text" : "password"}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            {errors.password && (
              <span className="text-red-400">Password is required</span>
            )}
          </div>
          <div className="space-y-2">
            <label className="font-medium ">Login As a</label>
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select options={roles}
                value={value || null}
                        onChange={(val) => onChange(val)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.role && (
              <span className="text-red-400">Role is required</span>
            )}
          </div>
          {isLoading ? (
            <button
              disabled={isLoading}
              type="button"
              className="w-full px-4 py-2 opacity-70 grid place-items-center text-white font-medium bg-indigo-600 hover:bg-indigo-500  rounded-lg duration-150"
            >
              <div class={`${styles.custom_loader}`}></div>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Sign in
            </button>
          )}
          <div 
          className="w-full px-4 py-2 text-indigo-600 font-medium bg-white hover:bg-indigo-600/10 active:bg-indigo-600/20 rounded-lg duration-150 text-center"
          >
          <Link
             to='/forgotPassword'
              className="w-full font-medium  active:text-indigo-600 rounded-lg duration-150"
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
