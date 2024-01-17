import React, { useEffect } from "react";
import EmailImage from "../../components/assets/EmailVerification.svg";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const EmailVerification = () => {
  const { token } = useParams();
  const {authData} = useSelector(state => state.auth)

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <div className="h-full md:h-[25rem] w-full md:w-[30rem] font-medium bg-white rounded flex justify-center items-center gap-3 flex-col shadow-md">
        <img className="w-[10rem]" src={EmailImage} alt="" />
        <p className="text-center">
          Thanks for Signing up.
          <br/> Please Click Verify button to verify your email.
        </p>
        <button
          className="px-5 py-2 bg-[#00373E] text-white rounded hover:bg-[#00373E]/90 active:bg-[#00373E]/80 active:scale-95 transition-all"
          type="button"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
