import React, { useEffect } from "react";
import EmailImage from "../../components/assets/EmailVerification.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { emailVerification } from "../../features/actions/authAction";

const EmailVerification = () => {
  const { token, id } = useParams();
  const { authData, isEmailVerified, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("token::", token);
  console.log("id::", id);
  useEffect(() => {
    if (isEmailVerified) {
      navigate("/login");
    }
  }, [authData]);

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <div className="h-full md:h-[25rem] w-full md:w-[30rem] font-medium bg-white rounded flex justify-center items-center gap-3 flex-col shadow-md">
        <img className="w-[10rem]" src={EmailImage} alt="" />
        <p className="text-center">
          Thanks for Signing up.
          <br /> Please Click Verify button to verify your email.
        </p>
        {isLoading ? (
          <button
            type="button"
            className="px-5 py-2 bg-[#00373E] text-white rounded hover:bg-[#00373E]/90 active:bg-[#00373E]/80 active:scale-95 transition-all flex justify-center items-center gap-2"
          >
            Loading...
            <div class="w-5 h-5 border-4 rounded-full border-t-white/30 animate-spin"></div>
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(emailVerification({ token, id }));
            }}
            className="px-5 py-2 bg-[#00373E] text-white rounded hover:bg-[#00373E]/90 active:bg-[#00373E]/80 active:scale-95 transition-all"
            type="button"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
