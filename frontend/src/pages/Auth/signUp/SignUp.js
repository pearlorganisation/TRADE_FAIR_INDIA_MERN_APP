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
  const { authData, isLoading } = useSelector((state) => state.auth);
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
    if (password === "") {
      return { strength: "", color: "" };
    } else if (!password.match(/[0-9]/) && !password.match(/[^a-zA-Z0-9]/)) {
      return { strength: "Weak", color: "red" };
    } else if (!password.match(/[^a-zA-Z0-9]/)) {
      return { strength: "Good", color: "orange" };
    } else {
      return { strength: "Strong", color: "green" };
    }
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
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4 pt-[6rem]">
      <div className="w-full h-full flex flex-col  justify-center items-center space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center w-full">
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
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg w-full">
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
                  {/* <div
                    className={`w-6 h-6 border-dashed border-4 rounded-full ${
                      passStrength?.strength === "Weak"
                        ? "border-b-red-500"
                        : passStrength?.strength === "Good"
                        ? "border-b-yellow-400 border-r-yellow-400"
                        : "border-green-500"
                    }`}
                  ></div> */}
                </span>
              )}
              {passStrength?.strength != "" && (
                <div className="flex justify-start items-center gap-1 p-1 ">
                  {Array(5)
                    .fill(true)
                    .map((item, index) => {
                      const strengthCss = `${
                        passStrength?.strength === "Weak" && index < 1
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }  
       ${
         passStrength?.strength === "Good" && index < 3
           ? "bg-yellow-500"
           : "bg-gray-300"
       } 
       ${
         passStrength?.strength === "Strong" && index <= 5
           ? "bg-green-500"
           : "bg-gray-300"
       } 
       h-1 w-[20%] transition-colors `;
                      return <div className={strengthCss}></div>;
                    })}
                </div>
              )}

              {/* {passStrength?.strength && <span>{passStrength?.strength}</span>} */}
              {errors.password && (
                <span className="text-red-500">Password field is required</span>
              )}
            </div>
            {isLoading ? (
              <button
                type="button"
                className="w-full px-4 py-2 text-white font-medium cursor-not-allowed bg-[#00373E]/80 rounded-lg duration-150  flex justify-center items-center gap-2"
              >
                Loading...
                <div class="w-5 h-5 border-4 rounded-full border-t-white/30 animate-spin"></div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-medium bg-[#00373E] hover:bg-[#00373E]/90 active:bg-[#00373E]/80 rounded-lg duration-150"
              >
                Create account
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
