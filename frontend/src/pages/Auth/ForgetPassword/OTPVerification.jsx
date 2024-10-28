import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPasswordOtpVerification } from '../../../features/actions/authAction';

function OTPVerification() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { step1, step2, email, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle form submit
  const onSubmit = (data) => {
    dispatch(forgetPasswordOtpVerification({ email, otp: data?.otp }))
    // Call your API or backend verification function here, e.g., verifyOtp(data.otp);
  };

  useEffect(() => {
    if (step1 != 'completed') {
      navigate('/forgetpass')
    }
  }, [step1])
  useEffect(() => {
    if (step2 === 'completed') {
      navigate('/ConfirmPassword')
    }
  }, [step2])


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">OTP Verification</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full text-center  border rounded-md p-2 focus:outline-none focus:border-blue-500"
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be 6 digits'
              }
            })}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
        </div>

        {
          isLoading ? <button
            type="button"
            disabled={isLoading}
            className="bg-[#00373E] hover:bg-[#00373E] text-white w-full font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Loading...
          </button> : <button
            type="submit"
            className="bg-[#00373E] hover:bg-[#00373E] text-white w-full font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify OTP
          </button>
        }
      </form>
    </div>
  );
}

export default OTPVerification;
