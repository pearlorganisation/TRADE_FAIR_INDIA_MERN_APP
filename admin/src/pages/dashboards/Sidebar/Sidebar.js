import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BsShop, BsPeopleFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import styles from "./Sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/venues",
    name: "Venue",
    icon: <TbBuildingCommunity />,
  },
  {
    path: "/category",
    name: "Category",
    icon: <BiSolidCategory />,
  },
  {
    path: "/organiser",
    name: "Organiser",
    icon: <BsPeopleFill />,
  },
  {
    path: "/events",
    name: "Events",
    icon: <MdEventAvailable />,
  },
  {
    path: "/shops",
    name: "Shops",
    icon: <BsShop />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FiUsers />,
  },
  {
    path: "/roles",
    name: "Roles",
    icon: <FiUsers />,
  },
  {
    path: "/permissions",
    name: "Permissions",
    icon: <FiUsers />,
  },
];

const userVendorRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/venues",
    name: "Venue",
    icon: <TbBuildingCommunity />,
  },
  {
    path: "/category",
    name: "Category",
    icon: <BiSolidCategory />,
  },
  {
    path: "/organiser",
    name: "Organiser",
    icon: <BsPeopleFill />,
  },
  {
    path: "/events",
    name: "Events",
    icon: <MdEventAvailable />,
  },
  {
    path: "/shops",
    name: "Shops",
    icon: <BsShop />,
  },
];

const SideBar = ({ children }) => {
  const { isUserLoggedIn, loggedInUserData } = useAuth();

  //For Desktop Version
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  //For Mobile Version
  const toggle = () => setIsOpen(!isOpen);
  const mobileToggle = () => setIsMobileOpen(!isMobileOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        {/* Desktop View */}
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar d-lg-block d-md-block d-sm-none d-none`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Trade<span className="px-1">Fair</span>India
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars mx-2 mb-2" onClick={toggle}>
              <FaBars />
            </div>
          </div>
          <section className="routes">
            {(loggedInUserData?.role === "USER" ||
            loggedInUserData?.role === "VENDOR"
              ? userVendorRoutes
              : routes
            ).map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        {/* Mobile View */}
        <section className={styles.mobile_view}>
          <motion.div
            animate={{
              width: isMobileOpen ? "200px" : "45px",
              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            className={`sidebar d-lg-none d-md-none d-sm-block d-block `}
          >
            <div className="top_section">
              <AnimatePresence>
                {isMobileOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    Trade<span className="px-1">Fair</span>India
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars mx-2 mb-2" onClick={mobileToggle}>
                <FaBars />
              </div>
            </div>
            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsMobileOpen={setIsMobileOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isMobileOpen={isMobileOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isMobileOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          </motion.div>
        </section>

        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
