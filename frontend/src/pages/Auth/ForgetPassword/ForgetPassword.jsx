import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendOTP } from '../../../features/actions/authAction';

function ForgetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { step1 } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    dispatch(sendOTP({ email: data?.email }))
    // Here, you would handle sending the reset request to the server
    console.log(data);
  };
  useEffect(() => {
    if (step1 === 'completed') {
      navigate('/OTPVerification')
    }
  }, [step1])


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Forgot Password?
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email',
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#00373E] hover:bg-[#00373E] text-white w-full font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Reset Link
          </button>
        </div>

        <div className="mt-4 text-center">
          <a href="/login" className="bg-blue-500 hover:underline text-sm">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword
