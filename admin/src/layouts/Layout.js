import React from "react";
import Header from "./header/Header";
import SideBar from "../pages/dashboards/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import useAuth from "../hooks/useAuth";
// -------------------------------------------------------------------------------------
const Layout = () => {
  const { isUserLoggedIn } = useAuth();
  console.log(isUserLoggedIn, "isUserLoggedIn");

  return (
    <main>
      <Header />
      {isUserLoggedIn ? (
        <>
          <SideBar>
            <Outlet />
          </SideBar>
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
      <Footer />
    </main>
  );
};

export default Layout;
