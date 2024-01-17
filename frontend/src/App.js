import { Route, Routes } from "react-router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Shop from "./pages/Shop/Shop";
import ShopPhotos from "./pages/Shop/ShopPhotos";
import Login from "./pages/Auth/login/Login";
import SignUp from "./pages/Auth/signUp/SignUp";
import { Toaster } from "sonner";
import EmailVerification from "./pages/EmailVerification/EmailVerification";

function App() {
  return (
    <div className=" bg-[#F8F6F5]">
      <Header />
      <div className="min-h-dvh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<Event />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/photos" element={<ShopPhotos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/emailVerification/:token/:id"
            element={<EmailVerification />}
          />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
