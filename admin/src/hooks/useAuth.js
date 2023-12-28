import React from "react";
import { useSelector } from "react-redux";
// ------------------------------------------------------

const useAuth = () => {
  // const { isUserLoggedIn, loggedInUserData } = useSelector((state) => {
  //   return state?.auth;
  // });

  // const { usersList } = useSelector((state) => {
  //   return state?.user;
  // });

  // return { isUserLoggedIn, loggedInUserData, usersList };

  const authData = useSelector((state) => {
    return state?.auth;
  });

  const userData = useSelector((state) => {
    return state?.user;
  });

  return {
    isUserLoggedIn: authData?.isUserLoggedIn || false,
    loggedInUserData: authData?.loggedInUserData || {},
    usersList: userData?.usersList || [],
  };
};

export default useAuth;
