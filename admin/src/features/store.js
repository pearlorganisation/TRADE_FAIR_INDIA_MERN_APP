import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import shopReducer from "./slices/shopSlice";
import organiserReducer from "./slices/organiserSlice";
import globalReducer from "./slices/globalSlice";
import venueReducer from "./slices/venueSlice";
import categoryReducer from "./slices/categorySlice";
import eventReducer from "./slices/eventSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import clientSubBanner from "./slices/clientSubBannerSlice";
import permissionReducer from "./slices/permissionSlice";
import faqReducer from "./slices/faqSlice";
import clientSubBannerSlice from "./slices/clientSubBannerSlice";
import clientBannerSlice from "./slices/clientHomeBannerSlice";

// ---------------------------------------------------------

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        //console.log("Redux Persist Encryption Failed: ", err);
      },
    }),
  ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  shop: shopReducer,
  organiser: organiserReducer,
  global: globalReducer,
  venue: venueReducer,
  category: categoryReducer,
  event: eventReducer,
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  clientSubBanner: clientSubBannerSlice,
  clientBanner: clientBannerSlice,
  permission: permissionReducer,
  faq: faqReducer,
  // omitedPart: OmitReducer // not persisting this reducer
});

const rootReducer = (state, action) => {
  if (action.type === "shop/clearReduxStoreData") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return reducer(state, action);
};

// This ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_WORKING_ENVIRONMENT !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// ================================================== THE END ==================================================
