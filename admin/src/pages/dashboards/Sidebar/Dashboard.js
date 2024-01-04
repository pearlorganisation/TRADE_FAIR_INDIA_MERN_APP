import React, { useEffect } from "react";
import { PieChart, Pie, Cell } from 'recharts';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaArrowDown, FaArrowUp, FaHistory, FaCreditCard, FaShoppingCart, FaUsers } from 'react-icons/fa'; // Importing icons from react-icons
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
import  styles from "../Sidebar/piechart.module.css"
import { BarData1, BarData2 } from "./Chartdata";
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

  const lastQuarterData = [
   
    { name: 'October', value: 9400 },
    { name: 'Novmber', value: 12400 },
    { name: 'December', value: 13400 },
  ];

   const COLORS1 = ['#FE9796', '#4FCAEC', '#64ed94', '#64ed94']; // Add more colors if needed
   const COLORS2 = [ '#4FCAEC', '#6af7d6','#FE9796' ,'#FF8042']; // Add more colors if needed
  return (
    <> 
    <section>
      <div className="container ">
       
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
          <div className="col-xl-3 col-sm-6 col-12 my-2 ">
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
            <Piechart  />
          </div>
        </div>
      </div>
      </section>

      {/* <section >
        <div className="container border border-success">
          <div className="row">
            <div className="col-md-6 border border-primary">
              <div>
              <BarChart
                          width={500}
                          height={500}
                          data={BarData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                        
                          <XAxis dataKey="name" />
                     
                          <Tooltip />
                       
                          <Bar dataKey="Savings" fill="#FE9196" />
                          
                        </BarChart>
              </div>
              
            </div>
            <div className="col-md-6">2</div>
          </div>
        </div>
      </section> */}


     <section>
        <div className="container  border-bottom  my-5 ">
          <div className="row">
            <div className="col-md-6 ">
              <div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={BarData1}
                    margin={{
                      top: 10,
                      right: 15,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Savings" fill="#53B576" barSize={30} /> {/* Adjust barSize here */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>


            <div className="col-md-6">
              <div style={{ textAlign: 'center' }} >
                <h3>Last Quarter Savings</h3>
                <ResponsiveContainer  className={`${styles.piechart}`}  >
                <PieChart>
                  <Pie
                    data={lastQuarterData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {
                      lastQuarterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                      ))
                    }
                  </Pie>
                </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          


          </div>
        </div>
      </section>

      <section className="mb-5 my-5 ">
        <div className="container ">
          <div className="row">

           



            <div className="col-md-6 ">
              <div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={BarData2}
                    margin={{
                      top: 10,
                      right: 15,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Expense" fill="#f76572" barSize={30} /> {/* Adjust barSize here */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
             
             
            <div className="col-md-6">
              <div style={{ textAlign: 'center' }}>
                <h3>Last Quarter Expense</h3>
                <ResponsiveContainer className={`${styles.piechart}`}>
                <PieChart>
                  <Pie
                    data={lastQuarterData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {
                      lastQuarterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                      ))
                    }
                  </Pie>
                </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
