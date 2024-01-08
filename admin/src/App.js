import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboards/Sidebar/Dashboard";
import Venue from "./pages/venues/Venue";
import Category from "./pages/category/Category";
import ViewShops from "./pages/shops/ViewShops";
import CreateShop from "./pages/shops/CreateShop";
import CreateVenue from "./pages/venues/CreateVenue";
import Events from "./pages/events/Events";
import UpdateVenue from "./pages/venues/UpdateVenue";
import ViewOrganiser from "./pages/organiser/ViewOrganiser";
import UpdateEvent from "./pages/events/UpdateEvent";
import CreateOrganiser from "./pages/organiser/CreateOrganiser";
import UpdateOrganiser from "./pages/organiser/UpdateOrganiser";
import UpdateShop from "./pages/shops/UpdateShop";
import AddCategory from "./pages/category/AddCategory";
import EditCategoryDetails from "./pages/category/EditCategory";
import AuthLayout from "./pages/auth/AuthLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ViewUsers from "./pages/users/ViewUsers";
import UpdateUser from "./pages/users/UpdateUser";
import CreateUser from "./pages/users/CreateUser";
import ViewRoles from "./pages/roles/ViewRoles";
import CreateRole from "./pages/roles/CreateRole";
import UpdateRole from "./pages/roles/UpdateRole";
import ViewPermissions from "./pages/permissions/ViewPermissions";
import CreatePermission from "./pages/permissions/CreatePermission";
import UpdatePermissions from "./pages/permissions/UpdatePermissions";
import SignUp from "./pages/auth/SignUp";
import Layout from "./layouts/Layout";
import useAuth from "./hooks/useAuth";
import ProtectedRouteHandler from "./layouts/ProtectedRoutesHandler";
import PageNotFound from "./layouts/PageNotFound";
import { availablePermissions, availableRoles } from "./utils";
import ViewLoggedInUserDetails from "./pages/users/ViewLoggedInUserDetails";
import CreateEvent from "./pages/events/CreateEvent";
import FetchHomeBanners from "./pages/client-panel/homeBanner/FetchHomeBanners";
import CreateHomeBanner from "./pages/client-panel/homeBanner/CreateHomeBanner";
import { UpdateHomeBanner } from "./pages/client-panel/homeBanner/UpdateHomeBanner";
import CreateSubBanner from "./pages/client-panel/subBanner/CreateSubBanner";
import UpdateSubBanner from "./pages/client-panel/subBanner/UpdateSubBanner";
import FetchSubBanners from "./pages/client-panel/subBanner/FetchSubBanners";
import FetchFaqs from "./pages/client-panel/faq/FetchFaqs";
import CreateFaq from "./pages/client-panel/faq/CreateFaq";
import UpdateFaq from "./pages/client-panel/faq/UpdateFaq";
import FetchEventCategories from "./pages/client-panel/eventCategory/FetchEventCategories";
import CreateEventCategory from "./pages/client-panel/eventCategory/CreateEventCategory";
import UpdateEventCategory from "./pages/client-panel/eventCategory/UpdateEventCategory";
import FetchEventBanners from "./pages/client-panel/eventBanner/FetchEventBanners";
import CreateEventBanner from "./pages/client-panel/eventBanner/CreateEventBanner";
import { UpdateEventBanner } from "./pages/client-panel/eventBanner/UpdateEventBanner";
// ----------------------------------------------------------------------------------
const App = () => {
  const { isUserLoggedIn, loggedInUserData, usersList } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* --------------------------------------------------------------------------- */}

        {/* Non Protected Routes */}
        <Route
          path="/login"
          element={isUserLoggedIn ? <Navigate to="/" /> : <AuthLayout />}
        />
        <Route
          path="/signUp"
          element={
            isUserLoggedIn &&
            usersList?.find((user) => user?.role?.role === "SUPER_ADMIN") ? (
              <Navigate to="/" />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/forgotPassword"
          element={isUserLoggedIn ? <Navigate to="/" /> : <ForgotPassword />}
        />
        {/* --------------------------------------------------------------------------- */}
        {/* Protected Routes */}

        <Route path="*" element={<PageNotFound />} />

        <Route
          element={
            <ProtectedRouteHandler
              allowedRoles={["SUPER_ADMIN", "ADMIN", "VENDOR"]}
              allowedPermissions={["CREATE_SHOP", "UPDATE_SHOP", "DELETE_SHOP"]}
            />
          }
        >
          <Route path="/addNewShop" element={<CreateShop />} />
          <Route path="/editShopDetails" element={<UpdateShop />} />
        </Route>

        <Route
          element={
            <ProtectedRouteHandler
              allowedRoles={["SUPER_ADMIN", "ADMIN"]}
              allowedPermissions={availablePermissions}
            />
          }
        >
          <Route path="/createVenue" element={<CreateVenue />} />
          <Route path="/venue/updateVenue" element={<UpdateVenue />} />
          <Route path="/addCategoryDetails" element={<AddCategory />} />
          <Route
            path="/editCategoryDetails"
            element={<EditCategoryDetails />}
          />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/updateEvent" element={<UpdateEvent />} />
          <Route path="/addOrganiser" element={<CreateOrganiser />} />
          <Route path="/editOrganiserDetails" element={<UpdateOrganiser />} />
          <Route path="/addNewShop" element={<CreateShop />} />
          <Route path="/editShopDetails" element={<UpdateShop />} />
          <Route path="/roles" element={<ViewRoles />} />
          <Route path="/addNewRole" element={<CreateRole />} />
          <Route path="/editRole" element={<UpdateRole />} />
          <Route path="/permissions" element={<ViewPermissions />} />
          <Route path="/addNewPermission" element={<CreatePermission />} />
          <Route path="/editPermission" element={<UpdatePermissions />} />
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/addNewUser" element={<CreateUser />} />
          <Route path="/editUserDetails" element={<UpdateUser />} />

          {/* // Client Panel Routes -- Start */}
          <Route path="/client" element={<FetchHomeBanners />} />

          <Route path="/client/homeBanners" element={<FetchHomeBanners />} />
          <Route path="/client/addHomeBanner" element={<CreateHomeBanner />} />
          <Route
            path="/client/updateBanner/:id"
            element={<UpdateHomeBanner />}
          />

          <Route path="/client/subBanners" element={<FetchSubBanners />} />
          <Route path="/client/addSubBanner" element={<CreateSubBanner />} />
          <Route
            path="/client/updateSubBanner/:subBannerId"
            element={<UpdateSubBanner />}
          />

          <Route path="/client/faqs" element={<FetchFaqs />} />
          <Route path="/client/addFaq" element={<CreateFaq />} />
          <Route path="/client/updateFaq/:faqId" element={<UpdateFaq />} />

          <Route
            path="/client/eventCategories"
            element={<FetchEventCategories />}
          />
          <Route
            path="/client/addEventCategory"
            element={<CreateEventCategory />}
          />
          <Route
            path="/client/updateEventCategory/:eventCategoryId"
            element={<UpdateEventCategory />}
          />

          <Route path="/client/eventBanners" element={<FetchEventBanners />} />
          <Route
            path="/client/addEventBanner"
            element={<CreateEventBanner />}
          />
          <Route
            path="/client/updateEventBanner/:eventBannerId"
            element={<UpdateEventBanner />}
          />
          {/* // Client Panel Routes -- Finished */}

          <Route path="/client/sub-banner" element={<ViewShops />} />
          <Route path="/client/event-category" element={<ViewShops />} />
          <Route path="/client/shows-banner" element={<ViewShops />} />
          <Route path="/client/faq" element={<ViewShops />} />
        </Route>

        <Route
          element={
            <ProtectedRouteHandler
              allowedRoles={availableRoles}
              allowedPermissions={[
                "VIEW_VENUES",
                "VIEW_CATEGORIES",
                "VIEW_EVENTS",
                "VIEW_ORGANISERS",
                "VIEW_SHOPS",
              ]}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/venues" element={<Venue />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/category" element={<Category />} />
          <Route path="/organiser" element={<ViewOrganiser />} />
          <Route path="/events" element={<Events />} />
          <Route path="/shops" element={<ViewShops />} />
          <Route
            path="/viewProfileDetails"
            element={<ViewLoggedInUserDetails />}
          />
        </Route>

        {/* --------------------------------------------------------------------------- */}
      </Route>
    </Routes>
  );
};

export default App;
