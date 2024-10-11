import React from "react";
import styles from "./Footer.module.css";
// =======================================================================================

const Footer = () => {
  return (
    <div className={`${styles.footer_container} `}    >
      <div
        className={` d-flex justify-content-center align-items-center flex-wrap container-fluid mt-10 mx-auto`}
      >
        <div className="">
          This website is maintained and designed by{" "}
          <span className="fw-bold">Trade Fair India</span>
        </div>
        <div className="">
          {" "}
          &nbsp;Company {new Date().getFullYear()}. All rights are reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

// ========================================== THE END =============================================
