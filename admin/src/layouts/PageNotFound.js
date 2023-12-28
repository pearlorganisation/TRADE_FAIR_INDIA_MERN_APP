import React from "react";
import "./PageNotFound.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        class="wrapper"
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <img
          src="https://img.freepik.com/premium-vector/website-page-found-error-robot-character-broken-chatbot-mascot-disabled-site-technical-work_502272-1888.jpg?w=2000"
          width={500}
          height={500}
          alt="Page Not Found"
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          className="btn-lg  btn-info"
          onClick={() => navigate("/", { replace: true })}
        >
          Go to Home
        </Button>
      </div>
    </>
  );
};

export default PageNotFound;
