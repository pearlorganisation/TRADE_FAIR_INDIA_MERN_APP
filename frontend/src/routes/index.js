import { lazy } from "react";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import OTPVerification from "../pages/Auth/ForgetPassword/OTPVerification";
import ConfirmPassword from "../pages/Auth/ForgetPassword/ConfirmPassword";

const Home = lazy(() => import("../pages/Home/Home"));
const Event = lazy(() => import("../pages/Event/Event"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const ShopPhotos = lazy(() => import("../pages/Shop/ShopPhotos"));
const Login = lazy(() => import("../pages/Auth/login/Login"));
const SignUp = lazy(() => import("../pages/Auth/signUp/SignUp"));
const EmailVerification = lazy(() =>
  import("../pages/EmailVerification/EmailVerification")
);

const coreRoutes = [
  {
    path: "/",
    title: "Home",
    component: <Home />,
  },
  {
    path: "/event/:eventId",
    title: "Event",
    component: <Event />,
  },
  {
    path: "/shop/:shopUniqueId",
    title: "Shop",
    component: <Shop />,
  },
  {
    path: "/shop/photos",
    title: "ShopPhotos",
    component: <ShopPhotos />,
  },
  {
    path: "/login",
    title: "Login",
    component: <Login />,
  },
  {
    path: "/signUp",
    title: "SignUp",
    component: <SignUp />,
  },
  {
    path: "/emailVerification/:token/:id",
    title: "EmailVerification",
    component: <EmailVerification />,
  },

  {
    path:"/forgetpass",
    title:"forgetpass",
    component:<ForgetPassword/>
  },{
    path:"/OTPVerification",
  title:"OTPVerification",
  component:<OTPVerification/>
  },
  {
    path:"ConfirmPassword",
    title:"ConfirmPassword",
    component:<ConfirmPassword/>

  }
];

export default coreRoutes;
