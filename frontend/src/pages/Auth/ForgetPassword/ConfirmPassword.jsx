import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../features/actions/authAction";
import { resetFields } from "../../../features/slices/authSlice";

function ConfirmPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password"); // Watch the password field
  const { step1, step2, step3, email, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data)
    dispatch(resetPassword({ email, ...data }))
  };
  useEffect(() => {
    if (step1 != 'completed' && step2 != 'completed') {
      navigate('/forgetpass')
    }
  }, [step1, step2])
  useEffect(() => {


    return () => {
      dispatch(resetFields())
    }
  }, [])


  useEffect(() => {
    if (step3 === 'completed') {
      navigate('/login')
    }
  }, [step3])


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Confirm Password
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter new password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {
          isLoading ? <button
            type="button"
            disabled={isLoading}
            className="w-full bg-[#00373E] text-white font-bold py-2 px-4 rounded hover:bg-[#00373E]/90"
          >
            Loading...
          </button> : <button
            type="submit"
            className="w-full bg-[#00373E] text-white font-bold py-2 px-4 rounded hover:bg-[#00373E]/90"
          >
            Reset Password
          </button>
        }
      </form>
    </div>
  );
}

export default ConfirmPassword;
