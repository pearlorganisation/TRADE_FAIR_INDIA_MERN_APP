import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/actions/authActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import Footer from "../footer/Footer";
import logoImg from "../../../src/assets/images/logo-bg.png";
import { Link } from "react-router-dom";

function Header() {
  // ------------------------------------------Hooks--------------------------------------------------
  const { isUserLoggedIn } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  //THis is to create buttons dynamic as per the user role
  const { loggedInUserData } = useSelector((state) => state.auth);

  //--------------------------------------------------------------------------------------------------

  // -----------------------------------------Functions-----------------------------------------------
  const logoutHandler = () => {
    try {
      confirmAlert({
        title: "Logout Confirmation!",
        message: "Are you sure you want to logout?",
        buttons: [
          {
            label: "Yes",
            onClick: () => dispatch(logout()),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      toast.error(error?.message);
    }
  };
  // --------------------------------------------------------------------------------------------------
  return (
    <section className={styles.main_header}>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#00073dc7", fontSize: "25px" }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className={`text-white d-flex align-items-center px-5`}
          >
            <img
              src={logoImg}
              alt="logo"
              height={45}
              width={45}
              className="mx-3"
            />
            <h4 className="d-lg-block d-none">Trade Fair India</h4>
          </Navbar.Brand>
          {isUserLoggedIn ? (
            <>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`${styles.main_navbar} ms-auto `}>
                  <img
                    className={`${styles.profileAvatar} rounded-circle`}
                    src={
                      loggedInUserData?.profilePic ||
                      "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                    }
                  />
                  <NavDropdown
                    className={`${styles.profileName}`}
                    title={`${loggedInUserData?.name} (${loggedInUserData?.role
                      ?.toString()
                      ?.toUpperCase()})`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/viewProfileDetails">
                      User Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
      {/* <Footer/> */}
    </section>
  );
}

export default Header;
