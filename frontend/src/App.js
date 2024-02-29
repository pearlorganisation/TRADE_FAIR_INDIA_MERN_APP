import { Route, Routes } from "react-router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";

import { Suspense } from "react";
import coreRoutes from "./routes";
import "./App.css";
import LocationDropDown from "./components/Header/LocationDropDown";

function App() {
  return (
    <div className=" bg-[#F8F6F5]">
      <Header />
      <div className="min-h-dvh">
        <Routes>
          {coreRoutes.map((routes, index) => {
            const { path, component } = routes;
            return (
              <Route
                path={path}
                element={
                  <Suspense
                    fallback={
                      <div className="grid place-items-center h-dvh">
                        <div class="colorful"></div>
                      </div>
                    }
                  >
                    {component}
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
