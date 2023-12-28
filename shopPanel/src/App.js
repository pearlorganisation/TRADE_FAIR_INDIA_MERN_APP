import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Background from "./components/assets/Background.svg";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Shop from "./pages/shop/Shop";
import Vendor from "./pages/vendor/Vendor";
import Owner from "./pages/owner/Owner";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import Event from "./pages/Event/Event";

function App() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className={`App font-poppins`}>
      <Header />
      <div className="min-h-screen border-b">
        <Routes>
          <Route
            path="/"
            element={isUserLoggedIn ?   <Home /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="vendor/shop" element={isUserLoggedIn ?   <Vendor /> : <Navigate to="/login" />} />
          <Route path="owner/shop" element={isUserLoggedIn ?   <Owner /> : <Navigate to="/login" />} />

          <Route path="login" element={<Login />} />

          <Route path="shop/:shopId" element={<Shop />} />
          <Route path="/event/:eventUniqueKey" element={<Event />} />

          <Route path="*" element={<PageNotFound />} />
          <Route path="/forgotPassword" element={isUserLoggedIn ?   <Navigate to="/" />  : <ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
