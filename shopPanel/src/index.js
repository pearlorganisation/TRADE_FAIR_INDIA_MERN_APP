import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { injectStore } from "./services/axiosInterceptor";
import store from "./features/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
// ----------------------------------------------------------------------------------------

injectStore(store);
let persistor = persistStore(store);

// ----------------------------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme>
      <BrowserRouter
        basename={
          process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
            ? "/mern/trade-fair-india-shop-panel"
            : ""
        }
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <App />
          <ToastContainer />
        </Provider>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
