import React, { useEffect } from 'react'
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../features/actions/authAction";
import styles from './LogoutAlert.module.css'


const LogoutAlert = ({setIsOpen,isOpen}) => {
    const dispatch = useDispatch()
    const {isLoading,isLogoutSuccess} = useSelector(state => state.auth)
    useEffect(() => {
      if(isLogoutSuccess){
        setIsOpen(false)
      }
  
    }, [isLogoutSuccess])
    
  return (
    <><div
    // onClick={() => setIsOpen(false)}
    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
  >
    <div
      className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
    >
      <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
      <div className="relative z-10">
        {
          isLoading ? <div className={`${styles.progress} mx-auto border-4`}></div> : <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
          <FiAlertCircle />
        </div>
        }
        <h3 className="text-3xl font-bold text-center mb-2">
        Confirm Logout
        </h3>
        <p className="text-center mb-6">
        Are you sure you want to log out.
        </p>
        <div className="flex gap-2">
          <button
          type='button'

            onClick={() => setIsOpen(false)}
            className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
          >
            Cancel
          </button>
          <button
          type='button'
          disabled={isLoading}
            onClick={() => {
                dispatch(logout())
            }}
            className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
          >
            Understood!
          </button>
        </div>
      </div>
    </div>
  </div></>
  )
}

export default LogoutAlert