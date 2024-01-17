import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../features/actions/authAction";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { authData } = useSelector((state) => state.auth);
  const [passStrength, setPassStrength] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);

    dispatch(signUp(formData));
  };

  function checkPasswordStrength(password) {
    if (/^[a-z0-9!@#$%^&*]{1,}$/.test(password)) {
      return { strength: "Weak", color: "red" };
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{1,}$/.test(password)) {
      return { strength: "Good", color: "orange" };
    }

    if (
      /^(?=.*[a-z\d])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/.test(
        password
      )
    ) {
      return { strength: "Strong", color: "green" };
    }

    return { strength: "", color: "" };
  }

  useEffect(() => {
    const checkPasswordStren = checkPasswordStrength(password);
    console.log(password);
    setPassStrength(checkPasswordStren);
  }, [password]);

  useEffect(() => {
    console.log("passStrength::", passStrength);
  }, [passStrength]);

  // useEffect(() => {
  //   if (authData?.status === "SUCCESS") {
  //     navigate("/");
  //   }
  // }, [authData]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="font-medium text-lg flex justify-center items-center gap-2">
            <div className="rounded-md  h-[2.5rem] w-[2.5rem] bg-[#00373E] text-white grid place-items-center">
              TF
            </div>{" "}
            <span className="text-[#00373E]">TRADE FAIR</span>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                href="javascript:void(0)"
                className="font-medium text-[#00373E] hover:text-[#00373E]/90"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#00373E] shadow-sm rounded-lg"
              />
              {errors.name && (
                <span className="text-red-500">Name field is required</span>
              )}
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#00373E] shadow-sm rounded-lg"
              />
              {errors.email && (
                <span className="text-red-500">Email field is required</span>
              )}
            </div>
            <div className="relative">
              <label className="font-medium">Password</label>
              <input
                type={`${toggle ? "text" : "password"}`}
                {...register("password", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#00373E] shadow-sm rounded-lg"
              />
              <span
                onClick={() => {
                  setToggle(!toggle);
                }}
                className="absolute right-[1rem] top-[2.9rem] cursor-pointer"
              >
                {toggle ? <FaEye /> : <FaEyeSlash />}
              </span>

              {passStrength?.strength && (
                <span
                  className={`absolute right-[2.5rem] top-[2.6rem] cursor-pointer`}
                >
                  <div
                    className={`w-6 h-6 border-dashed border-4 rounded-full ${
                      passStrength?.strength === "Weak"
                        ? "border-b-red-500"
                        : passStrength?.strength === "Good"
                        ? "border-b-yellow-400 border-r-yellow-400"
                        : "border-green-500"
                    }`}
                  ></div>
                </span>
              )}

              {passStrength?.strength && <span>{passStrength?.strength}</span>}
              {errors.password && (
                <span className="text-red-500">Password field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-[#00373E] hover:bg-[#00373E]/90 active:bg-[#00373E]/80 rounded-lg duration-150"
            >
              Create account
            </button>
          </form>
          {/* <div className="mt-5">
            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default SignUp;
