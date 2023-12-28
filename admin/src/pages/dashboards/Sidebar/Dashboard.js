import React, { useEffect } from "react";
import {
  BsArrowDown,
  BsArrowUp,
  BsClockHistory,
  BsCreditCard,
  BsFillCartCheckFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import Piechart from "../../../components/common/charts/Piechart";
import { fetchStateBasedOnCountry } from "../../../features/slices/globalSlice";
import { useDispatch } from "react-redux";
import { fetchShopsList } from "../../../features/actions/shopActions";
import { fetchEventList } from "../../../features/actions/eventAction";
import { fetchVenuesList } from "../../../features/actions/venueActions";
import { fetchCategoriesList } from "../../../features/actions/categoryActions";
import { fetchOrganiserList } from "../../../features/actions/organiserActions";
import { fetchUsersList } from "../../../features/actions/userActions";
import { fetchRolesList } from "../../../features/actions/roleActions";
import { fetchPermissionsList } from "../../../features/actions/permissionActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStateBasedOnCountry());
    dispatch(fetchShopsList());
    dispatch(fetchEventList());
    dispatch(fetchVenuesList());
    dispatch(fetchOrganiserList());
    dispatch(fetchCategoriesList());
    dispatch(fetchUsersList());
    dispatch(fetchRolesList());
    dispatch(fetchPermissionsList());
  }, []);

  return (
    <>
      <div className="container">
        <div className="row g-6 mb-6 mt-4">
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Budget
                    </span>
                    <span className="h3 font-bold mb-0">$750.90</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-primary-subtle text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      {/* <i className="bi bi-credit-card" /> */}
                      <BsCreditCard />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    {/* <i className="bi bi-arrow-up me-1" /> */}
                    <BsArrowUp />
                    13%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      New projects
                    </span>
                    <span className="h3 font-bold mb-0">215</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-primary text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      {/* <i className="bi bi-people" /> */}
                      <BsFillPeopleFill />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    {/* <i className="bi bi-arrow-up me-1" /> */}
                    <BsArrowUp />
                    30%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Total hours
                    </span>
                    <span className="h3 font-bold mb-0">1.400</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-info text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      {/* <i className="bi bi-clock-history" /> */}
                      <BsClockHistory />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-danger-subtle text-danger me-2">
                    {/* <i className="bi bi-arrow-down me-1" /> */}
                    <BsArrowDown />
                    -5%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Work load
                    </span>
                    <span className="h3 font-bold mb-0">95%</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-warning text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      {/* <i className="bi bi-minecart-loaded" /> */}
                      <BsFillCartCheckFill />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    {/* <i className="bi bi-arrow-up me-1" /> */}
                    <BsArrowUp />
                    10%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="pie_charts">
            <Piechart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
