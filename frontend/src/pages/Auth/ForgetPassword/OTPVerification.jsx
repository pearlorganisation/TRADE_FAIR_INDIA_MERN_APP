import React from 'react';
import { useForm } from 'react-hook-form';

function OTPVerification() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submit
  const onSubmit = (data) => {
    alert(`Entered OTP: ${data.otp}`);
    // Call your API or backend verification function here, e.g., verifyOtp(data.otp);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">OTP Verification</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full text-center text-2xl border rounded-md p-2 focus:outline-none focus:border-blue-500"
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

        <button
          type="submit"
          className="w-full bg-red-600 border  border-black  text-black font-bold py-2 px-4 rounded"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;
