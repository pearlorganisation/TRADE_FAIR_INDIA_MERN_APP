import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import faqReducer from "./slices/faqSlice";
import homeBannerReducer from "./slices/homeBannerSlice";
import subBannerReducer from "./slices/subBannerSlice";
import evetnsReducer from "./slices/eventsSlice";
import evetnCategoryReducer from "./slices/eventCategorySlice";
import showBannerReducer from "./slices/showsBannerSlice";

// Combine your individual reducers here
const rootReducer = combineReducers({
  // ...
  faq: faqReducer,
  homeBanner: homeBannerReducer,
  subBanner: subBannerReducer,
  events: evetnsReducer,
  eventCategory: evetnCategoryReducer,
  showsBanner: showBannerReducer,
});

// Custom root reducer handling a clear action
const rootReducerWithClear = (state, action) => {
  if (action.type === "shop/clearReduxStoreData") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return rootReducer(state, action);
};

// Redux-persist configuration
const persistConfig = {
  key: "TradeFairIndiaClientPanle",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        // Handle encryption errors if any
      },
    }),
  ],
};

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducerWithClear);

// Configure and create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_WORKING_ENVIRONMENT !== "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
