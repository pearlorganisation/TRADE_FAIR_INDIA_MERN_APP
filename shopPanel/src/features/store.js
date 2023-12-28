import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopSlice from "./slices/shopSlice";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authReducer from "./slices/authSlice";
import enquiryReducer from './slices/enquirySlice'
import eventReducer from './slices/eventSlice'

// ---------------------------------------------------------

const persistConfig = {
  key: "shopPanelRoot",
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
  blacklist: ["enquiry"],
};

const reducer = combineReducers({
  auth: authReducer,
  shops: shopSlice,
  enquiry: enquiryReducer,
  event:eventReducer,
  // omitedPart: OmitReducer // not persisting this reducer
});

const rootReducer = (state, action) => {
  return reducer(state, action);
};

// This ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_WORKING_ENVIRONMENT === "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// ================================================== THE END ==================================================
