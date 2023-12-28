import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthImg from '../../../components/assets/AuthImg.png'
import OtpVerification from './OtpVerification'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { ownerForgotPasswordOTP,  } from '../../../features/actions/authAction'
import Loader from '../../../components/common/Loader'
import { resestForgotPasswordStates } from '../../../features/slices/authSlice'

const ForgotPassword = () => {
    const {isOTPSent,isLoading} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        console.log(data)
        dispatch(ownerForgotPasswordOTP(data))
      }
      useEffect(() => {
      
        return () => {
          dispatch(resestForgotPasswordStates())
        }
      }, [])
      
  return (
    isOTPSent ? <OtpVerification />
    :  <main className="w-full h-screen flex flex-col items-center justify-center px-4">
    <div className="max-w-md w-full text-gray-600 space-y-8 p-4 shadow-lg">
        <div className="text-center">
            <img src={AuthImg} width={80} className="mx-auto" />
            <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Forgot Password</h3>
                <p className="">Back to <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
            </div>
        </div>
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label className="font-medium">
                    Email
                </label>
                <input
                {...register("email", { required: true ,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:'Please Enter Valid Email Address'}})}
                    type="text"
                    placeholder='Enter Email Here...'
                    className="w-full my-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.email && (
                  <span className="text-red-500">{errors?.email?.message || "Email is required"}</span>
                )}
            </div>
           {
            isLoading ? <button
            disabled={isLoading}
            type="button"
            className="w-full px-4 mt-4 py-2 opacity-70 grid place-items-center text-white font-medium bg-indigo-600 hover:bg-indigo-500  rounded-lg duration-150"
          >
            <Loader/>
          </button> :  <button
            type='submit'
                className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
                Send Reset Link
            </button>
           }
        </form>
        
    </div>
</main>
  )
}

export default ForgotPassword